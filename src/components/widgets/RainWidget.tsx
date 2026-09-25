import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MockWeatherData, ScoredWidget } from '../../types';

interface Props {
  widget: ScoredWidget;
  weather: MockWeatherData;
}

export default function RainWidget({ weather }: Props) {
  const isHighRain = weather.rain >= 60;

  return (
    <View
      className={`rounded-2xl p-4 border shadow-sm ${
        isHighRain
          ? 'bg-blue-950/70 border-blue-500/70'
          : 'bg-slate-800/80 border-slate-700/60'
      }`}
      accessibilityLabel={`Rain probability is ${weather.rain} percent`}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="weather-pouring" size={16} color="#60a5fa" />
          <Text className="text-xs font-semibold text-slate-300">Precipitation Radar</Text>
        </View>
        <View className={`px-2 py-0.5 rounded ${isHighRain ? 'bg-blue-600' : 'bg-slate-700'}`}>
          <Text className="text-[10px] font-bold text-white uppercase">
            {isHighRain ? 'High Risk' : 'Low Chance'}
          </Text>
        </View>
      </View>

      <View className="flex-row items-baseline justify-between mb-2">
        <View className="flex-row items-baseline">
          <Text className="text-3xl font-extrabold text-white">{weather.rain}</Text>
          <Text className="text-xl font-bold text-blue-400 ml-0.5">%</Text>
        </View>
        <Text className="text-xs text-slate-300">
          {isHighRain ? 'Intense downpour in next 90 min' : 'No significant rain expected'}
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="w-full bg-slate-700/60 h-2.5 rounded-full overflow-hidden mb-2.5">
        <View
          className="bg-blue-500 h-full rounded-full"
          style={{ width: `${Math.min(weather.rain, 100)}%` }}
        />
      </View>

      <View className="flex-row items-center justify-between text-[11px] pt-1">
        <Text className="text-[11px] text-slate-400">Est. Accumulation: {isHighRain ? '45-80 mm' : '< 2 mm'}</Text>
        <Text className="text-[11px] text-blue-400 font-medium">Doppler Confidence: 94%</Text>
      </View>
    </View>
  );
}
