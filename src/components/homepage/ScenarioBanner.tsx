import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWeatherStore } from '../../store/weatherStore';
import { WEATHER_SCENARIOS } from '../../data/weatherScenarios';
import { Scenario } from '../../types';

export default function ScenarioBanner() {
  const currentScenario = useWeatherStore((state) => state.scenario);
  const weather = useWeatherStore((state) => state.weather);
  const setScenario = useWeatherStore((state) => state.setScenario);

  const [expanded, setExpanded] = useState(false);

  const isSevere = weather.severity >= 0.5;
  const scenarioKeys: Scenario[] = ['normal', 'heavy_rain', 'thunderstorm', 'cyclone'];

  const getAlertBadge = () => {
    switch (weather.imdColor) {
      case 'red':
        return { bg: 'bg-red-500/15', border: 'border-red-500/40', text: 'text-red-400', dot: 'bg-red-500', name: 'RED ALERT' };
      case 'orange':
        return { bg: 'bg-amber-500/15', border: 'border-amber-500/40', text: 'text-amber-400', dot: 'bg-amber-500', name: 'ORANGE ALERT' };
      case 'yellow':
        return { bg: 'bg-yellow-500/15', border: 'border-yellow-500/40', text: 'text-yellow-400', dot: 'bg-yellow-500', name: 'YELLOW ALERT' };
      default:
        return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-400', name: 'FAIR WEATHER' };
    }
  };

  const badge = getAlertBadge();

  return (
    <View className="mx-4 mt-3 mb-2">
      {/* Sleek Alert / Status Pill */}
      <View
        className={`px-3.5 py-2.5 rounded-xl border flex-row items-center justify-between ${badge.bg} ${badge.border}`}
      >
        <View className="flex-row items-center space-x-2 flex-1 pr-2">
          <View className={`w-2 h-2 rounded-full ${badge.dot}`} />
          <View className="flex-1">
            <View className="flex-row items-center space-x-1.5">
              <Text className={`text-[10px] font-bold uppercase tracking-wider ${badge.text}`}>
                {badge.name}
              </Text>
              <Text className="text-[10px] text-slate-400">·</Text>
              <Text className="text-[10px] text-slate-300 font-medium">
                {WEATHER_SCENARIOS[currentScenario].label.split('/')[0]}
              </Text>
            </View>
            {isSevere && weather.alertTitle && (
              <Text className="text-xs text-white font-semibold mt-0.5" numberOfLines={1}>
                {weather.alertTitle}
              </Text>
            )}
          </View>
        </View>

        {/* Quick Simulator Toggle */}
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          activeOpacity={0.7}
          className="bg-black/30 px-2 py-1 rounded-md border border-white/10 flex-row items-center space-x-1"
        >
          <Text className="text-[10px] text-slate-300 font-medium">Simulate</Text>
          <MaterialCommunityIcons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={12}
            color="#94a3b8"
          />
        </TouchableOpacity>
      </View>

      {/* Collapsible Scenario Switcher */}
      {expanded && (
        <View className="mt-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <Text className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 px-1 tracking-wider">
            Switch Weather Scenario for Live Demo:
          </Text>
          <View className="flex-row space-x-1.5">
            {scenarioKeys.map((sKey) => {
              const isActive = currentScenario === sKey;
              return (
                <TouchableOpacity
                  key={sKey}
                  onPress={() => {
                    setScenario(sKey);
                    setExpanded(false);
                  }}
                  activeOpacity={0.8}
                  className={`flex-1 py-1.5 rounded-lg items-center border ${
                    isActive
                      ? 'bg-sky-600 border-sky-400'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <Text
                    className={`text-[10px] font-bold ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {sKey === 'normal'
                      ? 'Normal'
                      : sKey === 'heavy_rain'
                      ? 'Rain'
                      : sKey === 'thunderstorm'
                      ? 'Squall'
                      : 'Cyclone'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}
