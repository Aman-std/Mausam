import { View, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DEMO_COMMUTE_ROUTE } from '../../src/data/commuteRoute';
import { useWeatherStore } from '../../src/store/weatherStore';

export default function CommuteScreen() {
  const route = DEMO_COMMUTE_ROUTE;
  const weather = useWeatherStore((state) => state.weather);
  const isBadWeather = weather.severity >= 0.5;

  return (
    <View className="flex-1 bg-slate-900">
      {/* Header */}
      <View className="px-5 pt-8 pb-4 border-b border-slate-800 bg-slate-950">
        <View className="flex-row items-center space-x-2 mb-1">
          <MaterialCommunityIcons name="car-clock" size={20} color="#fbbf24" />
          <Text className="text-base font-extrabold text-white">Commute Weather Timeline</Text>
        </View>
        <Text className="text-xs text-slate-400">
          Route Corridor: {route.from} ➔ {route.to}
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 py-4" contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Departure Recommendation Card */}
        <View className="bg-amber-950/50 p-4 rounded-2xl border border-amber-500/60 mb-5 shadow-lg">
          <View className="flex-row items-center space-x-2 mb-1.5">
            <MaterialCommunityIcons name="clock-alert-outline" size={18} color="#fbbf24" />
            <Text className="text-xs font-bold text-amber-300 uppercase tracking-wide">
              AI Departure Guidance
            </Text>
          </View>
          <Text className="text-sm font-bold text-white mb-2 leading-snug">
            {isBadWeather ? route.recommendation : 'Corridor clear. Standard departure recommended.'}
          </Text>
          <View className="bg-black/40 px-3 py-1.5 rounded-lg border border-amber-500/30">
            <Text className="text-[11px] font-mono text-amber-200">
              Corridor Severe Risk: {isBadWeather ? 'HIGH (Squall Line at 8:35 AM)' : 'LOW (Safe)'}
            </Text>
          </View>
        </View>

        {/* Timeline Stops */}
        <Text className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 px-1">
          Route Waypoints & Localized Risk
        </Text>

        <View className="space-y-3">
          {route.stops.map((stop, idx) => (
            <View
              key={stop.id}
              className={`p-4 rounded-2xl border ${
                stop.warning
                  ? 'bg-red-950/30 border-red-500/50'
                  : 'bg-slate-800/60 border-slate-700/60'
              }`}
            >
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center space-x-2">
                  <View className="w-6 h-6 rounded-full bg-sky-500/20 items-center justify-center border border-sky-400/40">
                    <Text className="text-[10px] font-bold text-sky-300">{idx + 1}</Text>
                  </View>
                  <Text className="text-sm font-bold text-white">{stop.label}</Text>
                </View>
                <Text className="text-xs font-mono font-bold text-amber-400">{stop.time}</Text>
              </View>

              <Text className="text-xs text-slate-300 mb-2">{stop.locationName}</Text>

              <View className="flex-row items-center justify-between pt-2 border-t border-slate-700/40">
                <View className="flex-row items-center space-x-1">
                  <MaterialCommunityIcons name="thermometer" size={14} color="#38bdf8" />
                  <Text className="text-xs text-slate-300 font-bold">{stop.temp}°C</Text>
                </View>
                <View className="flex-row items-center space-x-1">
                  <MaterialCommunityIcons name="weather-rainy" size={14} color="#60a5fa" />
                  <Text className="text-xs text-blue-300 font-bold">{stop.rainProb}% Rain</Text>
                </View>
                <Text className="text-xs text-slate-400">{stop.condition}</Text>
              </View>

              {stop.warning && (
                <View className="mt-2.5 bg-red-950/60 p-2 rounded-lg border border-red-500/40 flex-row items-center space-x-1.5">
                  <MaterialCommunityIcons name="alert" size={14} color="#ef4444" />
                  <Text className="text-[11px] text-red-200 font-medium flex-1">{stop.warning}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
