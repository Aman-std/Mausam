import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePersonaStore } from '../../src/store/personaStore';
import { INTEREST_OPTIONS } from '../../src/data/personaProfiles';
import { Interest } from '../../src/types';

export default function InterestsScreen() {
  const router = useRouter();
  const interests = usePersonaStore((state) => state.interests);
  const toggleInterest = usePersonaStore((state) => state.toggleInterest);
  const setOnboardingComplete = usePersonaStore((state) => state.setOnboardingComplete);

  const handleFinish = () => {
    setOnboardingComplete(true);
    router.replace('/(tabs)/home');
  };

  return (
    <View className="flex-1 bg-slate-900">
      {/* Header */}
      <View className="px-6 pt-10 pb-4 border-b border-slate-800 bg-slate-950">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-xs uppercase font-bold tracking-widest text-sky-400">
            Step 2 of 2 · Priority Triggers
          </Text>
          <View className="bg-sky-950 border border-sky-600/40 px-2.5 py-0.5 rounded-full">
            <Text className="text-[11px] font-mono text-sky-300 font-bold">{interests.length} Active</Text>
          </View>
        </View>
        <Text className="text-2xl font-extrabold text-white">What alerts matter most?</Text>
        <Text className="text-xs text-slate-400 mt-1">
          The 40/20/20/20 scoring model boosts widgets matching your active selections.
        </Text>
      </View>

      {/* Grid of Interests */}
      <ScrollView className="flex-1 px-5 py-4" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="space-y-2.5">
          {INTEREST_OPTIONS.map((item) => {
            const isChecked = interests.includes(item.id as Interest);

            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => toggleInterest(item.id as Interest)}
                activeOpacity={0.8}
                className={`p-3.5 rounded-xl border flex-row items-center justify-between transition-all ${
                  isChecked
                    ? 'bg-sky-950/70 border-sky-400'
                    : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <View className="flex-row items-center space-x-3 flex-1 pr-3">
                  <View
                    className={`w-9 h-9 rounded-lg items-center justify-center ${
                      isChecked ? 'bg-sky-500 text-white' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={20}
                      color={isChecked ? '#ffffff' : '#94a3b8'}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-white">{item.label}</Text>
                    <Text className="text-[11px] text-slate-400">{item.description}</Text>
                  </View>
                </View>

                <View
                  className={`w-5 h-5 rounded border items-center justify-center ${
                    isChecked ? 'border-sky-400 bg-sky-500' : 'border-slate-600 bg-slate-900'
                  }`}
                >
                  {isChecked && <MaterialCommunityIcons name="check" size={14} color="#ffffff" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Finish Navigation */}
      <View className="p-5 border-t border-slate-800 bg-slate-950">
        <TouchableOpacity
          onPress={handleFinish}
          activeOpacity={0.85}
          className="w-full bg-emerald-600 hover:bg-emerald-500 py-3.5 px-6 rounded-xl flex-row items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20"
        >
          <Text className="text-white font-bold text-base">Build Personalized Homepage</Text>
          <MaterialCommunityIcons name="view-dashboard-outline" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
