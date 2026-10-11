"""Local notebook/physical-oracle checks; none establish Qollab execution."""

import base64
import json
import subprocess
import sys
import unittest
from pathlib import Path
from unittest.mock import patch

import numpy as np
from matplotlib import pyplot as plt
from qiskit.quantum_info import Statevector, state_fidelity
from qiskit_aer import AerSimulator

from backend import teleportation as subject


class BackendSentinel:
    name = "unknown-simulator"

    def run(self, *args, **kwargs):
        raise AssertionError("The injected backend must never receive a job")


def execute_sources(last_stage="verification", state=None):
    namespace = {}
    for stage in subject.STAGES:
        source = subject.SOURCES[stage]
        if state is not None and stage == "state-preparation":
            source = source.replace("[0.6, 0.8]", repr(list(state)))
        exec(compile(source, f"<test:{stage}>", "exec"), namespace)
        if stage == last_stage:
            break
    return namespace


class TeleportationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.result = subject.run_teleportation(BackendSentinel())

    def test_envelope_counts_png_and_closed_figures(self):
        result = self.result
        self.assertEqual(set(result), {"schema_version", "status", "outputs", "sources", "figures", "local", "platform", "errors"})
        self.assertEqual(result["status"], "partial")
        self.assertEqual(result["local"]["status"], "completed")
        self.assertEqual(result["local"]["alice_counts"], {"00": 252, "01": 245, "10": 255, "11": 272})
        self.assertEqual(result["local"]["bob_counts"], {"0": 1024})
        self.assertEqual(result["platform"]["submission_attempts"], 0)
        self.assertEqual(result["platform"]["status"], "not-verified")
        self.assertEqual(len(result["errors"]), 1)
        for field in ("outputs", "sources", "figures"):
            self.assertEqual(tuple(result[field]), subject.STAGES)
        self.assertEqual(result["sources"], subject.SOURCES)
        for stage in subject.STAGES:
            self.assertIsInstance(result["outputs"][stage], str)
            self.assertTrue(result["figures"][stage])
            for figure in result["figures"][stage]:
                self.assertEqual(set(figure), {"mime_type", "encoding", "data", "alt", "caption"})
                self.assertEqual(figure["mime_type"], "image/png")
                self.assertEqual(figure["encoding"], "base64")
                self.assertTrue(base64.b64decode(figure["data"], validate=True).startswith(b"\x89PNG\r\n\x1a\n"))
                self.assertIn("not platform execution", figure["caption"])
        self.assertIn("Statevector", result["outputs"]["state-preparation"])
        self.assertEqual(plt.get_fignums(), [])
        json.dumps(result, allow_nan=False)

    def test_exact_executed_sources_and_two_dynamic_experiments(self):
        calls = []
        original = AerSimulator.run

        def record(simulator, circuit, **kwargs):
            calls.append((circuit.copy(), kwargs))
            return original(simulator, circuit, **kwargs)

        with patch.object(AerSimulator, "run", record):
            namespace = execute_sources()
        self.assertEqual(len(calls), 2)
        self.assertEqual(namespace["simulator"]._options_configuration["basis_gates"], ["u", "cx"])
        for circuit, options in calls:
            self.assertEqual(options["shots"], 1024)
            self.assertTrue(set(circuit.count_ops()) <= {"u", "cx", "measure", "if_else", "barrier"})
        self.assertEqual(calls[1][0].count_ops()["if_else"], 2)
        self.assertEqual(namespace["verification_result"].get_counts(), {"000": 238, "001": 246, "010": 281, "011": 259})
        controls = [item.operation for item in namespace["circuit"].data if item.operation.name == "if_else"]
        self.assertEqual([namespace["circuit"].find_bit(op.condition[0]).index for op in controls], [1, 0])
        self.assertEqual([op.blocks[0].data[0].operation.name for op in controls], ["x", "z"])

    def test_notebook_visual_conventions_and_verification_copy(self):
        namespace = {}
        for index, stage in enumerate(subject.STAGES[:4], start=1):
            exec(subject.SOURCES[stage], namespace)
            circuit = namespace["circuit"]
            self.assertEqual(circuit.data[-1].operation.name, "barrier")
            self.assertEqual(circuit.count_ops()["barrier"], index)
        self.assertEqual(namespace["preparation"].label, "State")
        exec(subject.SOURCES["classical-bits"], namespace)
        exec(subject.SOURCES["correction"], namespace)
        correction_before = namespace["circuit"].copy()
        exec(subject.SOURCES["verification"], namespace)
        self.assertEqual(namespace["circuit"], correction_before)
        verification = namespace["verification_circuit"]
        self.assertIsNot(verification, namespace["circuit"])
        self.assertEqual(verification.data[:-3], correction_before.data)
        self.assertEqual(
            [item.operation.name for item in verification.data[-3:]],
            ["barrier", "state_preparation_dg", "measure"],
        )
        self.assertEqual(verification.data[-2].operation.label, "State Dg")
        self.assertEqual(verification.find_bit(verification.data[-1].clbits[0]).index, 2)

        snapshots = {}

        def capture(stage, circuit, counts):
            snapshots[stage] = circuit.copy()
            return []

        with patch.object(subject, "_stage_figures", capture):
            result = subject.run_teleportation(BackendSentinel())
        self.assertEqual(result["status"], "partial")
        self.assertEqual(snapshots["correction"], correction_before)
        self.assertEqual(snapshots["verification"], verification)
        self.assertIn(str(verification.draw(output="text")), result["outputs"]["verification"])

    def test_independent_all_branch_phase_oracle_and_mutations(self):
        s = np.sqrt(2)
        states = [[1, 0], [0, 1], [1/s, 1/s], [1/s, -1/s], [1/s, 1j/s], [.6, .8]]
        rng = np.random.default_rng(20261011)
        for _ in range(20):
            vector = rng.normal(size=2) + 1j * rng.normal(size=2)
            states.append(vector / np.linalg.norm(vector))
        x = np.array([[0, 1], [1, 0]])
        z = np.diag([1, -1])
        for state in states:
            state = np.asarray(state, dtype=complex)
            # Construct from production's actual source, but compare with analytic
            # Bell expansion, not another teleportation circuit implementation.
            namespace = execute_sources("measurement-preparation")
            circuit = namespace["circuit"]
            from qiskit.circuit.library import StatePreparation
            circuit.data[0] = circuit.data[0].replace(operation=StatePreparation(state))
            amplitudes = Statevector.from_instruction(circuit).data
            alpha, beta = state
            expected = {(0, 0): [alpha, beta], (0, 1): [alpha, -beta], (1, 0): [beta, alpha], (1, 1): [-beta, alpha]}
            for (a, q), branch in expected.items():
                bob = amplitudes[[2*a + q, 4 + 2*a + q]]
                self.assertAlmostEqual(float(np.vdot(bob, bob).real), .25, places=12)
                bob = 2 * bob
                self.assertGreaterEqual(state_fidelity(bob, branch), 1 - 1e-9)
                if a:
                    bob = x @ bob
                if q:
                    bob = z @ bob
                self.assertGreaterEqual(state_fidelity(bob, state), 1 - 1e-9)
        self.assertLess(state_fidelity([1/s, -1/s], [1/s, 1/s]), 1e-9)  # missing Z
        self.assertLess(state_fidelity([0, 1], [1, 0]), 1e-9)  # missing X

    def test_dynamic_aer_phase_inputs(self):
        s = float(np.sqrt(2))
        for state in [[1, 0], [0, 1], [1/s, 1/s], [1/s, -1/s], [1/s, 1j/s], [.6, .8]]:
            with self.subTest(state=state):
                self.assertEqual(execute_sources(state=state)["bob_counts"], {"0": 1024})

    def test_actual_missing_correction_mutations_fail_verification(self):
        s = float(np.sqrt(2))
        for gate, state in [("x", [1, 0]), ("z", [1/s, 1/s])]:
            with self.subTest(missing_gate=gate):
                correction = subject.SOURCES["correction"].replace(
                    f"    circuit.{gate}(B)", "    pass"
                )
                with patch.dict(subject.SOURCES, {"correction": correction}):
                    namespace = execute_sources(state=state)
                # Half the ideal branches need the omitted correction. Bob must
                # now sometimes fail the known-state inverse-preparation test.
                self.assertGreater(namespace["bob_counts"].get("1", 0), 400)
                self.assertLess(namespace["bob_counts"].get("0", 0), 624)

    def test_module_import_without_optional_packages(self):
        script = """
import builtins
original = builtins.__import__
def guarded(name, *args, **kwargs):
    if name.split('.')[0] in {'qiskit', 'qiskit_aer', 'numpy', 'matplotlib'}:
        raise ImportError('optional package intentionally unavailable')
    return original(name, *args, **kwargs)
builtins.__import__ = guarded
from backend.teleportation import run_teleportation
result = run_teleportation(None)
assert result['status'] == 'error'
assert result['local']['alice_counts'] is None
assert result['local']['bob_counts'] is None
assert result['platform']['submission_attempts'] == 0
"""
        completed = subprocess.run([sys.executable, "-c", script], cwd=Path(__file__).resolve().parents[1], capture_output=True, text=True)
        self.assertEqual(completed.returncode, 0, completed.stderr)
        self.assertEqual(completed.stderr.count("Local teleportation failed:"), 1)

    def test_second_experiment_failure_nulls_both_counts_and_logs_once(self):
        original = AerSimulator.run
        calls = []

        def fail_second(simulator, circuit, **kwargs):
            calls.append(circuit)
            if len(calls) == 2:
                raise RuntimeError("controlled second-experiment failure")
            return original(simulator, circuit, **kwargs)

        with patch.object(AerSimulator, "run", fail_second), self.assertLogs(subject.logger, level="INFO") as logs:
            result = subject.run_teleportation(BackendSentinel())
        self.assertEqual(result["status"], "error")
        self.assertIsNone(result["local"]["alice_counts"])
        self.assertIsNone(result["local"]["bob_counts"])
        local_errors = [error for error in result["errors"] if error["scope"] == "local"]
        self.assertEqual(len(local_errors), 1)
        self.assertEqual(local_errors[0]["stage"], "verification")
        self.assertEqual(sum(record.exc_info is not None for record in logs.records), 1)
        self.assertIn("controlled second-experiment failure", "\n".join(logs.output))
        self.assertNotIn("controlled second-experiment failure", local_errors[0]["message"])
        self.assertTrue(all(not value for value in result["figures"].values()))

    def test_figure_failure_retains_counts_and_closes_allocated_figures(self):
        from matplotlib.backends.backend_agg import FigureCanvasAgg
        with patch.object(FigureCanvasAgg, "print_png", side_effect=RuntimeError("controlled PNG failure")), self.assertLogs(subject.logger, level="WARNING") as logs:
            result = subject.run_teleportation(BackendSentinel())
        self.assertEqual(result["status"], "partial")
        self.assertEqual(result["local"], self.result["local"])
        errors = [error for error in result["errors"] if error["scope"] == "figure"]
        self.assertEqual([error["stage"] for error in errors], list(subject.STAGES))
        self.assertEqual(len(logs.records), 7)
        self.assertEqual(plt.get_fignums(), [])

    def test_one_stage_figure_failure_preserves_other_figures(self):
        original = subject._stage_figures

        def fail_one(stage, circuit, counts):
            if stage == "correction":
                raise RuntimeError("controlled correction drawing failure")
            return original(stage, circuit, counts)

        with patch.object(subject, "_stage_figures", fail_one), self.assertLogs(subject.logger, level="WARNING") as logs:
            result = subject.run_teleportation(BackendSentinel())
        self.assertEqual(result["local"], self.result["local"])
        self.assertEqual(result["status"], "partial")
        self.assertEqual(result["figures"]["correction"], [])
        self.assertTrue(all(result["figures"][stage] for stage in subject.STAGES if stage != "correction"))
        self.assertEqual([error["stage"] for error in result["errors"] if error["scope"] == "figure"], ["correction"])
        self.assertEqual(len(logs.records), 1)

    def test_real_identity_and_repeated_runs_without_handlers(self):
        ionq_type = type("IonQSimulatorBackend", (BackendSentinel,), {"__module__": "qiskit_ionq.ionq_backend", "name": "ionq_simulator"})
        before = list(subject.logger.handlers)
        with patch.object(subject, "_stage_figures", return_value=[]):
            ionq_result = subject.run_teleportation(ionq_type())
            unknown_result = subject.run_teleportation(BackendSentinel())
        self.assertEqual(ionq_result["platform"]["status"], "incompatible")
        self.assertEqual(unknown_result["platform"]["status"], "not-verified")
        self.assertEqual(ionq_result["platform"]["submission_attempts"], 0)
        self.assertEqual(subject.logger.handlers, before)
        ionq_result["outputs"]["verification"] = "mutated previous result"
        self.assertNotEqual(unknown_result["outputs"]["verification"], "mutated previous result")


if __name__ == "__main__":
    unittest.main()
