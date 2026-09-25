import { create } from 'zustand';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

interface AccessibilityState {
  ttsEnabled: boolean;
  isSpeaking: boolean;
  largeText: boolean;
  highContrast: boolean;
  lastSpokenText: string;
  toggleTTS: () => void;
  toggleLargeText: () => void;
  toggleHighContrast: () => void;
  speakWeatherBriefing: (text: string) => void;
  stopSpeaking: () => void;
}

export const useAccessibilityStore = create<AccessibilityState>((set, get) => ({
  ttsEnabled: true,
  isSpeaking: false,
  largeText: false,
  highContrast: false,
  lastSpokenText: '',

  toggleTTS: () => set((state) => ({ ttsEnabled: !state.ttsEnabled })),
  toggleLargeText: () => set((state) => ({ largeText: !state.largeText })),
  toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),

  speakWeatherBriefing: (text: string) => {
    // Stop any ongoing speech
    get().stopSpeaking();

    set({ isSpeaking: true, lastSpokenText: text });

    if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => set({ isSpeaking: false });
      utterance.onerror = () => set({ isSpeaking: false });
      window.speechSynthesis.speak(utterance);
    } else {
      Speech.speak(text, {
        language: 'en-IN',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => set({ isSpeaking: false }),
        onError: () => set({ isSpeaking: false }),
      });
    }
  },

  stopSpeaking: () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    } else {
      Speech.stop();
    }
    set({ isSpeaking: false });
  },
}));
