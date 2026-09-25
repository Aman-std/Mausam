import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWeatherStore } from '../../store/weatherStore';
import { WEATHER_SCENARIOS } from '../../data/weatherScenarios';
import { Scenario } from '../../types';

export default function ScenarioBanner() {
  const currentScenario = useWeatherStore((state) => state.scenario);
  const weather = useWeatherStore((state) => state.weather);
  const setScenario = useWeatherStore((state) => state.setScenario);

  const scenarioKeys: Scenario[] = ['normal', 'heavy_rain', 'thunderstorm', 'cyclone'];

  const getIMDColorStyles = () => {
    switch (weather.imdColor) {
      case 'red':
        return {
          bg: 'bg-red-950/80',
          border: 'border-red-500',
          text: 'text-red-400',
          badge: 'bg-red-500',
        };
      case 'orange':
        return {
          bg: 'bg-amber-950/80',
          border: 'border-amber-500',
          text: 'text-amber-400',
          badge: 'bg-amber-500',
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-950/80',
          border: 'border-yellow-500',
          text: 'text-yellow-400',
          badge: 'bg-yellow-500',
        };
      default:
        return {
          bg: 'bg-emerald-950/60',
          border: 'border-emerald-500/40',
          text: 'text-emerald-400',
          badge: 'bg-emerald-500',
        };
    }
  };

  const styles = getIMDColorStyles();

  return (
    <View className={`px-4 py-3 mx-4 my-3 rounded-2xl border ${styles.border} ${styles.bg}`}>
      {/* Top Banner Row */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center space-x-1.5">
          <View className={`w-2.5 h-2.5 rounded-full ${styles.badge}`} />
          <Text className={`text-xs font-bold uppercase tracking-wider ${styles.text}`}>
            IMD {weather.imdColor.toUpperCase()} BULLETIN · SEVERITY {(weather.severity * 100).toFixed(0)}%
          </Text>
        </View>

        <View className="bg-black/40 px-2 py-0.5 rounded">
          <Text className="text-[10px] text-slate-300 font-mono">Live Demo Switcher</Text>
        </View>
      </View>

      <Text className="text-sm font-extrabold text-white mb-2.5 leading-snug">
        {WEATHER_SCENARIOS[currentScenario].subtitle}
      </Text>

      {/* Instant 4 Scenario Switcher Buttons for Judges */}
      <View className="flex-row space-x-1.5">
        {scenarioKeys.map((sKey) => {
          const sData = WEATHER_SCENARIOS[sKey];
          const isActive = currentScenario === sKey;

          return (
            <TouchableOpacity
              key={sKey}
              onPress={() => setScenario(sKey)}
              activeOpacity={0.8}
              className={`flex-1 py-1.5 px-1 rounded-lg items-center border ${
                isActive
                  ? 'bg-slate-900 border-white'
                  : 'bg-slate-900/50 border-slate-700/60 hover:border-slate-500'
              }`}
            >
              <Text
                className={`text-[10px] font-bold truncate ${
                  isActive ? 'text-white' : 'text-slate-400'
                }`}
              >
                {sKey === 'normal'
                  ? '🟢 Normal'
                  : sKey === 'heavy_rain'
                  ? '🟡 Rain'
                  : sKey === 'thunderstorm'
                  ? '🟠 Squall'
                  : '🔴 Cyclone'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
