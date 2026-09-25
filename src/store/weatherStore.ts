import { create } from 'zustand';
import { Scenario, MockWeatherData } from '../types';
import { WEATHER_SCENARIOS } from '../data/weatherScenarios';

interface WeatherState {
  scenario: Scenario;
  weather: MockWeatherData;
  setScenario: (scenario: Scenario) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  scenario: 'normal',
  weather: WEATHER_SCENARIOS.normal.weather,
  setScenario: (scenario: Scenario) => {
    const scenarioData = WEATHER_SCENARIOS[scenario];
    if (scenarioData) {
      set({
        scenario,
        weather: scenarioData.weather,
      });
    }
  },
}));
