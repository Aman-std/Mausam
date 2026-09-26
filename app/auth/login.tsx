import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase, isSupabaseConfigured } from '../../src/lib/supabase';
import { usePersonaStore } from '../../src/store/personaStore';
import { fetchUserProfile, saveUserProfile } from '../../src/services/profileService';

export default function AuthScreen() {
  const router = useRouter();
  const persona = usePersonaStore((state) => state.persona);
  const interests = usePersonaStore((state) => state.interests);
  const location = usePersonaStore((state) => state.location);
  const setPersona = usePersonaStore((state) => state.setPersona);
  const setInterests = usePersonaStore((state) => state.setInterests);

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const handleAuth = async () => {
    if (!email || !password) {
      setFeedback({ message: 'Please provide both email and password.', isError: true });
      return;
    }

    setLoading(true);
    setFeedback(null);

    // If live Supabase credentials are not yet configured in .env, run prototype simulation
    if (!isSupabaseConfigured) {
      setTimeout(() => {
        setLoading(false);
        setFeedback({
          message: `[Prototype Mode] ${isSignUp ? 'Account registered' : 'Signed in'} as ${email}. Persona synced.`,
          isError: false,
        });
        setTimeout(() => router.replace('/(tabs)/home'), 900);
      }, 700);
      return;
    }

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        if (data.user) {
          // Save default persona profile to Supabase 'profiles' table
          await saveUserProfile({
            id: data.user.id,
            persona,
            interests,
            location,
          });
        }
        setFeedback({ message: 'Registration successful! Verification email sent.', isError: false });
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        if (data.user) {
          // Hydrate local Zustand store with profile from Supabase
          const profile = await fetchUserProfile(data.user.id);
          if (profile) {
            setPersona(profile.persona);
            setInterests(profile.interests);
          }
        }
        setFeedback({ message: 'Welcome back! Signed in successfully.', isError: false });
        setTimeout(() => router.replace('/(tabs)/home'), 600);
      }
    } catch (err: any) {
      setFeedback({ message: err.message || 'Authentication failed.', isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-900" contentContainerStyle={{ flexGrow: 1 }}>
      {/* Top Header */}
      <View className="px-5 pt-8 pb-4 border-b border-slate-800 bg-slate-950 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-8 h-8 rounded-full bg-slate-800 items-center justify-center"
        >
          <MaterialCommunityIcons name="arrow-left" size={18} color="#94a3b8" />
        </TouchableOpacity>
        <Text className="text-sm font-bold text-white uppercase tracking-wider">
          Mausam Account
        </Text>
        <View className="w-8" />
      </View>

      <View className="p-6 justify-between flex-1">
        <View>
          {/* Status Chip */}
          <View className="flex-row items-center space-x-1.5 self-start bg-slate-800 px-3 py-1 rounded-full border border-slate-700 mb-4">
            <View
              className={`w-2 h-2 rounded-full ${
                isSupabaseConfigured ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <Text className="text-[10px] text-slate-300 font-medium">
              {isSupabaseConfigured ? 'Supabase Cloud Connected' : 'Prototype Simulation Mode'}
            </Text>
          </View>

          <Text className="text-2xl font-extrabold text-white mb-1">
            {isSignUp ? 'Create your profile' : 'Sign in to sync persona'}
          </Text>
          <Text className="text-xs text-slate-400 mb-6">
            Stores your chosen persona ({persona}), priority interests, and commute corridors across devices.
          </Text>

          {/* Feedback Banner */}
          {feedback && (
            <View
              className={`p-3 rounded-xl mb-4 border ${
                feedback.isError
                  ? 'bg-red-950/60 border-red-500/50'
                  : 'bg-emerald-950/60 border-emerald-500/50'
              }`}
            >
              <Text
                className={`text-xs ${feedback.isError ? 'text-red-200' : 'text-emerald-200'} font-medium`}
              >
                {feedback.message}
              </Text>
            </View>
          )}

          {/* Form */}
          <View className="space-y-3 mb-6">
            <View>
              <Text className="text-xs font-semibold text-slate-300 mb-1">Email Address</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="citizen@example.gov.in"
                placeholderTextColor="#64748b"
                autoCapitalize="none"
                keyboardType="email-address"
                className="bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm"
              />
            </View>

            <View>
              <Text className="text-xs font-semibold text-slate-300 mb-1">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••••••"
                placeholderTextColor="#64748b"
                secureTextEntry
                className="bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm"
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleAuth}
            disabled={loading}
            activeOpacity={0.85}
            className="w-full bg-blue-600 hover:bg-blue-500 py-3.5 rounded-xl items-center justify-center flex-row space-x-2"
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text className="text-white font-bold text-sm">
                {isSignUp ? 'Register & Save Profile' : 'Sign In'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Switch Mode */}
          <TouchableOpacity
            onPress={() => {
              setIsSignUp(!isSignUp);
              setFeedback(null);
            }}
            className="mt-3.5 items-center"
          >
            <Text className="text-xs text-sky-400">
              {isSignUp ? 'Already have an account? Sign In' : 'New citizen? Create an account'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Guest Skip & Backend Data Flow Explainer */}
        <View className="pt-6">
          <View className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 mb-4">
            <Text className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">
              Backend Architecture Note:
            </Text>
            <Text className="text-[11px] text-slate-400 leading-relaxed font-mono">
              Auth: supabase.auth.signUp() ➔ Session: AsyncStorage ➔ Data: profiles table (id, persona, interests).
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/home')}
            className="py-3 rounded-xl items-center border border-slate-800"
          >
            <Text className="text-xs font-bold text-slate-400">Continue in Guest Mode ➔</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
