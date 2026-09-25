import { BarometerDevice } from '../types';

export const INITIAL_BAROMETER_DEVICES: BarometerDevice[] = [
  { id: 'dev_a', name: 'Citizen Sensor A (Pixel 8)', sector: 'Sector 14 Grid', initialPressure: 1008.2, currentPressure: 1008.2, trend: 'stable' },
  { id: 'dev_b', name: 'Citizen Sensor B (Galaxy S24)', sector: 'Metro Station Hub', initialPressure: 1007.8, currentPressure: 1007.8, trend: 'stable' },
  { id: 'dev_c', name: 'Citizen Sensor C (OnePlus 12)', sector: 'Industrial Area Phase 2', initialPressure: 1006.5, currentPressure: 1006.5, trend: 'stable' },
  { id: 'dev_d', name: 'Citizen Sensor D (Xiaomi 14)', sector: 'Ring Road Junction', initialPressure: 1004.9, currentPressure: 1004.9, trend: 'stable' },
  { id: 'dev_e', name: 'Citizen Sensor E (iPhone 15)', sector: 'University Enclave', initialPressure: 1003.8, currentPressure: 1003.8, trend: 'stable' },
];

export const DROPPED_BAROMETER_DEVICES: BarometerDevice[] = [
  { id: 'dev_a', name: 'Citizen Sensor A (Pixel 8)', sector: 'Sector 14 Grid', initialPressure: 1008.2, currentPressure: 1002.1, trend: 'critical' },
  { id: 'dev_b', name: 'Citizen Sensor B (Galaxy S24)', sector: 'Metro Station Hub', initialPressure: 1007.8, currentPressure: 1001.4, trend: 'critical' },
  { id: 'dev_c', name: 'Citizen Sensor C (OnePlus 12)', sector: 'Industrial Area Phase 2', initialPressure: 1006.5, currentPressure: 999.8, trend: 'critical' },
  { id: 'dev_d', name: 'Citizen Sensor D (Xiaomi 14)', sector: 'Ring Road Junction', initialPressure: 1004.9, currentPressure: 998.2, trend: 'critical' },
  { id: 'dev_e', name: 'Citizen Sensor E (iPhone 15)', sector: 'University Enclave', initialPressure: 1003.8, currentPressure: 996.9, trend: 'critical' },
];
