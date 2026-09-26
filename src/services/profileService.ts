import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Persona, Interest } from '../types';

/**
 * =========================================================================
 * SUPABASE PROFILES TABLE SCHEMA (Run this in Supabase SQL Editor):
 * =========================================================================
 *
 * CREATE TABLE public.profiles (
 *   id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
 *   persona TEXT NOT NULL DEFAULT 'commuter',
 *   interests TEXT[] NOT NULL DEFAULT '{"commute","rain"}',
 *   location TEXT NOT NULL DEFAULT 'New Delhi (NCR)',
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
 * );
 *
 * -- Enable Row Level Security:
 * ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
 *
 * -- Policies: Users can read and update only their own profile
 * CREATE POLICY "Users can read own profile" ON public.profiles
 *   FOR SELECT USING (auth.uid() = id);
 *
 * CREATE POLICY "Users can insert/update own profile" ON public.profiles
 *   FOR ALL USING (auth.uid() = id);
 * =========================================================================
 */

export interface DbProfile {
  id: string;
  persona: Persona;
  interests: Interest[];
  location: string;
  updated_at?: string;
}

/**
 * 1. Fetch user's profile from Supabase
 * Query: SELECT * FROM profiles WHERE id = userId LIMIT 1
 */
export async function fetchUserProfile(userId: string): Promise<DbProfile | null> {
  if (!isSupabaseConfigured) {
    console.log('[Supabase Demo] Fallback: Returning local session since env keys are not set.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.warn('[Supabase fetchUserProfile error]:', error.message);
      return null;
    }

    return data as DbProfile;
  } catch (err) {
    console.error('[Supabase fetchUserProfile exception]:', err);
    return null;
  }
}

/**
 * 2. Save or update (UPSERT) user's persona & interests
 * Query: INSERT INTO profiles (id, persona, interests, location, updated_at)
 *        VALUES (...)
 *        ON CONFLICT (id) DO UPDATE SET ...
 */
export async function saveUserProfile(profile: DbProfile): Promise<boolean> {
  if (!isSupabaseConfigured) {
    console.log('[Supabase Demo] Profile saved to local Zustand store (Supabase simulated).');
    return true;
  }

  try {
    const { error } = await supabase.from('profiles').upsert({
      id: profile.id,
      persona: profile.persona,
      interests: profile.interests,
      location: profile.location,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.warn('[Supabase saveUserProfile error]:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[Supabase saveUserProfile exception]:', err);
    return false;
  }
}
