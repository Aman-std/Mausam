import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePersonaStore } from '../../src/store/personaStore';
import { useWeatherStore } from '../../src/store/weatherStore';
import { useBarometerStore } from '../../src/store/barometerStore';
import { useMeshStore } from '../../src/store/meshStore';
import { useAccessibilityStore } from '../../src/store/accessibilityStore';
import { PERSONA_PROFILES } from '../../src/data/personaProfiles';
import { WEATHER_SCENARIOS } from '../../src/data/weatherScenarios';
import { Persona, Scenario } from '../../src/types';

export default function DemoPanelScreen() {
  const currentPersona = usePersonaStore((state) => state.persona);
  const setPersona = usePersonaStore((state) => state.setPersona);

  const currentScenario = useWeatherStore((state) => state.scenario);
  const setScenario = useWeatherStore((state) => state.setScenario);

  // Barometer
  const isAnomaly = useBarometerStore((state) => state.anomalyDetected);
  const isSimulating = useBarometerStore((state) => state.isSimulating);
  const triggerPressureDrop = useBarometerStore((state) => state.triggerPressureDrop);
  const resetBarometer = useBarometerStore((state) => state.resetBarometer);

  // Mesh
  const meshAlert = useMeshStore((state) => state.activeAlert);
  const isMeshPropagating = useMeshStore((state) => state.isPropagating);
  const meshHop = useMeshStore((state) => state.currentHop);
  const meshLog = useMeshStore((state) => state.lastLogMessage);
  const dupeCount = useMeshStore((state) => state.duplicatePreventedCount);
  const triggerMesh = useMeshStore((state) => state.triggerAlertPropagation);
  const resetMesh = useMeshStore((state) => state.resetMesh);

  // Accessibility
  const isSpeaking = useAccessibilityStore((state) => state.isSpeaking);
  const speakWeatherBriefing = useAccessibilityStore((state) => state.speakWeatherBriefing);
  const stopSpeaking = useAccessibilityStore((state) => state.stopSpeaking);

  const personas: Persona[] = ['commuter', 'farmer', 'fisherman', 'general'];
  const scenarios: Scenario[] = ['normal', 'heavy_rain', 'thunderstorm', 'cyclone'];

  return (
    <View className="flex-1 bg-slate-900">
      {/* Header */}
      <View className="px-5 pt-8 pb-4 border-b border-slate-800 bg-slate-950">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <MaterialCommunityIcons name="tune-vertical" size={20} color="#38bdf8" />
            <Text className="text-base font-extrabold text-white">Judge Evaluation Panel</Text>
          </View>
          <View className="bg-sky-500/20 border border-sky-500/40 px-2.5 py-0.5 rounded-full">
            <Text className="text-[10px] font-mono text-sky-300 font-bold">SIH PS-26076</Text>
          </View>
        </View>
        <Text className="text-xs text-slate-400 mt-1">
          Live control board to test persona adaptation, overrides, and simulations in real time.
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 py-4" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Section 1: Persona Switcher */}
        <View className="mb-5">
          <Text className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            1. Switch Citizen Persona (40% Weight)
          </Text>
          <View className="grid grid-cols-2 gap-2">
            {personas.map((p) => {
              const prof = PERSONA_PROFILES[p];
              const isActive = currentPersona === p;
              return (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPersona(p)}
                  activeOpacity={0.8}
                  className={`p-3 rounded-xl border flex-row items-center space-x-2 ${
                    isActive
                      ? 'bg-sky-950/80 border-sky-400'
                      : 'bg-slate-800/40 border-slate-700/60'
                  }`}
                >
                  <MaterialCommunityIcons
                    name={prof.icon as any}
                    size={18}
                    color={isActive ? '#38bdf8' : '#94a3b8'}
                  />
                  <View className="flex-1">
                    <Text className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {prof.label.split('/')[0]}
                    </Text>
                    <Text className="text-[10px] text-slate-400 truncate">{prof.tagline}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section 2: Weather Scenario Switcher */}
        <View className="mb-5">
          <Text className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            2. Trigger Weather Scenario (Severity & Multiplier)
          </Text>
          <View className="space-y-2">
            {scenarios.map((s) => {
              const scData = WEATHER_SCENARIOS[s];
              const isActive = currentScenario === s;
              return (
                <TouchableOpacity
                  key={s}
                  onPress={() => setScenario(s)}
                  activeOpacity={0.8}
                  className={`p-2.5 rounded-xl border flex-row items-center justify-between ${
                    isActive
                      ? 'bg-slate-800 border-white'
                      : 'bg-slate-800/30 border-slate-700/50'
                  }`}
                >
                  <View className="flex-row items-center space-x-2">
                    <View
                      className={`w-3 h-3 rounded-full ${
                        scData.imdColor === 'red'
                          ? 'bg-red-500'
                          : scData.imdColor === 'orange'
                          ? 'bg-amber-500'
                          : scData.imdColor === 'yellow'
                          ? 'bg-yellow-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <Text className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {scData.label}
                    </Text>
                  </View>
                  <Text className="text-[10px] font-mono text-slate-400">
                    Severity: {(scData.severity * 100).toFixed(0)}%
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section 3: Barometer Crowd-Sourcing Simulation */}
        <View className="mb-5 bg-slate-950 p-4 rounded-2xl border border-violet-500/40">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center space-x-1.5">
              <MaterialCommunityIcons name="broadcast" size={16} color="#a78bfa" />
              <Text className="text-xs font-bold text-violet-300 uppercase tracking-wide">
                Barometer Sensor Grid Lab
              </Text>
            </View>
            <View className="bg-violet-950 px-2 py-0.5 rounded border border-violet-500/30">
              <Text className="text-[10px] text-violet-300 font-mono">
                {isAnomaly ? 'ANOMALY DETECTED' : '5 SENSORS STABLE'}
              </Text>
            </View>
          </View>

          <Text className="text-xs text-slate-300 mb-3 leading-relaxed">
            Simulate a cluster of 5 smartphones in Sector 14 registering a sharp barometric pressure drop (-6.5 hPa). Detects pre-radar squalls and pushes the Atmospheric Anomaly widget to Homepage Rank #2.
          </Text>

          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={triggerPressureDrop}
              disabled={isSimulating || isAnomaly}
              activeOpacity={0.8}
              className={`flex-1 py-2.5 rounded-xl items-center flex-row justify-center space-x-1.5 ${
                isAnomaly
                  ? 'bg-emerald-600/30 border border-emerald-500/40'
                  : 'bg-violet-600 hover:bg-violet-500'
              }`}
            >
              <MaterialCommunityIcons name="arrow-down-bold" size={16} color="#ffffff" />
              <Text className="text-xs font-bold text-white">
                {isSimulating ? 'Simulating Drop...' : isAnomaly ? 'Anomaly Active on Home' : 'Simulate ΔP Drop'}
              </Text>
            </TouchableOpacity>

            {isAnomaly && (
              <TouchableOpacity
                onPress={resetBarometer}
                activeOpacity={0.8}
                className="px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 items-center justify-center"
              >
                <Text className="text-xs text-slate-300 font-semibold">Reset</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Section 4: P2P Disaster Mesh Simulation */}
        <View className="mb-5 bg-slate-950 p-4 rounded-2xl border border-cyan-500/40">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center space-x-1.5">
              <MaterialCommunityIcons name="cellphone-wireless" size={16} color="#22d3ee" />
              <Text className="text-xs font-bold text-cyan-300 uppercase tracking-wide">
                P2P Mesh Broadcast Lab (Zero Internet)
              </Text>
            </View>
            <View className="bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              <Text className="text-[10px] text-cyan-300 font-mono">
                {meshAlert ? `HOP ${meshHop}/4` : 'BLE STANDBY'}
              </Text>
            </View>
          </View>

          <Text className="text-xs text-slate-300 mb-2 leading-relaxed">
            Simulate offline disaster warning dispersion: Node A (Satellite) ➔ Node B (Relay) ➔ Node C (Relay) ➔ Node D (Edge Citizen) via BLE mesh with TTL decrement & deduplication.
          </Text>

          <View className="bg-black/60 p-2.5 rounded-xl border border-slate-800 mb-3">
            <Text className="text-[11px] font-mono text-cyan-200">{meshLog}</Text>
            {dupeCount > 0 && (
              <Text className="text-[10px] font-mono text-amber-400 mt-1">
                ✦ Duplicate alerts prevented by hash cache: {dupeCount}
              </Text>
            )}
          </View>

          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={triggerMesh}
              disabled={isMeshPropagating}
              activeOpacity={0.8}
              className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 items-center flex-row justify-center space-x-1.5"
            >
              <MaterialCommunityIcons name="broadcast" size={16} color="#ffffff" />
              <Text className="text-xs font-bold text-white">
                {isMeshPropagating ? `Propagating Hop ${meshHop}...` : 'Broadcast Mesh Alert'}
              </Text>
            </TouchableOpacity>

            {meshAlert && !isMeshPropagating && (
              <TouchableOpacity
                onPress={resetMesh}
                activeOpacity={0.8}
                className="px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 items-center justify-center"
              >
                <Text className="text-xs text-slate-300 font-semibold">Reset</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Section 5: Accessibility TTS Audio Trigger */}
        <View className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <View className="flex-row items-center space-x-1.5 mb-2">
            <MaterialCommunityIcons name="human" size={16} color="#38bdf8" />
            <Text className="text-xs font-bold text-sky-300 uppercase tracking-wide">
              Accessibility Soundscapes Mode
            </Text>
          </View>
          <Text className="text-xs text-slate-300 mb-3">
            Synthesizes an immediate audio weather briefing designed for visually impaired and low-literacy demographics using text-to-speech.
          </Text>

          <TouchableOpacity
            onPress={() => {
              if (isSpeaking) {
                stopSpeaking();
              } else {
                speakWeatherBriefing(
                  `Mausam Accessibility Briefing. You are currently viewing as ${PERSONA_PROFILES[currentPersona].label}. Weather scenario is ${WEATHER_SCENARIOS[currentScenario].label}. Critical alerts and route corridors are prioritized on your homepage.`
                );
              }
            }}
            activeOpacity={0.8}
            className={`py-2.5 rounded-xl items-center flex-row justify-center space-x-1.5 ${
              isSpeaking ? 'bg-red-600' : 'bg-sky-600 hover:bg-sky-500'
            }`}
          >
            <MaterialCommunityIcons
              name={isSpeaking ? 'stop' : 'volume-high'}
              size={16}
              color="#ffffff"
            />
            <Text className="text-xs font-bold text-white">
              {isSpeaking ? 'Stop Audio Briefing' : 'Speak Voice Weather Briefing'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
