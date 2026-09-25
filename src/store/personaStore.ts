import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Persona, Interest, UserProfile } from '../types';
import { PERSONA_PROFILES } from '../data/personaProfiles';

interface PersonaState extends UserProfile {
  setPersona: (persona: Persona) => void;
  setInterests: (interests: Interest[]) => void;
  toggleInterest: (interest: Interest) => void;
  setLocation: (location: string) => void;
  setOnboardingComplete: (val: boolean) => void;
  resetProfile: () => void;
}

const DEFAULT_PERSONA: Persona = 'general';

export const usePersonaStore = create<PersonaState>()(
  persist(
    (set, get) => ({
      persona: DEFAULT_PERSONA,
      interests: PERSONA_PROFILES[DEFAULT_PERSONA].defaultInterests,
      location: 'New Delhi (NCR)',
      isGuest: true,
      accessibilityMode: false,
      largeText: false,
      highContrast: false,
      onboardingComplete: false,

      setPersona: (newPersona: Persona) => {
        const profile = PERSONA_PROFILES[newPersona];
        set({
          persona: newPersona,
          // If interests haven't been customized, adopt persona's default interests
          interests: profile ? profile.defaultInterests : get().interests,
        });
      },

      setInterests: (interests: Interest[]) => set({ interests }),

      toggleInterest: (interest: Interest) => {
        const current = get().interests;
        if (current.includes(interest)) {
          set({ interests: current.filter((i) => i !== interest) });
        } else {
          set({ interests: [...current, interest] });
        }
      },

      setLocation: (location: string) => set({ location }),

      setOnboardingComplete: (onboardingComplete: boolean) =>
        set({ onboardingComplete }),

      resetProfile: () =>
        set({
          persona: DEFAULT_PERSONA,
          interests: PERSONA_PROFILES[DEFAULT_PERSONA].defaultInterests,
          location: 'New Delhi (NCR)',
          isGuest: true,
          accessibilityMode: false,
          largeText: false,
          highContrast: false,
          onboardingComplete: false,
        }),
    }),
    {
      name: 'mausam-persona-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
