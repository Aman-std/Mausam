import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScoredWidget, MockWeatherData } from '../../types';
import { usePersonaStore } from '../../store/personaStore';

// Import all 13 widget components
import SevereWeatherWidget from '../widgets/SevereWeatherWidget';
import AtmoAnomalyWidget from '../widgets/AtmoAnomalyWidget';
import TemperatureWidget from '../widgets/TemperatureWidget';
import RainWidget from '../widgets/RainWidget';
import ForecastWidget from '../widgets/ForecastWidget';
import CommuteWidget from '../widgets/CommuteWidget';
import FarmerAdvisoryWidget from '../widgets/FarmerAdvisoryWidget';
import MarineConditionsWidget from '../widgets/MarineConditionsWidget';
import WindWidget from '../widgets/WindWidget';
import AQIWidget from '../widgets/AQIWidget';
import UVWidget from '../widgets/UVWidget';
import VisibilityWidget from '../widgets/VisibilityWidget';
import RecommendationWidget from '../widgets/RecommendationWidget';

interface Props {
  widget: ScoredWidget;
  rank: number;
  weather: MockWeatherData;
}

export default function WidgetContainer({ widget, rank, weather }: Props) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const showInspector = usePersonaStore((state) => state.showInspector);

  const renderInnerWidget = () => {
    switch (widget.id) {
      case 'severe_weather':
        return <SevereWeatherWidget widget={widget} weather={weather} />;
      case 'atmo_anomaly':
        return <AtmoAnomalyWidget widget={widget} />;
      case 'temperature':
        return <TemperatureWidget widget={widget} weather={weather} />;
      case 'rain':
        return <RainWidget widget={widget} weather={weather} />;
      case 'forecast':
        return <ForecastWidget widget={widget} weather={weather} />;
      case 'commute':
        return <CommuteWidget widget={widget} weather={weather} />;
      case 'farmer_advisory':
        return <FarmerAdvisoryWidget widget={widget} weather={weather} />;
      case 'marine_conditions':
        return <MarineConditionsWidget widget={widget} weather={weather} />;
      case 'wind':
        return <WindWidget widget={widget} weather={weather} />;
      case 'aqi':
        return <AQIWidget widget={widget} weather={weather} />;
      case 'uv':
        return <UVWidget widget={widget} weather={weather} />;
      case 'visibility':
        return <VisibilityWidget widget={widget} weather={weather} />;
      case 'recommendation':
        return <RecommendationWidget widget={widget} weather={weather} />;
      default:
        return null;
    }
  };

  return (
    <View className="mb-3">
      {/* Algorithm Relevance Header: ONLY shown when Inspector Mode is activated */}
      {showInspector && (
        <View className="flex-row items-center justify-between px-1 mb-1">
          <View className="flex-row items-center space-x-1.5">
            <View className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              <Text className="text-[10px] font-mono font-bold text-sky-400">#{rank}</Text>
            </View>

            {widget.isOverride && (
              <View className="bg-red-500/20 border border-red-500/40 px-1.5 py-0.5 rounded">
                <Text className="text-[9px] font-bold text-red-400 uppercase">Override</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => setShowBreakdown(!showBreakdown)}
            activeOpacity={0.7}
            className="flex-row items-center space-x-1 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700/60"
          >
            <Text className="text-[10px] font-mono text-slate-300">
              Score: <Text className="font-bold text-sky-400">{widget.score.toFixed(3)}</Text>
            </Text>
            <MaterialCommunityIcons
              name={showBreakdown ? 'chevron-up' : 'chevron-down'}
              size={12}
              color="#94a3b8"
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Expandable 40/20/20/20 Math Formula Breakdown (Inspector Mode only) */}
      {showInspector && showBreakdown && (
        <View className="bg-slate-950 p-2.5 rounded-xl border border-sky-500/30 mb-2">
          <Text className="text-[9px] font-bold uppercase text-sky-400 mb-1 tracking-wider">
            Relevance Score (40% Persona · 20% Interest · 20% Scenario · 20% Urgency)
          </Text>
          <View className="flex-row items-center justify-between text-[10px] font-mono">
            <Text className="text-[10px] text-slate-300">
              P: <Text className="text-white font-bold">{widget.breakdown.personaScore}</Text>
            </Text>
            <Text className="text-[10px] text-slate-300">
              Int: <Text className="text-white font-bold">{widget.breakdown.interestScore}</Text>
            </Text>
            <Text className="text-[10px] text-slate-300">
              Sc: <Text className="text-white font-bold">{widget.breakdown.scenarioScore}</Text>
            </Text>
            <Text className="text-[10px] text-slate-300">
              Urg: <Text className="text-white font-bold">{widget.breakdown.urgencyScore}</Text>
            </Text>
          </View>
        </View>
      )}

      {/* The Clean, Unobstructed Widget Card */}
      {renderInnerWidget()}
    </View>
  );
}
