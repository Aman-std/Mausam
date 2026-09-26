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
      className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 shadow-sm"
      accessibilityLabel="Gramin Krishi Mausam Seva Advisory for Farmers"
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="sprout" size={16} color="#34d399" />
          <Text className="text-xs font-semibold text-emerald-400">
            Gramin Krishi Mausam Advisory
          </Text>
        </View>
        <Text className="text-[10px] text-slate-400">Kharif Season</Text>
      </View>

      <Text className="text-sm font-bold text-white mb-2.5">
        Field Operations & Soil Guidance
      </Text>

      {/* Advisory Cards */}
      <View className="space-y-2 mb-3">
        <View className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/50">
          <View className="flex-row items-center space-x-1.5 mb-1">
            <MaterialCommunityIcons name="water-outline" size={14} color="#60a5fa" />
            <Text className="text-xs font-bold text-slate-200">Irrigation Guidance</Text>
          </View>
          <Text className="text-[11px] text-slate-400 leading-snug">
            {isHighRain
              ? 'Postpone artificial irrigation. Ensure field bunds have active spillways to prevent root submergence.'
              : 'Soil moisture adequate for vegetative growth. Moderate sprinkler irrigation acceptable.'}
          </Text>
        </View>

        <View className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/50">
          <View className="flex-row items-center space-x-1.5 mb-1">
            <MaterialCommunityIcons name="spray" size={14} color="#f59e0b" />
            <Text className="text-xs font-bold text-slate-200">Foliar Spray Window</Text>
          </View>
          <Text className="text-[11px] text-slate-400 leading-snug">
            {weather.wind > 30 || weather.rain > 40
              ? 'Suspend foliar pesticide and fertilizer spraying due to high wind drift and wash-off.'
              : 'Favorable spray window between 7:00 AM - 11:00 AM under calm surface winds.'}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between pt-1 border-t border-slate-700/40">
        <Text className="text-[10px] text-slate-500">IMD Agromet Advisory Service · ICAR</Text>
        <Text className="text-[10px] text-emerald-400 font-medium">Toll-free: 1800-180-1551</Text>
      </View>
    </View>
  );
}
