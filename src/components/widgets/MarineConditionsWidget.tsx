import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MockWeatherData, ScoredWidget } from '../../types';

interface Props {
  widget: ScoredWidget;
  weather: MockWeatherData;
}

export default function MarineConditionsWidget({ weather }: Props) {
  const isDanger = weather.wind > 50 || weather.severity >= 0.7;
  const waveHeight = isDanger ? '3.5 - 5.2 m' : '0.8 - 1.4 m';
  const seaState = isDanger ? 'Rough to Phenomenal' : 'Slight to Moderate';

  return (
    <View
      className={`rounded-2xl p-4 border shadow-sm ${
        isDanger
          ? 'bg-red-950/60 border-red-500/70'
          : 'bg-cyan-950/50 border-cyan-500/60'
      }`}
      accessibilityLabel={`Marine conditions: ${seaState}, wave height ${waveHeight}`}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="waves" size={16} color={isDanger ? '#ef4444' : '#22d3ee'} />
          <Text
            className={`text-xs font-bold uppercase tracking-wide ${
              isDanger ? 'text-red-300' : 'text-cyan-300'
            }`}
          >
            Coastal & Deep Sea Bulletin
          </Text>
        </View>
        <View className={`px-2 py-0.5 rounded ${isDanger ? 'bg-red-600' : 'bg-cyan-600'}`}>
          <Text className="text-[10px] font-bold text-white uppercase">
            {isDanger ? 'Port Warning: Signal 8' : 'Sea State: Safe'}
          </Text>
        </View>
      </View>

      <Text className="text-sm font-extrabold text-white mb-2">
        {isDanger ? '🚨 Fishermen Warning: Total Sea Venturing Ban' : 'Standard Coastal Fishing Permitted'}
      </Text>

      {/* Metrics Row */}
      <View className="flex-row items-center justify-between bg-black/40 p-2.5 rounded-xl border border-white/10 mb-3">
        <View>
          <Text className="text-[10px] text-slate-400">Wave Swell Height</Text>
          <Text className="text-sm font-bold text-white">{waveHeight}</Text>
        </View>
        <View>
          <Text className="text-[10px] text-slate-400">Offshore Gusts</Text>
          <Text className="text-sm font-bold text-white">{weather.wind} km/h</Text>
        </View>
        <View>
          <Text className="text-[10px] text-slate-400">Tidal Cycle</Text>
          <Text className="text-sm font-bold text-white">High @ 14:30</Text>
        </View>
      </View>

      <Text className={`text-xs leading-snug ${isDanger ? 'text-red-200' : 'text-cyan-200'}`}>
        {isDanger
          ? 'Deep sea trawlers advised to return to nearest harbor immediately. Squally winds may capsize small motorized crafts.'
          : 'Normal fishing operations allowed along designated coastal grid up to 15 nautical miles.'}
      </Text>
    </View>
  );
}
