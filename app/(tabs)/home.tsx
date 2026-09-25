import { View, Text, ScrollView } from 'react-native';
import HomeHeader from '../../src/components/homepage/HomeHeader';
import ScenarioBanner from '../../src/components/homepage/ScenarioBanner';
import WidgetContainer from '../../src/components/homepage/WidgetContainer';
import { useScoredWidgets } from '../../src/hooks/useWidgetScorer';
import { useWeatherStore } from '../../src/store/weatherStore';

export default function HomeScreen() {
  const { widgets, activePersona, activeScenario } = useScoredWidgets();
  const weather = useWeatherStore((state) => state.weather);

  return (
    <View className="flex-1 bg-slate-900">
      {/* Top Header */}
      <HomeHeader />

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Scenario Banner with Quick Switcher */}
        <ScenarioBanner />

        {/* Algorithm Header Banner */}
        <View className="flex-row items-center justify-between px-5 mb-2.5">
          <View>
            <Text className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Personalized Intelligence Feed
            </Text>
            <Text className="text-[10px] text-slate-400">
              Ranked dynamically for <Text className="text-sky-400 font-bold capitalize">{activePersona}</Text> in{' '}
              <Text className="text-amber-400 font-bold capitalize">{activeScenario}</Text>
            </Text>
          </View>
          <View className="bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
            <Text className="text-[10px] font-mono text-slate-300">
              <Text className="text-sky-400 font-bold">{widgets.length}</Text> Widgets Scored
            </Text>
          </View>
        </View>

        {/* Dynamic Ranked Widgets Grid */}
        <View className="px-4">
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
