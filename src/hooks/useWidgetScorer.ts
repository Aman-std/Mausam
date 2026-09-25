import { useMemo } from 'react';
import { usePersonaStore } from '../store/personaStore';
import { useWeatherStore } from '../store/weatherStore';
import { useBarometerStore } from '../store/barometerStore';
import { rankHomepageWidgets } from '../engine/widgetScorer';
import { ScoredWidget } from '../types';

export function useScoredWidgets(): {
  widgets: ScoredWidget[];
  activePersona: string;
  activeScenario: string;
  severity: number;
  hasAnomaly: boolean;
} {
  const persona = usePersonaStore((state) => state.persona);
  const interests = usePersonaStore((state) => state.interests);
  const scenario = useWeatherStore((state) => state.scenario);
  const weather = useWeatherStore((state) => state.weather);
  const hasAnomaly = useBarometerStore((state) => state.anomalyDetected);

  const widgets = useMemo(() => {
    return rankHomepageWidgets({
      persona,
      scenario,
      interests,
      weather,
      hasAtmoAnomaly: hasAnomaly,
    });
  }, [persona, scenario, interests, weather, hasAnomaly]);

  return {
    widgets,
    activePersona: persona,
    activeScenario: scenario,
    severity: weather.severity,
    hasAnomaly,
  };
}
