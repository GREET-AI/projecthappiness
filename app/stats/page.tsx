"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { GlareCard } from "@/components/ui/glare-card";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { SparklesCore } from "@/components/ui/sparkles";
import { Vote, TrendingUp, Gift, Users, Coins, Ticket } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsPage() {
  const { publicKey, connected } = useWallet();
  const [stats, setStats] = useState({
    votesGiven: 0,
    impactCreated: 0,
    happinessHoldings: 0,
    referrals: 0,
    wheelSpins: 0,
    wheelWins: 0,
    lotteryTickets: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!connected || !publicKey) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const wallet = publicKey.toString();

        // Votes given
        const { count: votesCount } = await supabase
          .from("votes")
          .select("id", { count: "exact", head: true })
          .eq("wallet_address", wallet);

        // Impact created (candidates voted for that won)
        const { count: impactCount } = await supabase
          .from("daily_winners")
          .select("id", { count: "exact", head: true })
          .eq("wallet_address", wallet);

        // Referrals
        const { count: referralsCount } = await supabase
          .from("referrals")
          .select("id", { count: "exact", head: true })
          .eq("referrer_wallet", wallet);

        // Wheel spins
        const { count: spinsCount } = await supabase
          .from("wheel_spins")
          .select("id", { count: "exact", head: true })
          .eq("wallet_address", wallet);

        // Wheel wins (spins with prize_value > 0)
        const { count: winsCount } = await supabase
          .from("wheel_spins")
          .select("id", { count: "exact", head: true })
          .eq("wallet_address", wallet)
          .gt("prize_value", 0);

        // Lottery tickets (placeholder - would need lottery_tickets table)
        const lotteryTickets = 0;

        // TODO: Fetch $HAPPINESS balance on-chain
        const happinessHoldings = 0;

        setStats({
          votesGiven: votesCount || 0,
          impactCreated: impactCount || 0,
          happinessHoldings,
          referrals: referralsCount || 0,
          wheelSpins: spinsCount || 0,
          wheelWins: winsCount || 0,
          lotteryTickets,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [connected, publicKey]);

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ffc850] via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-20">
          <HeroHighlight>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-center mb-8"
            >
              Connect your wallet to view your{" "}
              <Highlight className="text-black dark:text-white">stats</Highlight>
            </motion.h1>
          </HeroHighlight>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      icon: Vote,
      label: "Votes Given",
      value: stats.votesGiven,
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: TrendingUp,
      label: "Impact Created",
      value: stats.impactCreated,
      color: "from-amber-500 to-yellow-500",
      subtitle: "Lives helped",
    },
    {
      icon: Coins,
      label: "$HAPPINESS Holdings",
      value: stats.happinessHoldings,
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Users,
      label: "Referrals",
      value: stats.referrals,
      color: "from-orange-600 to-amber-600",
    },
    {
      icon: Gift,
      label: "Wheel Spins",
      value: stats.wheelSpins,
      color: "from-amber-600 to-yellow-600",
    },
    {
      icon: Gift,
      label: "Wheel Wins",
      value: stats.wheelWins,
      color: "from-yellow-600 to-orange-600",
    },
    {
      icon: Ticket,
      label: "Lottery Tickets",
      value: stats.lotteryTickets,
      color: "from-orange-500 to-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffc850] via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <HeroHighlight className="mb-16">
          <div className="relative">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFC850"
            />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-center mb-4"
              style={{ fontFamily: '"Borel", cursive' }}
            >
              <span className="text-orange-800 dark:text-orange-400 lowercase">your stats</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-center text-gray-700 dark:text-gray-300"
            >
              Track your impact and{" "}
              <Highlight className="text-black dark:text-white">happiness</Highlight> journey
            </motion.p>
          </div>
        </HeroHighlight>

        {/* Stats Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600 dark:text-gray-400">Loading your stats...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlareCard className="p-6 md:p-8">
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.label}</p>
                      <p className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-amber-400">
                        <NumberTicker value={stat.value} />
                      </p>
                      {stat.subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.subtitle}</p>
                      )}
                    </div>
                  </div>
                </GlareCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

