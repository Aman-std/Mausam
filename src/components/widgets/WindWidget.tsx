import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MockWeatherData, ScoredWidget } from '../../types';

interface Props {
  widget: ScoredWidget;
  weather: MockWeatherData;
}

export default function WindWidget({ weather }: Props) {
  const isSquall = weather.wind > 45;

  return (
    <View
      className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 shadow-sm"
      accessibilityLabel={`Wind speed is ${weather.wind} kilometers per hour from ${weather.windDir}`}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="weather-windy" size={16} color="#38bdf8" />
          <Text className="text-xs font-semibold text-slate-300">Surface Wind & Gusts</Text>
        </View>
        <Text className="text-[11px] font-mono text-slate-400">Direction: {weather.windDir}</Text>
      </View>

      <View className="flex-row items-baseline justify-between mb-2">
        <View className="flex-row items-baseline">
          <Text className="text-3xl font-extrabold text-white">{weather.wind}</Text>
          <Text className="text-sm font-bold text-sky-400 ml-1">km/h</Text>
        </View>
        <View className="items-end">
          <Text className={`text-xs font-bold ${isSquall ? 'text-amber-400' : 'text-slate-300'}`}>
            {isSquall ? 'Squall / Gale Conditions' : 'Gentle / Moderate Breeze'}
          </Text>
          <Text className="text-[10px] text-slate-400">Peak Gust: {Math.round(weather.wind * 1.3)} km/h</Text>
        </View>
      </View>
    </View>
  );
}
