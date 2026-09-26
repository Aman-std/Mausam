import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MockWeatherData, ScoredWidget } from '../../types';
import { DEMO_COMMUTE_ROUTE } from '../../data/commuteRoute';

interface Props {
  widget: ScoredWidget;
  weather: MockWeatherData;
}

export default function CommuteWidget({ weather }: Props) {
  const router = useRouter();
  const route = DEMO_COMMUTE_ROUTE;
  const isBadWeather = weather.severity >= 0.5;

  return (
    <View
      className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 shadow-sm"
      accessibilityLabel={`Commute route status: ${route.recommendation}`}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="car-clock" size={16} color="#fbbf24" />
          <Text className="text-xs font-semibold text-slate-300">
            Daily Commute Corridor
          </Text>
        </View>
        <View className={`px-2 py-0.5 rounded ${isBadWeather ? 'bg-amber-500/20' : 'bg-slate-700'}`}>
          <Text className={`text-[10px] font-bold ${isBadWeather ? 'text-amber-300' : 'text-slate-300'}`}>
            {isBadWeather ? '+20m Delay Expected' : 'Normal Traffic'}
          </Text>
        </View>
      </View>

      <Text className="text-sm font-bold text-white mb-2">
        {route.from} ➔ {route.to}
      </Text>

      {/* Dynamic Actionable Recommendation */}
      <View className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60 mb-3">
        <View className="flex-row items-start space-x-2">
          <MaterialCommunityIcons
            name={isBadWeather ? 'clock-alert-outline' : 'check-circle-outline'}
            size={16}
            color={isBadWeather ? '#fbbf24' : '#34d399'}
          />
          <Text className="text-xs text-slate-300 leading-snug flex-1 font-medium">
            {isBadWeather
              ? route.recommendation
              : 'Corridor clear. Standard departure recommended at 8:00 AM.'}
          </Text>
        </View>
      </View>

      {/* Mini timeline points */}
      <View className="flex-row items-center justify-between py-1 px-1 mb-2">
        <View className="items-center">
          <Text className="text-[10px] font-mono text-slate-400">8:00 AM</Text>
          <Text className="text-xs font-bold text-white">28°C</Text>
          <Text className="text-[9px] text-slate-400">Home</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={14} color="#64748b" />
        <View className="items-center">
          <Text className="text-[10px] font-mono text-amber-400">8:20 AM</Text>
          <Text className="text-xs font-bold text-amber-300">65% Rain</Text>
          <Text className="text-[9px] text-slate-400">Midway</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={14} color="#64748b" />
        <View className="items-center">
          <Text className="text-[10px] font-mono text-red-400">8:40 AM</Text>
          <Text className="text-xs font-bold text-red-300">Squall</Text>
          <Text className="text-[9px] text-slate-400">Ring Rd</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={14} color="#64748b" />
        <View className="items-center">
          <Text className="text-[10px] font-mono text-slate-400">9:00 AM</Text>
          <Text className="text-xs font-bold text-white">Campus</Text>
          <Text className="text-[9px] text-slate-400">Arrive</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/(tabs)/commute')}
        activeOpacity={0.8}
        className="w-full bg-slate-900/90 py-2 rounded-lg items-center border border-slate-700/60"
      >
        <Text className="text-xs font-semibold text-sky-400">View Full Corridor Weather ➔</Text>
      </TouchableOpacity>
    </View>
  );
}
