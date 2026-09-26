import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DEMO_COMMUTE_ROUTE } from '../../src/data/commuteRoute';
import { useWeatherStore } from '../../src/store/weatherStore';
import { usePersonaStore } from '../../src/store/personaStore';

export default function CommuteScreen() {
  const route = DEMO_COMMUTE_ROUTE;
  const weather = useWeatherStore((state) => state.weather);
  const persona = usePersonaStore((state) => state.persona);

  const [departureOffset, setDepartureOffset] = useState<-20 | 0 | 20>(-20); // -20 min (early), 0 (planned), +20 min (late)

  const isSevereWeather = weather.severity >= 0.5;

  const getDynamicGuidance = () => {
    if (departureOffset === -20) {
      return {
        badge: 'Optimal Window',
        badgeBg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
        title: 'Recommended: Depart 20 Mins Earlier (7:40 AM)',
        text: 'Departing ahead of the convective cloudburst corridor clears the Outer Ring Road before localized waterlogging develops at 8:25 AM. Expected delay: 0 mins.',
        corridorRisk: 'Low Risk (Safe)',
        corridorColor: 'text-emerald-400',
      };
    } else if (departureOffset === 0) {
      return {
        badge: 'Moderate Delay Risk',
        badgeBg: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
        title: 'Scheduled Departure (8:00 AM)',
        text: isSevereWeather
          ? 'Squall line intersects the Mayapuri flyover midway. Surface water puddling and 65% rain probability. Expected delay: +15 mins.'
          : 'Normal transit corridor conditions. Minor traffic near university intersection.',
        corridorRisk: isSevereWeather ? 'Moderate Risk (+15m)' : 'Low Risk (Normal)',
        corridorColor: 'text-amber-400',
      };
    } else {
      return {
        badge: 'Severe Transit Alert',
        badgeBg: 'bg-red-500/20 border-red-500/40 text-red-300',
        title: 'Delayed Departure (8:20 AM)',
        text: 'High hazard: Peak squall gusts (55 km/h) and continuous heavy downpour across entire corridor. High two-wheeler skid danger and metro station underpass flooding.',
        corridorRisk: 'Severe Hazard (+35m)',
        corridorColor: 'text-red-400',
      };
    }
  };

  const guidance = getDynamicGuidance();

  return (
    <View className="flex-1 bg-slate-900">
      {/* Header */}
      <View className="px-5 pt-8 pb-4 border-b border-slate-800 bg-slate-950">
        <View className="flex-row items-center justify-between mb-1">
          <View className="flex-row items-center space-x-2">
            <MaterialCommunityIcons name="car-clock" size={20} color="#fbbf24" />
            <Text className="text-base font-extrabold text-white">Commute Weather Timeline</Text>
          </View>
          <View className="bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
            <Text className="text-[10px] text-slate-300 font-mono capitalize">{persona} Transit</Text>
          </View>
        </View>
        <Text className="text-xs text-slate-400">
          Route Corridor: {route.from} ➔ {route.to}
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 py-4" contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Interactive Departure Time Selector */}
        <View className="mb-4">
          <Text className="text-[10px] uppercase font-bold text-slate-400 mb-2 px-1 tracking-wider">
            Simulate Departure Timing:
          </Text>
          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={() => setDepartureOffset(-20)}
              activeOpacity={0.8}
              className={`flex-1 py-2 px-1 rounded-xl items-center border ${
                departureOffset === -20
                  ? 'bg-emerald-950/80 border-emerald-400'
                  : 'bg-slate-800/40 border-slate-700/60'
              }`}
            >
              <Text className="text-xs font-bold text-white">7:40 AM</Text>
              <Text className="text-[10px] text-emerald-400 font-medium">Leave Early</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setDepartureOffset(0)}
              activeOpacity={0.8}
              className={`flex-1 py-2 px-1 rounded-xl items-center border ${
                departureOffset === 0
                  ? 'bg-amber-950/80 border-amber-400'
                  : 'bg-slate-800/40 border-slate-700/60'
              }`}
            >
              <Text className="text-xs font-bold text-white">8:00 AM</Text>
              <Text className="text-[10px] text-amber-400 font-medium">Planned</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setDepartureOffset(20)}
              activeOpacity={0.8}
              className={`flex-1 py-2 px-1 rounded-xl items-center border ${
                departureOffset === 20
                  ? 'bg-red-950/80 border-red-400'
                  : 'bg-slate-800/40 border-slate-700/60'
              }`}
            >
              <Text className="text-xs font-bold text-white">8:20 AM</Text>
              <Text className="text-[10px] text-red-400 font-medium">Late Dep.</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dynamic AI Guidance Card */}
        <View className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/70 mb-5 shadow-sm">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center space-x-1.5">
              <MaterialCommunityIcons name="clock-alert-outline" size={16} color="#fbbf24" />
              <Text className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                AI Transit Guidance
              </Text>
            </View>
            <View className={`px-2 py-0.5 rounded-full border ${guidance.badgeBg}`}>
              <Text className="text-[9px] font-bold uppercase">{guidance.badge}</Text>
            </View>
          </View>

          <Text className="text-sm font-bold text-white mb-1.5 leading-snug">
            {guidance.title}
          </Text>

          <Text className="text-xs text-slate-300 leading-relaxed mb-3">
            {guidance.text}
          </Text>

          <View className="bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-700/50 flex-row items-center justify-between">
            <Text className="text-[11px] text-slate-400">Transit Corridor Hazard:</Text>
            <Text className={`text-[11px] font-mono font-bold ${guidance.corridorColor}`}>
              {guidance.corridorRisk}
            </Text>
          </View>
        </View>

        {/* Waypoint Stops Timeline */}
        <Text className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
          Route Waypoint Weather Dynamics
        </Text>

        <View className="space-y-3">
          {route.stops.map((stop, idx) => {
            const hasStopWarning = stop.warning && departureOffset >= 0;
            return (
              <View
                key={stop.id}
                className={`p-3.5 rounded-2xl border ${
                  hasStopWarning
                    ? 'bg-amber-950/30 border-amber-500/50'
                    : 'bg-slate-800/60 border-slate-700/60'
                }`}
              >
                <View className="flex-row items-center justify-between mb-1.5">
                  <View className="flex-row items-center space-x-2">
                    <View className="w-5 h-5 rounded-full bg-sky-500/20 items-center justify-center border border-sky-400/30">
                      <Text className="text-[9px] font-bold text-sky-300">{idx + 1}</Text>
                    </View>
                    <Text className="text-xs font-bold text-white">{stop.label}</Text>
                  </View>
                  <Text className="text-xs font-mono font-bold text-amber-400">{stop.time}</Text>
                </View>

                <Text className="text-[11px] text-slate-400 mb-2">{stop.locationName}</Text>

                <View className="flex-row items-center justify-between pt-2 border-t border-slate-700/40">
                  <View className="flex-row items-center space-x-1">
                    <MaterialCommunityIcons name="thermometer" size={13} color="#38bdf8" />
                    <Text className="text-xs text-slate-200 font-bold">{stop.temp}°C</Text>
                  </View>
                  <View className="flex-row items-center space-x-1">
                    <MaterialCommunityIcons name="weather-rainy" size={13} color="#60a5fa" />
                    <Text className="text-xs text-blue-300 font-bold">{stop.rainProb}% Rain</Text>
                  </View>
                  <Text className="text-[11px] text-slate-400">{stop.condition}</Text>
                </View>

                {hasStopWarning && (
                  <View className="mt-2 bg-amber-950/50 p-2 rounded-lg border border-amber-500/30 flex-row items-center space-x-1.5">
                    <MaterialCommunityIcons name="alert" size={13} color="#f59e0b" />
                    <Text className="text-[11px] text-amber-200 font-medium flex-1">{stop.warning}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
