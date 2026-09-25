import {
  Persona,
  Scenario,
  Interest,
  MockWeatherData,
  WidgetDefinition,
  ScoredWidget,
} from '../types';
import { WIDGET_REGISTRY } from '../data/widgetRegistry';

export interface ScoringContext {
  persona: Persona;
  scenario: Scenario;
  interests: Interest[];
  weather: MockWeatherData;
  hasAtmoAnomaly?: boolean;
}

/**
 * Pure 40/20/20/20 Relevance Scoring Engine for Mausam Dynamic Homepage
 *
 * Weight Distribution:
 * - Persona relevance: 40% (0.40)
 * - Interest relevance: 20% (0.20)
 * - Scenario relevance: 20% (0.20)
 * - Urgency factor:    20% (0.20)
 *
 * Hard Overrides:
 * - Critical Meteorological Alert (severity >= 0.8): forced score 1.00 (Rank #1)
 * - Crowd-Sourced Atmospheric Pressure Anomaly: forced score 0.99 (Rank #2)
 */
export function scoreWidget(
  widget: WidgetDefinition,
  context: ScoringContext
): ScoredWidget | null {
  const { persona, scenario, interests, weather, hasAtmoAnomaly } = context;

  // 1. Check Atmospheric Anomaly widget special trigger
  if (widget.id === 'atmo_anomaly') {
    if (hasAtmoAnomaly) {
      return {
        definition: widget,
        id: widget.id,
        score: 0.99,
        isOverride: true,
        breakdown: {
          personaScore: 0.40,
          interestScore: 0.20,
          scenarioScore: 0.20,
          urgencyScore: 0.19,
        },
      };
    }
    return null; // do not show when no anomaly is detected
  }

  // 2. Severe Weather Hard Override:
  // When severity >= 0.8 (Orange / Red alert), Critical Alert always snaps to top rank
  if (widget.id === 'severe_weather') {
    if (weather.severity >= 0.8) {
      return {
        definition: widget,
        id: widget.id,
        score: 1.0,
        isOverride: true,
        breakdown: {
          personaScore: 0.40,
          interestScore: 0.20,
          scenarioScore: 0.20,
          urgencyScore: 0.20,
        },
      };
    } else if (weather.severity < 0.5) {
      // In fair/green weather, hide severe alert card to keep UI clean
      return null;
    }
  }

  // 3. Persona-Exclusive Exclusion Rule
  // If base persona weight is 0, this specialized widget belongs to another persona (e.g. Farmer Advisory for Commuter)
  const basePersonaWeight = widget.personaWeights[persona] ?? 0;
  if (basePersonaWeight === 0) {
    return null;
  }

  // 4. Calculate 4 components (each normalized between 0.0 and 1.0):

  // (A) Persona Score (40%)
  const personaScore = basePersonaWeight;

  // (B) Interest Score (20%)
  let interestScore = 0.7; // baseline for neutral general widgets
  if (widget.requiredInterests && widget.requiredInterests.length > 0) {
    const hasMatchingInterest = interests.some((userInt) =>
      widget.requiredInterests!.includes(userInt)
    );
    interestScore = hasMatchingInterest ? 1.0 : 0.3;
  }

  // (C) Scenario Score (20%)
  const rawMultiplier = widget.scenarioTriggers[scenario] ?? 1.0;
  const scenarioScore = Math.min(rawMultiplier / 3.0, 1.0);

  // (D) Urgency Score (20%)
  const urgencyScore = Math.min(widget.urgencyWeight * weather.severity, 1.0);

  // 5. Compute Weighted Sum:
  const weightedTotal =
    personaScore * 0.4 +
    interestScore * 0.2 +
    scenarioScore * 0.2 +
    urgencyScore * 0.2;

  // Clamp non-override score to 0.98 to maintain room for hard overrides
  const clampedScore = Math.min(Math.max(weightedTotal, 0.05), 0.98);

  return {
    definition: widget,
    id: widget.id,
    score: Number(clampedScore.toFixed(3)),
    isOverride: false,
    breakdown: {
      personaScore: Number((personaScore * 0.4).toFixed(3)),
      interestScore: Number((interestScore * 0.2).toFixed(3)),
      scenarioScore: Number((scenarioScore * 0.2).toFixed(3)),
      urgencyScore: Number((urgencyScore * 0.2).toFixed(3)),
    },
  };
}

/**
 * Score all registered widgets and sort descending by relevance score
 */
export function rankHomepageWidgets(
  context: ScoringContext,
  registry: WidgetDefinition[] = WIDGET_REGISTRY
): ScoredWidget[] {
  const scoredList: ScoredWidget[] = [];

  for (const widget of registry) {
    const scored = scoreWidget(widget, context);
    if (scored !== null && scored.score >= widget.minSeverity) {
      scoredList.push(scored);
    }
  }

  // Sort descending by score. If tied, overrides come first.
  return scoredList.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (b.isOverride && !a.isOverride) return 1;
    if (a.isOverride && !b.isOverride) return -1;
    return 0;
  });
}
