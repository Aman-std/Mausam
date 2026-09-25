import { create } from 'zustand';
import { MeshDevice, MeshAlertPacket } from '../types';
import { INITIAL_MESH_DEVICES, DEMO_MESH_ALERT } from '../data/meshDevices';

interface MeshState {
  devices: MeshDevice[];
  activeAlert: MeshAlertPacket | null;
  isPropagating: boolean;
  currentHop: number;
  duplicatePreventedCount: number;
  lastLogMessage: string;
  triggerAlertPropagation: () => void;
  resetMesh: () => void;
}

export const useMeshStore = create<MeshState>((set, get) => ({
  devices: INITIAL_MESH_DEVICES,
  activeAlert: null,
  isPropagating: false,
  currentHop: 0,
  duplicatePreventedCount: 0,
  lastLogMessage: 'Mesh network standing by on BLE 2.4GHz physical layer.',

  triggerAlertPropagation: () => {
    const { isPropagating, activeAlert } = get();

    if (isPropagating) return;

    // Check duplicate prevention:
    if (activeAlert && activeAlert.alertId === DEMO_MESH_ALERT.alertId) {
      set((state) => ({
        duplicatePreventedCount: state.duplicatePreventedCount + 1,
        lastLogMessage: `Duplicate packet discarded [ID: ${DEMO_MESH_ALERT.alertId}] - Already delivered to all cluster nodes.`,
      }));
      return;
    }

    set({
      isPropagating: true,
      currentHop: 1,
      activeAlert: { ...DEMO_MESH_ALERT, ttl: 4, timestamp: Date.now() },
      lastLogMessage: `Gateway Node A received alert via satellite. Broadcasting to Hop 1 (TTL: 4)...`,
      devices: [
        { ...INITIAL_MESH_DEVICES[0], status: 'relaying' },
        INITIAL_MESH_DEVICES[1],
        INITIAL_MESH_DEVICES[2],
        INITIAL_MESH_DEVICES[3],
      ],
    });

    // Hop 1 -> Node B
    setTimeout(() => {
      set((state) => ({
        currentHop: 2,
        activeAlert: state.activeAlert ? { ...state.activeAlert, ttl: 3 } : null,
        lastLogMessage: `Node B acknowledged payload [TTL: 3]. Relaying to Node C...`,
        devices: state.devices.map((d, i) =>
          i === 0
            ? { ...d, status: 'received' }
            : i === 1
            ? { ...d, status: 'relaying', receivedAt: 'Just now' }
            : d
        ),
      }));
    }, 900);

    // Hop 2 -> Node C
    setTimeout(() => {
      set((state) => ({
        currentHop: 3,
        activeAlert: state.activeAlert ? { ...state.activeAlert, ttl: 2 } : null,
        lastLogMessage: `Node C acknowledged payload [TTL: 2]. Relaying to Edge Node D...`,
        devices: state.devices.map((d, i) =>
          i <= 1
            ? { ...d, status: 'received' }
            : i === 2
            ? { ...d, status: 'relaying', receivedAt: 'Just now' }
            : d
        ),
      }));
    }, 1800);

    // Hop 3 -> Node D (Destination reached)
    setTimeout(() => {
      set((state) => ({
        currentHop: 4,
        isPropagating: false,
        activeAlert: state.activeAlert ? { ...state.activeAlert, ttl: 1 } : null,
        lastLogMessage: `Emergency bulletin successfully dispersed across 100% of mesh nodes (4/4 reached, 0 internet needed).`,
        devices: state.devices.map((d) => ({
          ...d,
          status: 'received',
          receivedAt: d.receivedAt || 'Just now',
        })),
      }));
    }, 2700);
  },

  resetMesh: () => {
    set({
      devices: INITIAL_MESH_DEVICES,
      activeAlert: null,
      isPropagating: false,
      currentHop: 0,
      duplicatePreventedCount: 0,
      lastLogMessage: 'Mesh network reset. Ready for simulated broadcast.',
    });
  },
}));
