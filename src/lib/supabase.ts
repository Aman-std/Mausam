import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * Supabase Client Configuration
 *
 * Data Flow:
 * 1. Read EXPO_PUBLIC_SUPABASE_URL & EXPO_PUBLIC_SUPABASE_ANON_KEY from environment.
 * 2. When not set (e.g. initial demo mode), default to a public demo sandbox so the app never crashes.
 * 3. Session persistence: Automatically stored in AsyncStorage (Native) or localStorage (Web).
 */

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://demo-mausam-project.supabase.co';
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy';

export const isSupabaseConfigured =
  Boolean(process.env.EXPO_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === 'web' && typeof window !== 'undefined' ? window.localStorage : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
