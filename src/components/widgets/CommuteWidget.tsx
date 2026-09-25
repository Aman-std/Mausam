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
      className="bg-amber-950/40 rounded-2xl p-4 border border-amber-500/50 shadow-sm"
      accessibilityLabel={`Commute route status: ${route.recommendation}`}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="car-clock" size={16} color="#fbbf24" />
          <Text className="text-xs font-bold text-amber-300 uppercase tracking-wide">
            Commute Route Snapshot
          </Text>
        </View>
        <View className="bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
          <Text className="text-[10px] font-bold text-amber-300">
            {isBadWeather ? '+20m Delay Risk' : 'Normal Flow'}
          </Text>
        </View>
      </View>

      <Text className="text-sm font-extrabold text-white mb-1">
        {route.from} ➔ {route.to}
      </Text>

      {/* Dynamic Actionable Recommendation */}
      <View className="bg-black/50 p-2.5 rounded-xl border border-amber-500/30 mb-3">
        <View className="flex-row items-start space-x-2">
          <MaterialCommunityIcons name="alert-circle-outline" size={16} color="#fbbf24" />
          <Text className="text-xs text-amber-200 leading-snug flex-1 font-medium">
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
          <Text className="text-xs font-bold text-red-300">Squall Risk</Text>
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
        className="w-full bg-amber-500/20 hover:bg-amber-500/30 py-2 rounded-lg items-center border border-amber-500/40"
      >
        <Text className="text-xs font-bold text-amber-300">View Full Waypoint Timeline ➔</Text>
      </TouchableOpacity>
    </View>
  );
}
