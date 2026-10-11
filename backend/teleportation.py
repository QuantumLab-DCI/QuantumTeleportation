"""Execute the supplied dynamic notebook locally, never on the injected backend.

Scientific imports are deliberately deferred until execution so Qollab can import
this namespace and display dependency failures. All computed states and figures
are local ideal simulation or construction evidence, not platform execution.

IonQ capability source: https://docs.ionq.com/api-reference/v0.4/openqasm3
"""

import base64
import io
import logging
import textwrap


logger = logging.getLogger(__name__)
SHOTS = 1024
STAGES = (
    "state-preparation", "entanglement", "measurement-preparation",
    "measurement", "classical-bits", "correction", "verification",
)


def _source(text):
    return textwrap.dedent(text).strip() + "\n"


# These trusted excerpts are executed in one shared namespace, in this order.
# Returning the same strings prevents presentation code from duplicating logic.
SOURCES = {
    "state-preparation": _source('''
        from qiskit import QuantumCircuit, transpile
        from qiskit.circuit.library import StatePreparation
        from qiskit.quantum_info import Statevector
        from qiskit.result import marginal_counts
        from qiskit_aer import AerSimulator

        Q, A, B = 0, 1, 2
        shots = 1024
        seed = 20261011
        preparation = StatePreparation([0.6, 0.8], label="State")
        circuit = QuantumCircuit(3, 3)
        circuit.append(preparation, [Q])
        circuit.barrier()
        prepared_state = Statevector.from_instruction(circuit)
        stage_output = (
            "Local ideal Statevector; basis order is |B A Q>. "
            "Input is 0.6|0> + 0.8|1>.\\n" + str(prepared_state)
            + "\\nConstruction snapshot:\\n" + str(circuit.draw(output="text"))
        )
    '''),
    "entanglement": _source('''
        circuit.h(A)
        circuit.cx(A, B)
        circuit.barrier()
        stage_output = (
            "Construction snapshot: one Bell resource shared by A and B. "
            "This is not an additional experiment.\\n"
            + str(circuit.draw(output="text"))
        )
    '''),
    "measurement-preparation": _source('''
        circuit.cx(Q, A)
        circuit.h(Q)
        circuit.barrier()
        stage_output = (
            "Construction snapshot: prepare Q and A for Bell measurement.\\n"
            + str(circuit.draw(output="text"))
        )
    '''),
    "measurement": _source('''
        circuit.measure(Q, 0)
        circuit.measure(A, 1)
        circuit.barrier()
        stage_output = (
            "Construction snapshot: Q -> c0, A -> c1. c2 is unused here; "
            "its zero value is not a measurement of Bob.\\n"
            + str(circuit.draw(output="text"))
        )
    '''),
    "classical-bits": _source('''
        simulator = AerSimulator(basis_gates=["u", "cx"], max_parallel_threads=1)
        measurement_circuit = transpile(circuit, simulator, optimization_level=1)
        measurement_result = simulator.run(
            measurement_circuit, shots=shots, seed_simulator=seed
        ).result()
        if not measurement_result.success:
            raise RuntimeError("The first local Aer experiment failed.")
        alice_counts = dict(marginal_counts(measurement_result.get_counts(), [0, 1]))
        stage_output = (
            "First local ideal Aer experiment: 1024 shots. "
            "Displayed bits are A Q (c1 c0), not Q A. "
            "Two classical bits describe the correction, not the amplitudes.\\n"
            + str(alice_counts)
        )
    '''),
    "correction": _source('''
        with circuit.if_test((circuit.clbits[1], 1)):
            circuit.x(B)
        with circuit.if_test((circuit.clbits[0], 1)):
            circuit.z(B)
        stage_output = (
            "Dynamic construction snapshot: X for c1=1, then Z for c0=1. "
            "The protocol transfers quantum information, not matter, and does "
            "not clone the input. No coherent-control replacement is used.\\n"
            + str(circuit.draw(output="text"))
        )
    '''),
    "verification": _source('''
        verification_circuit = circuit.copy()
        verification_circuit.barrier()
        verification_circuit.append(preparation.inverse(), [B])
        verification_circuit.measure(B, 2)
        compiled_verification_circuit = transpile(
            verification_circuit, simulator, optimization_level=1
        )
        verification_result = simulator.run(
            compiled_verification_circuit, shots=shots, seed_simulator=seed
        ).result()
        if not verification_result.success:
            raise RuntimeError("The second local Aer experiment failed.")
        bob_counts = dict(marginal_counts(verification_result.get_counts(), [2]))
        stage_output = (
            "Second local ideal Aer experiment: inverse preparation on B, "
            "then B -> c2; 1024 shots. This tests the known prepared state, "
            "not tomography of an unknown input. Alice's samples belong to "
            "a separate experiment.\\n" + str(bob_counts)
            + "\\nVerification construction snapshot:\\n"
            + str(verification_circuit.draw(output="text"))
        )
    '''),
}


def _platform_info(backend):
    """Identify only from actual type/name; never call a provider or run method."""
    backend_type = type(backend)
    identity = f"{backend_type.__module__}.{backend_type.__qualname__}"
    name = getattr(backend, "name", None)
    if isinstance(name, str):
        identity += f" ({name})"
    is_ionq = "ionq" in identity.lower()
    message = (
        "IonQ documents no dynamic branch execution, including on its simulator. "
        "The supplied if_test protocol was not submitted. Local Aer results "
        "are not an IonQ run."
        if is_ionq else
        "Compatibility of this backend with the dynamic notebook is not verified. "
        "No platform job was submitted; local Aer results are not a platform run."
    )
    return {
        "status": "incompatible" if is_ionq else "not-verified",
        "backend": None if backend is None else identity,
        "submission_attempts": 0,
        "message": message,
    }


def _validate_counts(counts, width):
    """Reject malformed or incomplete experiment data instead of displaying it."""
    if not counts or sum(counts.values()) != SHOTS:
        raise ValueError("Local counts must total 1024 shots.")
    for bits, count in counts.items():
        if len(bits) != width or set(bits) - {"0", "1"}:
            raise ValueError("Local counts have invalid bit strings.")
        if type(count) is not int or count < 0:
            raise ValueError("Local counts must be nonnegative integers.")


def _stage_figures(stage, circuit, counts):
    """Encode figures using an Agg canvas without switching global backends.

    Close every created figure, including when PNG serialization fails. No file
    output or Qollab-specific figure proxy is needed for this plain-data contract.
    """
    from matplotlib import pyplot as plt
    from matplotlib.backends.backend_agg import FigureCanvasAgg
    from qiskit.visualization import plot_histogram

    descriptions = [
        ("circuit", "Local circuit construction snapshot", lambda: circuit.draw("mpl")),
    ]
    if counts is not None:
        descriptions.append(("histogram", "Local ideal Aer sampled counts", lambda: plot_histogram(counts)))
    encoded = []
    for kind, provenance, create in descriptions:
        # Also close figures allocated by a drawing function that fails midway.
        existing = set(plt.get_fignums())
        figure = None
        try:
            figure = create()
            buffer = io.BytesIO()
            FigureCanvasAgg(figure).print_png(buffer)
            encoded.append({
                "mime_type": "image/png", "encoding": "base64",
                "data": base64.b64encode(buffer.getvalue()).decode("ascii"),
                "alt": f"{stage}: {kind}",
                "caption": f"{provenance} for {stage}; not platform execution.",
            })
        finally:
            if figure is not None:
                plt.close(figure)
            for number in set(plt.get_fignums()) - existing:
                plt.close(number)
    return encoded


def run_teleportation(backend):
    """Return the seven-stage envelope for two local dynamic Aer experiments.

    The injected backend is informational only: zero jobs for every backend.
    Local success is always partial because platform execution is unavailable or
    unverified. Local failures null both counts; figure failures retain counts.
    Caught failures are logged once here, without configuring logging handlers.
    """
    platform = _platform_info(backend)
    result = {
        "schema_version": 1, "status": "error",
        "outputs": dict.fromkeys(STAGES, "Not executed."),
        "sources": dict(SOURCES),
        "figures": {stage: [] for stage in STAGES},
        "local": {"status": "error", "shots": SHOTS, "alice_counts": None, "bob_counts": None},
        "platform": platform,
        "errors": [{"scope": "platform", "stage": None, "message": platform["message"]}],
    }
    logger.info("Local teleportation started: shots=%s; platform submissions=0", SHOTS)
    namespace = {}
    snapshots = {}
    stage = None
    try:
        for stage in STAGES:
            exec(compile(result["sources"][stage], f"<teleportation:{stage}>", "exec"), namespace)
            if stage == "classical-bits":
                _validate_counts(namespace["alice_counts"], 2)
            if stage == "verification":
                _validate_counts(namespace["bob_counts"], 1)
            result["outputs"][stage] = namespace["stage_output"]
            snapshot_circuit = namespace["circuit"]
            if stage == "verification":
                snapshot_circuit = namespace["verification_circuit"]
            snapshots[stage] = snapshot_circuit.copy()
            if stage in ("classical-bits", "verification"):
                logger.info("Local Aer experiment completed: stage=%s; shots=%s", stage, SHOTS)
    except Exception:
        logger.exception("Local teleportation failed: stage=%s; platform submissions=0", stage)
        message = "Local notebook execution failed. Check dependencies and the Python log."
        result["outputs"][stage] = message
        result["errors"].append({"scope": "local", "stage": stage, "message": message})
        return result

    result["status"] = "partial"
    result["local"].update(
        status="completed",
        alice_counts=namespace["alice_counts"],
        bob_counts=namespace["bob_counts"],
    )
    for stage in STAGES:
        counts = None
        if stage == "classical-bits":
            counts = namespace["alice_counts"]
        if stage == "verification":
            counts = namespace["bob_counts"]
        try:
            result["figures"][stage] = _stage_figures(stage, snapshots[stage], counts)
        except Exception:
            logger.warning("Local figure failed: stage=%s", stage, exc_info=True)
            result["errors"].append({
                "scope": "figure", "stage": stage,
                "message": f"The local figure for {stage} is unavailable; computed counts are retained.",
            })
    logger.info("Local teleportation completed: status=partial; platform submissions=0")
    return result
