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
  const showInspector = usePersonaStore((state) => state.showInspector);
  const toggleInspector = usePersonaStore((state) => state.toggleInspector);

  const weather = useWeatherStore((state) => state.weather);
  const isSpeaking = useAccessibilityStore((state) => state.isSpeaking);
  const speakWeatherBriefing = useAccessibilityStore((state) => state.speakWeatherBriefing);
  const stopSpeaking = useAccessibilityStore((state) => state.stopSpeaking);

  const currentProfile = PERSONA_PROFILES[persona];

  const handleCyclePersona = () => {
    const list: Persona[] = ['commuter', 'farmer', 'fisherman', 'general'];
    const nextIdx = (list.indexOf(persona) + 1) % list.length;
    setPersona(list[nextIdx]);
  };

  const handleCycleLocation = () => {
    const locations = [
      'New Delhi',
      'Bhubaneswar',
      'Pune',
      'Nagpur',
    ];
    const nextIdx = (locations.indexOf(location) + 1) % locations.length;
    setLocation(locations[nextIdx]);
  };

  const handleAudioBriefing = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const alertSnippet = weather.alertTitle
        ? `Alert: ${weather.alertTitle}. ${weather.alertMessage}. `
        : '';
      const text = `Weather briefing for ${location}. Currently ${weather.temp} degrees Celsius, ${weather.condition}. Rain probability ${weather.rain} percent. ${alertSnippet}Active persona: ${currentProfile.label}.`;
      speakWeatherBriefing(text);
    }
  };

  return (
    <View className="bg-slate-950 px-5 pt-8 pb-3 border-b border-slate-800/80">
      {/* Top Bar: Official Seal & Quick Actions */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center space-x-2">
          <View className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-400/20 items-center justify-center">
            <MaterialCommunityIcons name="weather-partly-cloudy" size={16} color="#38bdf8" />
          </View>
          <View>
            <Text className="text-xs font-bold tracking-wider text-slate-100 uppercase">
              Mausam
            </Text>
            <Text className="text-[9px] text-slate-400 font-medium">India Meteorological Department</Text>
          </View>
        </View>

        {/* Action Controls */}
        <View className="flex-row items-center space-x-2">
          {/* Algorithm Inspector Toggle */}
          <TouchableOpacity
            onPress={toggleInspector}
            activeOpacity={0.75}
            className={`px-2.5 py-1 rounded-full border flex-row items-center space-x-1 ${
              showInspector
                ? 'bg-sky-500/20 border-sky-400'
                : 'bg-slate-900 border-slate-700/80'
            }`}
          >
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              size={13}
              color={showInspector ? '#38bdf8' : '#94a3b8'}
            />
            <Text
              className={`text-[10px] font-semibold ${
                showInspector ? 'text-sky-300' : 'text-slate-400'
              }`}
            >
              {showInspector ? 'Inspector ON' : 'AI Scores'}
            </Text>
          </TouchableOpacity>

          {/* Audio Briefing Button */}
          <TouchableOpacity
            onPress={handleAudioBriefing}
            activeOpacity={0.7}
            className={`w-7 h-7 rounded-full items-center justify-center border ${
              isSpeaking
                ? 'bg-red-500/20 border-red-500'
                : 'bg-slate-900 border-slate-700/80'
            }`}
          >
            <MaterialCommunityIcons
              name={isSpeaking ? 'volume-high' : 'volume-medium'}
              size={15}
              color={isSpeaking ? '#ef4444' : '#94a3b8'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Bar: Location + Persona Switcher */}
      <View className="flex-row items-center justify-between">
        {/* City Location */}
        <TouchableOpacity
          onPress={handleCycleLocation}
          activeOpacity={0.75}
          className="flex-row items-center space-x-1.5"
        >
          <MaterialCommunityIcons name="map-marker-outline" size={17} color="#38bdf8" />
          <Text className="text-lg font-bold text-white tracking-tight">{location}</Text>
          <MaterialCommunityIcons name="chevron-down" size={14} color="#64748b" />
        </TouchableOpacity>

        {/* Persona Pill */}
        <TouchableOpacity
          onPress={handleCyclePersona}
          activeOpacity={0.75}
          className="flex-row items-center space-x-1.5 bg-slate-900/90 px-3 py-1.5 rounded-full border border-slate-700/70"
        >
          <MaterialCommunityIcons
            name={currentProfile.icon as any}
            size={14}
            color="#38bdf8"
          />
          <Text className="text-xs font-semibold text-slate-200">
            {currentProfile.label.split('/')[0]}
          </Text>
          <MaterialCommunityIcons name="swap-horizontal" size={13} color="#64748b" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
