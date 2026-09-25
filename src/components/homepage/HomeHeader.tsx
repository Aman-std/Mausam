import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePersonaStore } from '../../store/personaStore';
import { useAccessibilityStore } from '../../store/accessibilityStore';
import { useWeatherStore } from '../../store/weatherStore';
import { PERSONA_PROFILES } from '../../data/personaProfiles';
import { Persona } from '../../types';

export default function HomeHeader() {
  const persona = usePersonaStore((state) => state.persona);
  const location = usePersonaStore((state) => state.location);
  const setPersona = usePersonaStore((state) => state.setPersona);
  const setLocation = usePersonaStore((state) => state.setLocation);

  const weather = useWeatherStore((state) => state.weather);
  const isSpeaking = useAccessibilityStore((state) => state.isSpeaking);
  const speakWeatherBriefing = useAccessibilityStore((state) => state.speakWeatherBriefing);
  const stopSpeaking = useAccessibilityStore((state) => state.stopSpeaking);

  const currentProfile = PERSONA_PROFILES[persona];

  // Quick cycle persona on tap
  const handleCyclePersona = () => {
    const list: Persona[] = ['commuter', 'farmer', 'fisherman', 'general'];
    const nextIdx = (list.indexOf(persona) + 1) % list.length;
    setPersona(list[nextIdx]);
  };

  // Quick cycle location
  const handleCycleLocation = () => {
    const locations = [
      'New Delhi (NCR)',
      'Bhubaneswar (Coastal Odisha)',
      'Pune (Rural Agro Belt)',
      'Nagpur (Central Zone)',
    ];
    const nextIdx = (locations.indexOf(location) + 1) % locations.length;
    setLocation(locations[nextIdx]);
  };

  // Accessibility TTS Briefing
  const handleAudioBriefing = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const alertSnippet = weather.alertTitle
        ? `Attention: ${weather.alertTitle}. ${weather.alertMessage}. `
        : '';
      const text = `Mausam Weather Briefing for ${location}. Current temperature is ${weather.temp} degrees Celsius with ${weather.condition}. Rain probability is ${weather.rain} percent. ${alertSnippet}Viewing as ${currentProfile.label}.`;
      speakWeatherBriefing(text);
    }
  };

  return (
    <View className="bg-slate-950 px-5 pt-8 pb-3 border-b border-slate-800">
      {/* Top Ministry Ribbon */}
      <View className="flex-row items-center justify-between mb-2.5">
        <View className="flex-row items-center space-x-1.5">
          <View className="w-5 h-5 rounded-full bg-amber-500/20 items-center justify-center border border-amber-500/40">
            <MaterialCommunityIcons name="weather-partly-cloudy" size={12} color="#f59e0b" />
          </View>
          <Text className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
            India Meteorological Dept.
          </Text>
        </View>

        {/* Accessibility Soundscapes Audio Button */}
        <TouchableOpacity
          onPress={handleAudioBriefing}
          activeOpacity={0.7}
          className={`flex-row items-center space-x-1 px-2.5 py-1 rounded-full border ${
            isSpeaking
              ? 'bg-red-500/20 border-red-500 text-red-300'
              : 'bg-sky-500/10 border-sky-500/30'
          }`}
          accessibilityLabel="Audio Weather Briefing TTS"
        >
          <MaterialCommunityIcons
            name={isSpeaking ? 'volume-high' : 'volume-medium'}
            size={14}
            color={isSpeaking ? '#ef4444' : '#38bdf8'}
          />
          <Text className={`text-[10px] font-bold ${isSpeaking ? 'text-red-400' : 'text-sky-300'}`}>
            {isSpeaking ? 'Stop Audio' : 'Audio Brief'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Location & Persona Row */}
      <View className="flex-row items-center justify-between">
        {/* Clickable Location */}
        <TouchableOpacity
          onPress={handleCycleLocation}
          activeOpacity={0.7}
          className="flex-row items-center space-x-1"
        >
          <MaterialCommunityIcons name="map-marker" size={18} color="#38bdf8" />
          <View>
            <View className="flex-row items-center space-x-1">
              <Text className="text-base font-extrabold text-white">{location}</Text>
              <MaterialCommunityIcons name="chevron-down" size={14} color="#64748b" />
            </View>
            <Text className="text-[10px] text-slate-400">Tap to cycle demo locations</Text>
          </View>
        </TouchableOpacity>

        {/* Clickable Persona Switcher Pill */}
        <TouchableOpacity
          onPress={handleCyclePersona}
          activeOpacity={0.75}
          className="flex-row items-center space-x-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-sky-500/40"
          accessibilityLabel={`Active persona is ${currentProfile.label}. Tap to cycle persona.`}
        >
          <MaterialCommunityIcons
            name={currentProfile.icon as any}
            size={16}
            color="#38bdf8"
          />
          <View className="items-end">
            <Text className="text-[9px] uppercase font-mono font-bold text-slate-400">Persona</Text>
            <Text className="text-xs font-bold text-sky-300">{currentProfile.label.split('/')[0]}</Text>
          </View>
          <MaterialCommunityIcons name="swap-horizontal" size={14} color="#94a3b8" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
