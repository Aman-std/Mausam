import { create } from 'zustand';
import { BarometerDevice } from '../types';
import {
  INITIAL_BAROMETER_DEVICES,
  DROPPED_BAROMETER_DEVICES,
} from '../data/barometerDevices';

interface BarometerState {
  devices: BarometerDevice[];
  anomalyDetected: boolean;
  isSimulating: boolean;
  averagePressure: number;
  pressureDelta: number;
  triggerPressureDrop: () => void;
  resetBarometer: () => void;
}

export const useBarometerStore = create<BarometerState>((set) => ({
  devices: INITIAL_BAROMETER_DEVICES,
  anomalyDetected: false,
  isSimulating: false,
  averagePressure: 1006.2,
  pressureDelta: 0.0,

  triggerPressureDrop: () => {
    set({ isSimulating: true });

    // Step 1: Intermediate drop
    setTimeout(() => {
      set({
        devices: INITIAL_BAROMETER_DEVICES.map((d) => ({
          ...d,
          currentPressure: Number((d.initialPressure - 3.2).toFixed(1)),
          trend: 'falling',
        })),
        averagePressure: 1003.0,
        pressureDelta: -3.2,
      });
    }, 500);

    // Step 2: Critical sharp drop below threshold -> triggers anomaly
    setTimeout(() => {
      set({
        devices: DROPPED_BAROMETER_DEVICES,
        averagePressure: 999.7,
        pressureDelta: -6.5,
        anomalyDetected: true,
        isSimulating: false,
      });
    }, 1200);
  },

  resetBarometer: () => {
    set({
      devices: INITIAL_BAROMETER_DEVICES,
      anomalyDetected: false,
      isSimulating: false,
      averagePressure: 1006.2,
      pressureDelta: 0.0,
    });
  },
}));
