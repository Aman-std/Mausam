import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MockWeatherData, ScoredWidget } from '../../types';

interface Props {
  widget: ScoredWidget;
  weather: MockWeatherData;
}

export default function TemperatureWidget({ weather }: Props) {
  return (
    <View
      className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 shadow-sm"
      accessibilityLabel={`Current temperature is ${weather.temp} degrees Celsius, ${weather.condition}`}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="thermometer" size={16} color="#38bdf8" />
          <Text className="text-xs font-semibold text-slate-300">Surface Temperature</Text>
        </View>
        <Text className="text-[11px] text-slate-400 font-mono">Feels like {weather.feelsLike}°C</Text>
      </View>

      <View className="flex-row items-baseline justify-between mb-3">
        <View className="flex-row items-baseline">
          <Text className="text-4xl font-extrabold text-white tracking-tight">{weather.temp}</Text>
          <Text className="text-2xl font-bold text-sky-400 ml-0.5">°C</Text>
        </View>
        <View className="items-end">
          <Text className="text-sm font-semibold text-slate-200">{weather.condition}</Text>
          <Text className="text-xs text-slate-400">
            H: {weather.forecast[0]?.high ?? weather.temp + 3}° · L: {weather.forecast[0]?.low ?? weather.temp - 4}°
          </Text>
        </View>
      </View>

      {/* Sensor stats row */}
      <View className="flex-row items-center justify-between pt-2.5 border-t border-slate-700/50">
        <View className="flex-row items-center space-x-1">
          <MaterialCommunityIcons name="water-percent" size={14} color="#60a5fa" />
          <Text className="text-[11px] text-slate-300">Humidity {weather.humidity}%</Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MaterialCommunityIcons name="gauge" size={14} color="#cbd5e1" />
          <Text className="text-[11px] text-slate-300 font-mono">{weather.pressure} hPa</Text>
        </View>
      </View>
    </View>
  );
}
