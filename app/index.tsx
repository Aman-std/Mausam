import { Redirect } from 'expo-router';
import { usePersonaStore } from '../src/store/personaStore';

export default function Index() {
  const onboardingComplete = usePersonaStore((state) => state.onboardingComplete);

  if (!onboardingComplete) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
