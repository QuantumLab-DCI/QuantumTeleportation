// Qollab resolves this Python namespace; a plain static server cannot.
import * as teleportation from 'backend.teleportation';

export function runWholeExample() {
  return teleportation.run_teleportation.callPromising(backend);
}
