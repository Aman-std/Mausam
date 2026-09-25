export type Persona = 'general' | 'farmer' | 'commuter' | 'fisherman';

export type Scenario = 'normal' | 'heavy_rain' | 'thunderstorm' | 'cyclone';

export type Interest = 'aqi' | 'uv' | 'rain' | 'wind' | 'marine' | 'farming' | 'commute' | 'health' | 'visibility';

export type IMDColor = 'green' | 'yellow' | 'orange' | 'red';

export type WidgetId =
  | 'severe_weather'
  | 'temperature'
  | 'rain'
  | 'forecast'
  | 'wind'
  | 'aqi'
  | 'uv'
  | 'visibility'
  | 'farmer_advisory'
  | 'marine_conditions'
  | 'commute'
  | 'recommendation'
  | 'atmo_anomaly';

export type WidgetSize = 'small' | 'medium' | 'large' | 'full';

export interface DayForecast {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  rainProb: number;
  icon: string;
}

export interface MockWeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  rain: number;
  wind: number;
  windDir: string;
  aqi: number;
  aqiStatus: string;
  uv: number;
  uvStatus: string;
  visibility: number;
  pressure: number;
  imdColor: IMDColor;
  condition: string;
  alertTitle?: string;
  alertMessage?: string;
  severity: number; // 0.0 to 1.0
  forecast: DayForecast[];
}

export interface WeatherScenario {
  id: Scenario;
  label: string;
  subtitle: string;
  severity: number;
  imdColor: IMDColor;
  weather: MockWeatherData;
}

export interface WidgetDefinition {
  id: WidgetId;
  label: string;
  category: 'core' | 'specialized' | 'alert' | 'insights';
  size: WidgetSize;
  personaWeights: Record<Persona, number>;
  scenarioTriggers: Partial<Record<Scenario, number>>;
  requiredInterests?: Interest[];
  urgencyWeight: number; // 0.0 to 1.0
  minSeverity: number;
  description: string;
}

export interface ScoredWidget {
  definition: WidgetDefinition;
  id: WidgetId;
  score: number;
  isOverride: boolean;
  breakdown: {
    personaScore: number;
    interestScore: number;
    scenarioScore: number;
    urgencyScore: number;
  };
}

export interface PersonaProfile {
  id: Persona;
  label: string;
  tagline: string;
  icon: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  keyNeeds: string[];
  defaultInterests: Interest[];
}

export interface InterestOption {
  id: Interest;
  label: string;
  icon: string;
  description: string;
}

export interface UserProfile {
  id?: string;
  persona: Persona;
  interests: Interest[];
  location: string;
  isGuest: boolean;
  accessibilityMode: boolean;
  largeText: boolean;
  highContrast: boolean;
  onboardingComplete: boolean;
}

export interface CommuteStop {
  id: string;
  time: string;
  label: string;
  locationName: string;
  temp: number;
  rainProb: number;
  condition: string;
  warning?: string;
  isDestination?: boolean;
}

export interface CommuteRoute {
  id: string;
  title: string;
  from: string;
  to: string;
  stops: CommuteStop[];
  recommendation: string;
  estimatedDelayMinutes: number;
}

export interface BarometerDevice {
  id: string;
  name: string;
  sector: string;
  initialPressure: number;
  currentPressure: number;
  trend: 'stable' | 'falling' | 'critical';
}

export interface MeshDevice {
  id: string;
  name: string;
  sector: string;
  status: 'idle' | 'receiving' | 'relaying' | 'received';
  receivedAt?: string;
  signalStrength: number; // in dBm e.g. -65
}

export interface MeshAlertPacket {
  alertId: string;
  sourceDevice: string;
  ttl: number;
  timestamp: number;
  severity: IMDColor;
  headline: string;
  instructions: string;
  dedupeSeen: string[];
}
