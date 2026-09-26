import { View, Text, ScrollView } from 'react-native';
import HomeHeader from '../../src/components/homepage/HomeHeader';
import ScenarioBanner from '../../src/components/homepage/ScenarioBanner';
import WidgetContainer from '../../src/components/homepage/WidgetContainer';
import { useScoredWidgets } from '../../src/hooks/useWidgetScorer';
import { useWeatherStore } from '../../src/store/weatherStore';
import { usePersonaStore } from '../../src/store/personaStore';

export default function HomeScreen() {
  const { widgets, activePersona, activeScenario } = useScoredWidgets();
  const weather = useWeatherStore((state) => state.weather);
  const showInspector = usePersonaStore((state) => state.showInspector);

  return (
    <View className="flex-1 bg-slate-900">
      {/* Sleek Government Header */}
      <HomeHeader />

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Subtle Alert & Scenario Status */}
        <ScenarioBanner />

        {/* Algorithm Inspector Indicator (Only visible when toggled on) */}
        {showInspector && (
          <View className="flex-row items-center justify-between px-5 my-2">
            <Text className="text-[11px] font-semibold text-slate-400">
              Scoring Model Active: <Text className="text-sky-400 capitalize">{activePersona}</Text> ·{' '}
              <Text className="text-amber-400 capitalize">{activeScenario}</Text>
            </Text>
            <View className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              <Text className="text-[10px] font-mono text-slate-300">{widgets.length} Ranked</Text>
            </View>
          </View>
        )}

        {/* Clean Dynamic Widgets Grid */}
        <View className="px-4 mt-1">
          {widgets.map((scoredItem, index) => (
            <WidgetContainer
              key={`${scoredItem.id}-${activePersona}-${activeScenario}`}
              widget={scoredItem}
              rank={index + 1}
              weather={weather}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
