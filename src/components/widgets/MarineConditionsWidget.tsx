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
          : 'bg-slate-800/80 border-slate-700/60'
      }`}
      accessibilityLabel={`Marine conditions: ${seaState}, wave height ${waveHeight}`}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="waves" size={16} color={isDanger ? '#ef4444' : '#38bdf8'} />
          <Text
            className={`text-xs font-semibold ${
              isDanger ? 'text-red-300' : 'text-cyan-400'
            }`}
          >
            Coastal & Marine Sea State
          </Text>
        </View>
        <Text className={`text-[10px] font-bold ${isDanger ? 'text-red-400' : 'text-slate-400'}`}>
          {isDanger ? 'Port Warning: Signal 8' : 'State: Normal'}
        </Text>
      </View>

      <Text className="text-sm font-bold text-white mb-2">
        {isDanger ? 'Fishermen Warning: Total Sea Venturing Ban' : 'Standard Coastal Navigation Permitted'}
      </Text>

      {/* Metrics Row */}
      <View className="flex-row items-center justify-between bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/50 mb-2.5">
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

      <Text className={`text-xs leading-snug ${isDanger ? 'text-red-200' : 'text-slate-400'}`}>
        {isDanger
          ? 'Deep sea trawlers advised to return to nearest harbor immediately. Squally winds may capsize small motorized crafts.'
          : 'Normal fishing operations allowed along designated coastal grid up to 15 nautical miles.'}
      </Text>
    </View>
  );
}
