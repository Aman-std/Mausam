import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePersonaStore } from '../../src/store/personaStore';
import { useAccessibilityStore } from '../../src/store/accessibilityStore';
import { PERSONA_PROFILES } from '../../src/data/personaProfiles';

export default function SettingsScreen() {
  const router = useRouter();
  const persona = usePersonaStore((state) => state.persona);
  const interests = usePersonaStore((state) => state.interests);
  const location = usePersonaStore((state) => state.location);
  const resetProfile = usePersonaStore((state) => state.resetProfile);

  const ttsEnabled = useAccessibilityStore((state) => state.ttsEnabled);
  const toggleTTS = useAccessibilityStore((state) => state.toggleTTS);
  const largeText = useAccessibilityStore((state) => state.largeText);
  const toggleLargeText = useAccessibilityStore((state) => state.toggleLargeText);
  const highContrast = useAccessibilityStore((state) => state.highContrast);
  const toggleHighContrast = useAccessibilityStore((state) => state.toggleHighContrast);

  const profile = PERSONA_PROFILES[persona];

  const handleRestartOnboarding = () => {
    resetProfile();
    router.replace('/onboarding');
  };

  return (
    <View className="flex-1 bg-slate-900">
      {/* Header */}
      <View className="px-5 pt-8 pb-4 border-b border-slate-800 bg-slate-950">
        <View className="flex-row items-center space-x-2">
          <MaterialCommunityIcons name="cog-outline" size={20} color="#38bdf8" />
          <Text className="text-base font-extrabold text-white">App Settings & Profile</Text>
        </View>
        <Text className="text-xs text-slate-400 mt-0.5">
          Preferences & Accessibility Calibration
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 py-4" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Profile Card */}
        <View className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 mb-5">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center space-x-3">
              <View className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 items-center justify-center">
                <MaterialCommunityIcons name={profile.icon as any} size={22} color="#38bdf8" />
              </View>
              <View>
                <Text className="text-sm font-extrabold text-white">{profile.label}</Text>
                <Text className="text-xs text-slate-400">{location}</Text>
              </View>
            </View>
            <View className="bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
              <Text className="text-[10px] font-bold text-emerald-400">ACTIVE</Text>
            </View>
          </View>

          <Text className="text-xs text-slate-300 mb-3 leading-relaxed">{profile.description}</Text>

          <View className="flex-row flex-wrap gap-1.5 pt-2 border-t border-slate-700/50 mb-3">
            {interests.map((intId) => (
              <View key={intId} className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-700">
                <Text className="text-[10px] text-sky-300 font-mono capitalize">{intId}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            onPress={() => router.push('/auth/login')}
            activeOpacity={0.8}
            className="w-full bg-sky-500/10 hover:bg-sky-500/20 py-2 rounded-xl items-center border border-sky-400/30 flex-row justify-center space-x-1.5"
          >
            <MaterialCommunityIcons name="cloud-sync-outline" size={15} color="#38bdf8" />
            <Text className="text-xs font-semibold text-sky-300">Sign In / Sync with Supabase</Text>
          </TouchableOpacity>
        </View>

        {/* Accessibility Switches */}
        <View className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 mb-5 space-y-3">
          <Text className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Accessibility Options
          </Text>

          <View className="flex-row items-center justify-between py-1">
            <View>
              <Text className="text-xs font-semibold text-white">Audio Weather Briefings</Text>
              <Text className="text-[10px] text-slate-400">Read alerts and summaries with text-to-speech</Text>
            </View>
            <Switch
              value={ttsEnabled}
              onValueChange={toggleTTS}
              trackColor={{ false: '#334155', true: '#0284c7' }}
              thumbColor={ttsEnabled ? '#ffffff' : '#94a3b8'}
            />
          </View>

          <View className="flex-row items-center justify-between py-1 border-t border-slate-700/50">
            <View>
              <Text className="text-xs font-semibold text-white">High Contrast UI</Text>
              <Text className="text-[10px] text-slate-400">Enhanced border and text luminance</Text>
            </View>
            <Switch
              value={highContrast}
              onValueChange={toggleHighContrast}
              trackColor={{ false: '#334155', true: '#0284c7' }}
              thumbColor={highContrast ? '#ffffff' : '#94a3b8'}
            />
          </View>

          <View className="flex-row items-center justify-between py-1 border-t border-slate-700/50">
            <View>
              <Text className="text-xs font-semibold text-white">Large Typography</Text>
              <Text className="text-[10px] text-slate-400">Increased font scale for senior citizens</Text>
            </View>
            <Switch
              value={largeText}
              onValueChange={toggleLargeText}
              trackColor={{ false: '#334155', true: '#0284c7' }}
              thumbColor={largeText ? '#ffffff' : '#94a3b8'}
            />
          </View>
        </View>

        {/* Onboarding Restart Action */}
        <TouchableOpacity
          onPress={handleRestartOnboarding}
          activeOpacity={0.8}
          className="w-full bg-slate-800 hover:bg-slate-700 py-3 rounded-xl items-center border border-slate-700 mb-6"
        >
          <Text className="text-xs font-bold text-slate-200">Re-run Onboarding & Persona Selection</Text>
        </TouchableOpacity>

        {/* SIH Information Badge */}
        <View className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 items-center">
          <Text className="text-xs font-bold text-slate-300">Mausam Mobile Application · SIH-26076</Text>
          <Text className="text-[10px] text-slate-500 mt-1 text-center">
            Developed with React Native, Expo Web, NativeWind & Zustand.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
