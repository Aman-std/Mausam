import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MockWeatherData, ScoredWidget } from '../../types';

interface Props {
  widget: ScoredWidget;
  weather: MockWeatherData;
}

export default function FarmerAdvisoryWidget({ weather }: Props) {
  const isHighRain = weather.rain > 50;

  return (
    <View
      className="bg-emerald-950/50 rounded-2xl p-4 border border-emerald-500/60 shadow-sm"
      accessibilityLabel="Gramin Krishi Mausam Seva Advisory for Farmers"
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="sprout" size={16} color="#34d399" />
          <Text className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
            Gramin Krishi Mausam Advisory
          </Text>
        </View>
        <View className="bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
          <Text className="text-[10px] font-bold text-emerald-300">Kharif Season</Text>
        </View>
      </View>

      <Text className="text-sm font-extrabold text-white mb-2">
        Field Operations & Soil Guidance
      </Text>

      {/* Advisory Cards */}
      <View className="space-y-2 mb-3">
        <View className="bg-black/40 p-2.5 rounded-xl border border-emerald-500/20">
          <View className="flex-row items-center space-x-1.5 mb-1">
            <MaterialCommunityIcons name="water" size={14} color="#60a5fa" />
            <Text className="text-xs font-bold text-emerald-200">Irrigation & Drainage</Text>
          </View>
          <Text className="text-[11px] text-slate-300 leading-snug">
            {isHighRain
              ? 'Postpone artificial irrigation. Ensure field bunds have active spillways to prevent root submergence.'
              : 'Soil moisture adequate for vegetative growth. Moderate sprinkler irrigation acceptable.'}
          </Text>
        </View>

        <View className="bg-black/40 p-2.5 rounded-xl border border-emerald-500/20">
          <View className="flex-row items-center space-x-1.5 mb-1">
            <MaterialCommunityIcons name="spray" size={14} color="#fbbf24" />
            <Text className="text-xs font-bold text-amber-200">Pesticide Spray Window</Text>
          </View>
          <Text className="text-[11px] text-slate-300 leading-snug">
            {weather.wind > 30 || weather.rain > 40
              ? '⛔ Suspend all foliar pesticide and urea spraying due to wash-off and wind drift.'
              : '✅ Favorable spray window between 7:00 AM - 11:00 AM under calm surface winds.'}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between pt-1 border-t border-emerald-900/50">
        <Text className="text-[10px] text-slate-400">IMD Agromet Advisory Service · ICAR</Text>
        <Text className="text-[10px] text-emerald-400 font-bold">Kisan Call Center: 1800-180-1551</Text>
      </View>
    </View>
  );
}
