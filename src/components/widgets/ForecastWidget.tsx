import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MockWeatherData, ScoredWidget } from '../../types';

interface Props {
  widget: ScoredWidget;
  weather: MockWeatherData;
}

export default function ForecastWidget({ weather }: Props) {
  return (
    <View
      className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 shadow-sm"
      accessibilityLabel="5-day weather forecast"
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="calendar-month-outline" size={16} color="#38bdf8" />
          <Text className="text-xs font-semibold text-slate-300">5-Day Meteorological Outlook</Text>
        </View>
        <Text className="text-[10px] text-slate-400 font-mono">IMD Ensemble Model</Text>
      </View>

      <View className="space-y-2.5">
        {weather.forecast.map((item, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between py-1 border-b border-slate-700/30 last:border-b-0"
          >
            <View className="w-16">
              <Text className="text-xs font-bold text-white">{item.day}</Text>
              <Text className="text-[10px] text-slate-400">{item.date}</Text>
            </View>

            <View className="flex-row items-center space-x-2 flex-1 justify-center">
              <MaterialCommunityIcons
                name={(item.icon as any) || 'weather-partly-cloudy'}
                size={18}
                color="#60a5fa"
              />
              <Text className="text-xs text-slate-300 w-28 truncate">{item.condition}</Text>
            </View>

            <View className="flex-row items-center space-x-3 w-20 justify-end">
              <Text className="text-xs font-bold text-white">{item.high}°</Text>
              <Text className="text-xs text-slate-400">{item.low}°</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
