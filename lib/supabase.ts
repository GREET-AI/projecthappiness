import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create client even if env vars are missing (will fail gracefully on use)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })
  : createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        persistSession: false,
      },
    });

// Types
export interface Candidate {
  id: string;
  created_at: string;
  name: string;
  country: string;
  x_handle: string;
  story: string;
  why_happiness: string;
  video_url: string;
  status: 'pending' | 'verified' | 'rejected';
}

export interface Vote {
  id: string;
  created_at: string;
  candidate_id: string;
  wallet_address: string;
  vote_power: number;
  ip_address: string;
}

export interface DailyWinner {
  id: string;
  candidate_id: string;
  date: string;
  amount_sol: number;
  amount_happiness: number;
  tx_hash: string;
}

export interface WheelSpin {
  id: string;
  wallet_address: string;
  spin_date: string;
  prize_type: 'sol' | 'merchandise' | 'vip-access' | 'extra-spin' | 'nothing';
  prize_value: number;
  is_paid: boolean;
  created_at: string;
}

export interface WheelPrize {
  id: string;
  prize_type: 'sol' | 'merchandise' | 'vip-access' | 'extra-spin' | 'nothing';
  prize_label: string;
  prize_value: number;
  probability: number;
  color: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: string;
  referrer_wallet: string;
  referee_wallet: string;
  referral_code: string;
  reward_claimed: boolean;
  created_at: string;
}

export interface ReferralReward {
  id: string;
  referral_id: string;
  wallet_address: string;
  reward_type: 'extra-spin' | 'happiness-tokens' | 'sol';
  reward_value: number;
  claimed: boolean;
  created_at: string;
}

