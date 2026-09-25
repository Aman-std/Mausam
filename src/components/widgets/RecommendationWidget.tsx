import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MockWeatherData, ScoredWidget } from '../../types';
import { usePersonaStore } from '../../store/personaStore';

interface Props {
  widget: ScoredWidget;
  weather: MockWeatherData;
}

export default function RecommendationWidget({ weather }: Props) {
  const persona = usePersonaStore((state) => state.persona);

  const getPersonaAdvice = () => {
    if (weather.severity >= 0.8) {
      return {
        title: 'Emergency Safety Protocol Active',
        advice: 'Stay indoors away from windows. Keep satellite/battery radio active and maintain emergency contacts.',
        icon: 'shield-alert',
        color: 'text-red-300',
        borderColor: 'border-red-500/50',
        bg: 'bg-red-950/40',
      };
    }

    switch (persona) {
      case 'farmer':
        return {
          title: 'Agro-Meteorological Action Point',
          advice: weather.rain > 50
            ? 'Cover harvested grain bags in open mandis. Inspect paddy field bunds for natural drainage.'
            : 'Favorable morning conditions for tilling and micro-nutrient foliar spray application.',
          icon: 'sprout',
          color: 'text-emerald-300',
          borderColor: 'border-emerald-500/40',
          bg: 'bg-emerald-950/40',
        };
      case 'commuter':
        return {
          title: 'Transit Safety Recommendation',
          advice: weather.rain > 50
            ? 'Depart 20 mins early. Switch two-wheeler travel to metro/bus to avoid ring road waterlogging.'
            : 'Clear transit corridor. Good driving visibility and low traffic congestion probability.',
          icon: 'car-clock',
          color: 'text-amber-300',
          borderColor: 'border-amber-500/40',
          bg: 'bg-amber-950/40',
        };
      case 'fisherman':
        return {
          title: 'Harbor & Marine Dispatch',
          advice: weather.wind > 40
            ? 'Anchor crafts securely at jetty. Inspect mooring ropes against surging harbor swells.'
            : 'Calm morning sea state. Optimal window for inshore gillnetting up to 8 nautical miles.',
          icon: 'waves',
          color: 'text-cyan-300',
          borderColor: 'border-cyan-500/40',
          bg: 'bg-cyan-950/40',
        };
      default:
        return {
          title: 'Daily Citizen Briefing',
          advice: weather.rain > 40
            ? 'Carry a rainproof windcheater and umbrella. Expect damp evening commutes.'
            : 'Comfortable day for outdoor activities. Adequate solar exposure with pleasant breezes.',
          icon: 'lightbulb-outline',
          color: 'text-sky-300',
          borderColor: 'border-sky-500/40',
          bg: 'bg-sky-950/40',
        };
    }
  };

  const advice = getPersonaAdvice();

  return (
    <View
      className={`rounded-2xl p-4 border ${advice.borderColor} ${advice.bg} shadow-sm`}
      accessibilityLabel={`AI Recommendation: ${advice.advice}`}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name={advice.icon as any} size={16} color="#38bdf8" />
          <Text className="text-xs font-bold text-sky-300 uppercase tracking-wide">
            AI Contextual Recommendation
          </Text>
        </View>
        <Text className="text-[10px] text-slate-400 font-mono capitalize">{persona} profile</Text>
      </View>

      <Text className="text-sm font-extrabold text-white mb-1.5">{advice.title}</Text>
      <Text className={`text-xs ${advice.color} leading-relaxed font-medium`}>{advice.advice}</Text>
    </View>
  );
}
