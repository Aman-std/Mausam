import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePersonaStore } from '../../src/store/personaStore';

export default function WelcomeScreen() {
  const router = useRouter();
  const resetProfile = usePersonaStore((state) => state.resetProfile);

  const handleStartGuest = () => {
    resetProfile();
    router.push('/onboarding/persona');
  };

  return (
    <ScrollView className="flex-1 bg-slate-900" contentContainerStyle={{ flexGrow: 1 }}>
      {/* Top Government Banner */}
      <View className="bg-slate-950 px-5 pt-8 pb-4 border-b border-slate-800">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <View className="w-8 h-8 rounded-full bg-amber-500/20 items-center justify-center border border-amber-500/40">
              <MaterialCommunityIcons name="weather-partly-cloudy" size={18} color="#f59e0b" />
            </View>
            <View>
              <Text className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
                India Meteorological Dept.
              </Text>
              <Text className="text-[10px] text-slate-400">Ministry of Earth Sciences · Govt. of India</Text>
            </View>
          </View>
          <View className="bg-blue-950/80 border border-blue-600/30 px-2 py-0.5 rounded">
            <Text className="text-[10px] font-mono text-blue-400 font-bold">SIH-26076</Text>
          </View>
        </View>
      </View>

      <View className="flex-1 px-6 pt-8 pb-10 justify-between">
        {/* Core Hero */}
        <View>
          <View className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 items-center justify-center mb-6">
            <MaterialCommunityIcons name="weather-lightning-rainy" size={36} color="#38bdf8" />
          </View>

          <Text className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Mausam 2.0
          </Text>
          <Text className="text-lg font-semibold text-sky-400 mb-4">
            Adaptive Weather Intelligence
          </Text>

          <Text className="text-sm leading-relaxed text-slate-300 mb-6">
            A single national weather application that dynamically synthesizes and re-ranks its homepage according to your citizen persona, daily commute corridors, and live IMD warning severities.
          </Text>

          {/* Key Differentiator Bullets */}
          <View className="space-y-3 mb-8">
            <View className="flex-row items-center space-x-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
              <MaterialCommunityIcons name="view-dashboard-variant-outline" size={20} color="#38bdf8" />
              <View className="flex-1">
                <Text className="text-xs font-semibold text-slate-100">Dynamic 40/20/20/20 Widget Ranking</Text>
                <Text className="text-[11px] text-slate-400">Relevance scoring replaces hardcoded homepages</Text>
              </View>
            </View>

            <View className="flex-row items-center space-x-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
              <MaterialCommunityIcons name="shield-alert-outline" size={20} color="#f97316" />
              <View className="flex-1">
                <Text className="text-xs font-semibold text-slate-100">Severe Weather Hard Override</Text>
                <Text className="text-[11px] text-slate-400">Red & Orange alerts preemptively take Rank #1</Text>
              </View>
            </View>

            <View className="flex-row items-center space-x-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
              <MaterialCommunityIcons name="cellphone-wireless" size={20} color="#10b981" />
              <View className="flex-1">
                <Text className="text-xs font-semibold text-slate-100">Edge Barometer & P2P Mesh Lab</Text>
                <Text className="text-[11px] text-slate-400">Disaster-resilient citizen science simulations</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Controls */}
        <View className="space-y-3">
          <TouchableOpacity
            onPress={handleStartGuest}
            activeOpacity={0.85}
            className="w-full bg-blue-600 hover:bg-blue-500 py-3.5 px-6 rounded-xl flex-row items-center justify-center space-x-2 shadow-lg shadow-blue-500/25"
          >
            <Text className="text-white font-bold text-base">Launch Prototype (Guest Demo)</Text>
            <MaterialCommunityIcons name="arrow-right" size={20} color="#ffffff" />
          </TouchableOpacity>

          <View className="items-center pt-2">
            <Text className="text-xs text-slate-400">
              Zero login required · Instant judge evaluation
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
