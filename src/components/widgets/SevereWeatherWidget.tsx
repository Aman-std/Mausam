import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MockWeatherData, ScoredWidget } from '../../types';

interface Props {
  widget: ScoredWidget;
  weather: MockWeatherData;
}

export default function SevereWeatherWidget({ weather }: Props) {
  const isRed = weather.imdColor === 'red';
  const isOrange = weather.imdColor === 'orange';

  const borderColor = isRed ? 'border-red-500' : isOrange ? 'border-amber-500' : 'border-yellow-500';
  const bgColor = isRed ? 'bg-red-950/80' : isOrange ? 'bg-amber-950/80' : 'bg-yellow-950/80';
  const badgeBg = isRed ? 'bg-red-500' : isOrange ? 'bg-amber-500' : 'bg-yellow-500';
  const textColor = isRed ? 'text-red-200' : isOrange ? 'text-amber-200' : 'text-yellow-200';

  return (
    <View
      className={`rounded-2xl p-4 border ${borderColor} ${bgColor} shadow-lg`}
      accessibilityLabel={`Severe Weather Alert: ${weather.alertTitle || 'Notice'}`}
      accessibilityRole="alert"
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center space-x-2">
          <View className={`px-2.5 py-0.5 rounded-full ${badgeBg} flex-row items-center space-x-1`}>
            <MaterialCommunityIcons name="alert-octagon" size={14} color="#ffffff" />
            <Text className="text-[11px] font-extrabold text-white uppercase tracking-wider">
              {weather.imdColor} Alert
            </Text>
          </View>
          <Text className="text-[10px] text-slate-300 font-mono">IMD Flash Bulletin</Text>
        </View>

        <View className="bg-black/40 px-2 py-0.5 rounded border border-white/10">
          <Text className="text-[10px] font-bold text-red-400">HARD OVERRIDE</Text>
        </View>
      </View>

      <Text className="text-base font-extrabold text-white mb-1.5 leading-snug">
        {weather.alertTitle || 'Extreme Weather Advisory In Effect'}
      </Text>

      <Text className={`text-xs ${textColor} leading-relaxed mb-3`}>
        {weather.alertMessage || 'Please observe safety guidelines and limit non-essential movement.'}
      </Text>

      {/* Recommended Protocols */}
      <View className="bg-black/30 rounded-xl p-2.5 border border-white/5 space-y-1">
        <View className="flex-row items-center space-x-2">
          <MaterialCommunityIcons name="shield-check" size={14} color="#38bdf8" />
          <Text className="text-[11px] text-slate-200 font-medium">Keep emergency contacts on speed dial</Text>
        </View>
        <View className="flex-row items-center space-x-2">
          <MaterialCommunityIcons name="power-plug-off" size={14} color="#f59e0b" />
          <Text className="text-[11px] text-slate-200 font-medium">Charge mobile devices & keep torches ready</Text>
        </View>
      </View>
    </View>
  );
}
