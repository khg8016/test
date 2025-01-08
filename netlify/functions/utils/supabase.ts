import { createClient } from '@supabase/supabase-js';
import { requiredEnvVars } from './env';

export const supabase = createClient(
  requiredEnvVars.VITE_SUPABASE_URL,
  requiredEnvVars.VITE_SUPABASE_ANON_KEY
);

export async function addCreditsToUser(userId: string, credits: number): Promise<void> {
  const { error } = await supabase.rpc('add_credits', {
    p_user_id: userId,
    p_amount: credits,
    p_description: '크레딧 구매'
  });

  if (error) {
    console.error('Failed to add credits:', error);
    throw error;
  }
}