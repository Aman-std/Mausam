import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePersonaStore } from '../../src/store/personaStore';
import { PERSONA_PROFILES } from '../../src/data/personaProfiles';
import { Persona } from '../../src/types';

export default function PersonaScreen() {
  const router = useRouter();
  const selectedPersona = usePersonaStore((state) => state.persona);
  const setPersona = usePersonaStore((state) => state.setPersona);

  const personas: Persona[] = ['commuter', 'farmer', 'general', 'fisherman'];

  const handleSelect = (p: Persona) => {
    setPersona(p);
  };

  const handleNext = () => {
    router.push('/onboarding/interests');
  };

  return (
    <View className="flex-1 bg-slate-900">
      {/* Header */}
      <View className="px-6 pt-10 pb-4 border-b border-slate-800 bg-slate-950">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-xs uppercase font-bold tracking-widest text-sky-400">
            Step 1 of 2 · Persona Calibration
          </Text>
          <View className="bg-slate-800 px-2.5 py-0.5 rounded-full">
            <Text className="text-[11px] font-mono text-slate-300">4 Personas</Text>
          </View>
        </View>
        <Text className="text-2xl font-extrabold text-white">Who are you?</Text>
        <Text className="text-xs text-slate-400 mt-1">
          The homepage adapts its layout, widgets, and warning priority to your persona.
        </Text>
      </View>

      {/* Persona Cards List */}
      <ScrollView className="flex-1 px-5 py-4" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="space-y-3">
          {personas.map((pKey) => {
            const profile = PERSONA_PROFILES[pKey];
            const isSelected = selectedPersona === pKey;

            return (
              <TouchableOpacity
                key={pKey}
                onPress={() => handleSelect(pKey)}
                activeOpacity={0.8}
                className={`p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-sky-950/60 border-sky-400 shadow-md shadow-sky-500/10'
                    : 'bg-slate-800/50 border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-row items-center space-x-3">
                    <View
                      className={`w-11 h-11 rounded-xl items-center justify-center ${
                        isSelected ? 'bg-sky-500 text-white' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      <MaterialCommunityIcons
                        name={profile.icon as any}
                        size={24}
                        color={isSelected ? '#ffffff' : '#94a3b8'}
                      />
                    </View>
                    <View>
                      <Text className="text-base font-bold text-white">{profile.label}</Text>
                      <Text className="text-xs text-slate-400">{profile.tagline}</Text>
                    </View>
                  </View>

                  <View
                    className={`w-6 h-6 rounded-full border items-center justify-center ${
                      isSelected ? 'border-sky-400 bg-sky-500' : 'border-slate-600 bg-slate-900'
                    }`}
                  >
                    {isSelected && <MaterialCommunityIcons name="check" size={14} color="#ffffff" />}
                  </View>
                </View>

                <Text className="text-xs text-slate-300 mb-3 leading-relaxed">
                  {profile.description}
                </Text>

                {/* Prioritized Features Pill Row */}
                <View className="flex-row flex-wrap gap-1.5 pt-1 border-t border-slate-700/40">
                  {profile.keyNeeds.slice(0, 3).map((need, idx) => (
                    <View
                      key={idx}
                      className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/40"
                    >
                      <Text className="text-[10px] text-slate-300 font-medium">✦ {need}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View className="p-5 border-t border-slate-800 bg-slate-950">
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.85}
          className="w-full bg-sky-500 hover:bg-sky-400 py-3.5 px-6 rounded-xl flex-row items-center justify-center space-x-2"
        >
          <Text className="text-white font-bold text-base">Next: Configure Interests</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
