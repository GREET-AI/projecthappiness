"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import { Ticket, Trophy, Clock, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { GlareCard } from "@/components/ui/glare-card";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { motion } from "framer-motion";

export function Lottery() {
  const { publicKey, connected } = useWallet();
  const [tickets, setTickets] = useState(0);
  const [nextDraw, setNextDraw] = useState<Date | null>(null);
  const [prizePool, setPrizePool] = useState(0);
  const [lastWinner, setLastWinner] = useState<string | null>(null);

  useEffect(() => {
    if (!connected || !publicKey) {
      setTickets(0);
      return;
    }

    const fetchLotteryData = async () => {
      try {
        const wallet = publicKey.toString();

        // Get current week
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);

        // Count tickets for current week
        const { count } = await supabase
          .from("lottery_tickets")
          .select("id", { count: "exact", head: true })
          .eq("wallet_address", wallet)
          .gte("created_at", weekStart.toISOString())
          .lt("created_at", weekEnd.toISOString());

        setTickets(count || 0);

        // Calculate next draw (Sunday at 8 PM)
        const nextSunday = new Date(now);
        const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
        nextSunday.setDate(now.getDate() + daysUntilSunday);
        nextSunday.setHours(20, 0, 0, 0);
        if (nextSunday <= now) {
          nextSunday.setDate(nextSunday.getDate() + 7);
        }
        setNextDraw(nextSunday);

        // Get last winner
        const { data: lastWinnerData } = await supabase
          .from("lottery_winners")
          .select("wallet_address, prize_amount")
          .order("drawn_at", { ascending: false })
          .limit(1)
          .single();

        if (lastWinnerData) {
          setLastWinner(lastWinnerData.wallet_address);
          setPrizePool(0); // Reset for new week
        } else {
          // TODO: Calculate prize pool from Happiness Pool
          setPrizePool(0);
        }
      } catch (error) {
        console.error("Error fetching lottery data:", error);
      }
    };

    fetchLotteryData();
  }, [connected, publicKey]);

  const getTimeUntilDraw = () => {
    if (!nextDraw) return "Calculating...";
    const now = new Date();
    const diff = nextDraw.getTime() - now.getTime();
    if (diff <= 0) return "Draw in progress!";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <GlareCard className="p-8 md:p-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-800 dark:text-orange-400 mb-4 lowercase" style={{ fontFamily: '"Borel", cursive' }}>
            weekly lottery
          </h2>
          <p className="text-lg text-black dark:text-white">
            Win a share of the Happiness Pool every week!
          </p>
        </div>

        {/* Next Draw Countdown */}
        <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 dark:from-orange-500/30 dark:to-amber-500/30 rounded-lg p-6 border-2 border-orange-400 dark:border-amber-500">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Clock className="h-8 w-8 text-orange-600 dark:text-amber-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Next Draw</p>
              <p className="text-2xl font-bold text-orange-800 dark:text-orange-400">
                {getTimeUntilDraw()}
              </p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Every Sunday at 8 PM
          </p>
        </div>

        {/* Prize Pool */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Prize Pool</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-amber-400">
              <NumberTicker value={prizePool} /> SOL
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Tickets</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-amber-400">
              <NumberTicker value={tickets} />
            </p>
          </div>
        </div>

        {/* Last Winner */}
        {lastWinner && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-6 w-6 text-amber-600 dark:text-yellow-400" />
              <p className="font-semibold text-gray-900 dark:text-white">Last Winner</p>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
              {shortenAddress(lastWinner)}
            </p>
          </div>
        )}

        {/* How to Get Tickets */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
          <h3 className="text-lg font-bold text-orange-800 dark:text-orange-400 mb-3">How to Get Tickets</h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <Ticket className="h-5 w-5 text-orange-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <span>1 ticket per vote on candidates</span>
            </li>
            <li className="flex items-start gap-2">
              <Ticket className="h-5 w-5 text-orange-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <span>1 ticket per successful referral</span>
            </li>
            <li className="flex items-start gap-2">
              <Ticket className="h-5 w-5 text-orange-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <span>1 ticket per wheel win</span>
            </li>
            <li className="flex items-start gap-2">
              <Ticket className="h-5 w-5 text-orange-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Bonus tickets for $HAPPINESS holders (1 per 100 tokens)</span>
            </li>
          </ul>
        </div>

        {!connected && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Connect your wallet to participate
            </p>
          </div>
        )}
      </div>
    </GlareCard>
  );
}

