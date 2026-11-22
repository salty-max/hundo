import { create } from "zustand";
import { readHint, readRecord, sendable } from "../sync/local";

/**
 * Where sync stands, for the topbar and the Sync screen:
 *   off      this device isn't linked
 *   joining  linked, and the first sync hasn't finished
 *   synced   everything here has been sent and the group's changes have been received
 *   waiting  changes here are saved and will be sent shortly
 *   offline  the service can't be reached; changes wait on this device
 *   paused   the service is refusing or out of room; changes wait on this device
 *   error    something unexpected; it tries again
 */
export type SyncPhase = "off" | "joining" | "synced" | "waiting" | "offline" | "paused" | "error";

interface SyncStatus {
  phase: SyncPhase;
  /** Devices in the group, as the last sync saw them. */
  devices: number;
  /** When the last sync finished (ms since the epoch), or null. */
  lastSync: number | null;
}

/** Where this device stands before any request: linked here already, linked in another guide of this browser, or not at all. */
export function startingPhase(): SyncPhase {
  // No link cookie means not linked, whatever an old ledger says: the first cycle drops it.
  if (!readHint()) return "off";
  const record = readRecord();
  return !record ? "joining" : sendable(record).length > 0 ? "waiting" : "synced";
}

export const useSyncStatus = create<SyncStatus>(() => ({ phase: startingPhase(), devices: 0, lastSync: null }));

export const setSyncStatus = (status: Partial<SyncStatus>) => useSyncStatus.setState(status);
