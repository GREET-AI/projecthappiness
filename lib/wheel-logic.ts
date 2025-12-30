// Wheel of Happiness Logic

export type PrizeType = 'sol' | 'merchandise' | 'vip-access' | 'extra-spin' | 'nothing';

export interface Prize {
  type: PrizeType;
  label: string;
  value: number; // SOL amount or equivalent
  probability: number; // 0-1, cumulative
  color: string; // For wheel display
}

export const WHEEL_PRIZES: Prize[] = [
  {
    type: 'nothing',
    label: 'Try Again',
    value: 0,
    probability: 0.3, // 30%
    color: '#f3f4f6', // Gray
  },
  {
    type: 'sol',
    label: '0.01 SOL',
    value: 0.01,
    probability: 0.5, // 20% (0.3 to 0.5)
    color: '#ffc850', // Orange
  },
  {
    type: 'sol',
    label: '0.05 SOL',
    value: 0.05,
    probability: 0.65, // 15%
    color: '#ffa500', // Darker orange
  },
  {
    type: 'merchandise',
    label: 'T-Shirt',
    value: 0.1, // Equivalent value
    probability: 0.75, // 10%
    color: '#ffd700', // Gold
  },
  {
    type: 'sol',
    label: '0.1 SOL',
    value: 0.1,
    probability: 0.85, // 10%
    color: '#ff8c00', // Dark orange
  },
  {
    type: 'vip-access',
    label: 'VIP Access',
    value: 0.2, // Equivalent value
    probability: 0.92, // 7%
    color: '#ff6347', // Tomato
  },
  {
    type: 'extra-spin',
    label: 'Extra Spin',
    value: 0,
    probability: 0.97, // 5%
    color: '#ffa500', // Orange
  },
  {
    type: 'sol',
    label: '0.5 SOL',
    value: 0.5,
    probability: 1.0, // 3%
    color: '#ff4500', // Red-orange
  },
];

export function calculatePrize(): Prize {
  const random = Math.random();
  for (const prize of WHEEL_PRIZES) {
    if (random <= prize.probability) {
      return prize;
    }
  }
  return WHEEL_PRIZES[0]; // Fallback
}

export function calculateSpinRotation(prizeIndex: number, totalPrizes: number): number {
  // Calculate rotation to land on prize
  const prizeAngle = (360 / totalPrizes) * prizeIndex;
  const prizeCenter = prizeAngle + (360 / totalPrizes / 2);
  
  // Add multiple full rotations for smooth animation
  const fullRotations = 5;
  const finalRotation = fullRotations * 360 + (360 - prizeCenter);
  
  return finalRotation;
}

export interface SpinEligibility {
  canSpin: boolean;
  freeSpinsAvailable: number;
  paidSpinsAvailable: boolean;
  reason?: string;
}

export function checkSpinEligibility(
  walletAddress: string | null,
  happinessBalance: number,
  lastSpinDate: string | null,
  paidSpinsToday: number
): SpinEligibility {
  if (!walletAddress) {
    return {
      canSpin: false,
      freeSpinsAvailable: 0,
      paidSpinsAvailable: false,
      reason: 'Connect wallet to spin',
    };
  }

  const today = new Date().toISOString().split('T')[0];
  const hasSpunToday = lastSpinDate === today;
  
  // Free daily spin
  const freeSpinsAvailable = hasSpunToday ? 0 : 1;
  
  // Additional spins based on holdings (100 tokens = +1 spin)
  const bonusSpinsFromHoldings = Math.floor(happinessBalance / 100);
  const totalFreeSpins = freeSpinsAvailable + bonusSpinsFromHoldings;
  
  // Paid spins (max 5 per day)
  const maxPaidSpins = 5;
  const paidSpinsAvailable = paidSpinsToday < maxPaidSpins;
  
  const canSpin = totalFreeSpins > 0 || paidSpinsAvailable;
  
  return {
    canSpin,
    freeSpinsAvailable: totalFreeSpins,
    paidSpinsAvailable,
    reason: !canSpin ? 'No spins available today' : undefined,
  };
}

