import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MockWeatherData, ScoredWidget } from '../../types';

interface Props {
  widget: ScoredWidget;
  weather: MockWeatherData;
}

export default function UVWidget({ weather }: Props) {
  const uv = weather.uv;

  return (
    <View
      className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 shadow-sm"
      accessibilityLabel={`UV index is ${uv}, ${weather.uvStatus}`}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="weather-sunny-alert" size={16} color="#f59e0b" />
          <Text className="text-xs font-semibold text-slate-300">Solar UV Index</Text>
        </View>
        <Text className="text-[10px] text-amber-400 font-bold uppercase">{weather.uvStatus}</Text>
      </View>

      <View className="flex-row items-baseline justify-between">
        <View className="flex-row items-baseline">
          <Text className="text-3xl font-extrabold text-white">{uv}</Text>
          <Text className="text-xs text-slate-400 ml-1">/ 11+</Text>
        </View>
        <Text className="text-xs text-slate-300">
          {uv > 6 ? 'High erythemal risk between 11 AM - 3 PM' : 'Low solar radiation exposure'}
        </Text>
      </View>
    </View>
  );
}
