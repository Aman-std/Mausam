import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScoredWidget } from '../../types';
import { useBarometerStore } from '../../store/barometerStore';

interface Props {
  widget: ScoredWidget;
}

export default function AtmoAnomalyWidget({}: Props) {
  const pressureDelta = useBarometerStore((state) => state.pressureDelta);
  const averagePressure = useBarometerStore((state) => state.averagePressure);

  return (
    <View
      className="rounded-2xl p-4 border border-violet-500 bg-violet-950/80 shadow-lg shadow-violet-900/30"
      accessibilityLabel="Crowd-sourced barometric anomaly detected"
      accessibilityRole="alert"
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5 bg-violet-600 px-2.5 py-0.5 rounded-full">
          <MaterialCommunityIcons name="broadcast" size={13} color="#ffffff" />
          <Text className="text-[11px] font-extrabold text-white uppercase tracking-wider">
            Extreme Weather Imminence
          </Text>
        </View>

        <View className="bg-black/50 px-2 py-0.5 rounded border border-violet-400/30">
          <Text className="text-[10px] font-mono text-violet-300 font-bold">CITIZEN GRID</Text>
        </View>
      </View>

      <Text className="text-base font-extrabold text-white mb-1">
        Local Atmospheric Pressure Anomaly Detected
      </Text>

      <Text className="text-xs text-violet-200 leading-relaxed mb-3">
        Cluster analysis across active smartphone barometers registered a sudden sharp drop of{' '}
        <Text className="font-bold text-white">{pressureDelta} hPa</Text> (Current mean: {averagePressure} hPa). Rapid convection or sudden localized squall likely within 15–20 minutes.
      </Text>

      <View className="bg-black/40 rounded-xl p-2.5 border border-violet-500/20 flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <MaterialCommunityIcons name="cellphone-check" size={16} color="#a78bfa" />
          <Text className="text-[11px] text-slate-300">5 Virtual Sector Devices Active</Text>
        </View>
        <View className="bg-violet-900/70 px-2 py-0.5 rounded">
          <Text className="text-[10px] text-violet-200 font-mono font-bold">ΔP &gt; 5 hPa ALERT</Text>
        </View>
      </View>
    </View>
  );
}
