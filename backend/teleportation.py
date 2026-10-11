"""Pending execution boundary for the quantum teleportation example."""

import logging
from typing import NoReturn


logger = logging.getLogger(__name__)


def run_teleportation(backend: object) -> NoReturn:
    """Run the complete example and eventually return display-safe plain data.

    A successful implementation will return ``{"outputs": {...}}`` with string
    values for ``state-preparation``, ``entanglement``, and ``execution``. The
    notebook-derived state, shot count, circuit, and backend compatibility are
    still pending, so this skeleton deliberately submits no job and raises
    ``RuntimeError`` instead of fabricating output.

    Args:
        backend: The quantum backend injected by Qollab. It is currently unused.

    Raises:
        RuntimeError: Always, until the required example details are supplied and
            verified on the target backend.
    """
    raise RuntimeError(
        "Quantum teleportation execution is pending: the fixed state, shot count, "
        "circuit, and Qollab backend compatibility have not been supplied."
    )
