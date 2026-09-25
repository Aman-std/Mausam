import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MockWeatherData, ScoredWidget } from '../../types';

interface Props {
  widget: ScoredWidget;
  weather: MockWeatherData;
}

export default function VisibilityWidget({ weather }: Props) {
  const vis = weather.visibility;
  const isPoor = vis < 2.0;

  return (
    <View
      className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 shadow-sm"
      accessibilityLabel={`Atmospheric visibility is ${vis} kilometers`}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="eye-outline" size={16} color="#38bdf8" />
          <Text className="text-xs font-semibold text-slate-300">Surface Visibility</Text>
        </View>
        <Text className={`text-[10px] font-bold ${isPoor ? 'text-amber-400' : 'text-emerald-400'}`}>
          {isPoor ? 'Dense Fog / Squall' : 'Clear Line-of-Sight'}
        </Text>
      </View>

      <View className="flex-row items-baseline justify-between">
        <View className="flex-row items-baseline">
          <Text className="text-3xl font-extrabold text-white">{vis}</Text>
          <Text className="text-sm font-bold text-sky-400 ml-1">km</Text>
        </View>
        <Text className="text-xs text-slate-300">
          {isPoor ? 'Use low-beam fog headlights on highways' : 'Excellent highway & runway conditions'}
        </Text>
      </View>
    </View>
  );
}
