import { MeshDevice, MeshAlertPacket } from '../types';

export const INITIAL_MESH_DEVICES: MeshDevice[] = [
  { id: 'node_a', name: 'Gateway Node A (Satellite/Cellular Link)', sector: 'Coastal Panchayat Bhawan', status: 'received', signalStrength: -58 },
  { id: 'node_b', name: 'Relay Node B (BLE Hop 1)', sector: 'Primary Health Center', status: 'idle', signalStrength: -72 },
  { id: 'node_c', name: 'Relay Node C (BLE Hop 2)', sector: 'Village Grain Mandi', status: 'idle', signalStrength: -80 },
  { id: 'node_d', name: 'Edge Node D (BLE Hop 3)', sector: 'Shelter Point 4', status: 'idle', signalStrength: -85 },
];

export const DEMO_MESH_ALERT: MeshAlertPacket = {
  alertId: 'IMD-DISASTER-EMERGENCY-9021',
  sourceDevice: 'node_a',
  ttl: 4,
  timestamp: Date.now(),
  severity: 'red',
  headline: 'DISASTER RELAY: Severe Coastal Inundation Alert',
  instructions: 'Cellular network down. P2P Mesh activated. Move cattle and families to designated cyclone shelter immediately.',
  dedupeSeen: ['node_a'],
};
