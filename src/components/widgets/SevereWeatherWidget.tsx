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

  const borderColor = isRed ? 'border-red-500/70' : isOrange ? 'border-amber-500/70' : 'border-yellow-500/70';
  const bgColor = isRed ? 'bg-red-950/70' : isOrange ? 'bg-amber-950/70' : 'bg-yellow-950/70';
  const badgeBg = isRed ? 'bg-red-500' : isOrange ? 'bg-amber-500' : 'bg-yellow-500';

  return (
    <View
      className={`rounded-2xl p-4 border ${borderColor} ${bgColor}`}
      accessibilityLabel={`Severe Weather Alert: ${weather.alertTitle || 'Notice'}`}
      accessibilityRole="alert"
    >
      <View className="flex-row items-center justify-between mb-2.5">
        <View className="flex-row items-center space-x-1.5">
          <View className={`px-2 py-0.5 rounded-md ${badgeBg} flex-row items-center space-x-1`}>
            <MaterialCommunityIcons name="alert-octagon" size={13} color="#ffffff" />
            <Text className="text-[10px] font-bold text-white uppercase tracking-wider">
              {weather.imdColor} Alert
            </Text>
          </View>
          <Text className="text-[10px] text-slate-300 font-medium">IMD Weather Warning</Text>
        </View>

        <Text className="text-[10px] text-slate-400 font-mono">Immediate Action</Text>
      </View>

      <Text className="text-base font-bold text-white mb-1.5 leading-snug">
        {weather.alertTitle || 'Severe Meteorological Advisory In Effect'}
      </Text>

      <Text className="text-xs text-slate-200 leading-relaxed mb-3">
        {weather.alertMessage || 'Please observe safety guidelines and limit non-essential outdoor travel.'}
      </Text>

      {/* Recommended Protocols */}
      <View className="bg-black/30 rounded-xl p-2.5 space-y-1.5 border border-white/5">
        <View className="flex-row items-center space-x-2">
          <MaterialCommunityIcons name="shield-check" size={14} color="#38bdf8" />
          <Text className="text-xs text-slate-300 font-medium">Follow local district disaster guidelines</Text>
        </View>
        <View className="flex-row items-center space-x-2">
          <MaterialCommunityIcons name="flash-off" size={14} color="#f59e0b" />
          <Text className="text-xs text-slate-300 font-medium">Avoid sheltering under solitary trees or tin roofs</Text>
        </View>
      </View>
    </View>
  );
}
