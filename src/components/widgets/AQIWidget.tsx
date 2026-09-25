import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MockWeatherData, ScoredWidget } from '../../types';

interface Props {
  widget: ScoredWidget;
  weather: MockWeatherData;
}

export default function AQIWidget({ weather }: Props) {
  const aqi = weather.aqi;
  const isGood = aqi <= 50;
  const isModerate = aqi > 50 && aqi <= 100;
  const isPoor = aqi > 100;

  const aqiColor = isGood ? 'text-emerald-400' : isModerate ? 'text-amber-400' : 'text-red-400';
  const aqiBg = isGood ? 'bg-emerald-500' : isModerate ? 'bg-amber-500' : 'bg-red-500';

  return (
    <View
      className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 shadow-sm"
      accessibilityLabel={`Air Quality Index is ${aqi}, ${weather.aqiStatus}`}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="blur" size={16} color="#94a3b8" />
          <Text className="text-xs font-semibold text-slate-300">National AQI Standard</Text>
        </View>
        <View className={`px-2 py-0.5 rounded ${aqiBg}`}>
          <Text className="text-[10px] font-bold text-white uppercase">{weather.aqiStatus}</Text>
        </View>
      </View>

      <View className="flex-row items-baseline justify-between mb-2">
        <View className="flex-row items-baseline">
          <Text className="text-3xl font-extrabold text-white">{aqi}</Text>
          <Text className="text-xs text-slate-400 ml-1.5 font-mono">AQI · PM2.5</Text>
        </View>
        <Text className={`text-xs font-semibold ${aqiColor}`}>
          {isGood ? 'Air is healthy for outdoor run' : isModerate ? 'Sensitive groups exercise care' : 'N95 mask recommended'}
        </Text>
      </View>

      <View className="w-full bg-slate-700/60 h-2 rounded-full overflow-hidden">
        <View
          className={`${aqiBg} h-full rounded-full`}
          style={{ width: `${Math.min((aqi / 300) * 100, 100)}%` }}
        />
      </View>
    </View>
  );
}
