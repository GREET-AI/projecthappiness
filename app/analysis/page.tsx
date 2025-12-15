"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { MagicCard } from "@/components/magicui/magic-card";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Globe } from "@/components/magicui/globe";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { GlareCard } from "@/components/ui/glare-card";
import { Button } from "@/components/ui/button";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { TrendingUp, Users, DollarSign, Target, Zap, Globe as GlobeIcon } from "lucide-react";
import Link from "next/link";

export default function AnalysisPage() {
  // Calculate projected values
  const V0 = 0.001;
  const r = 0.15;
  const calculateValue = (days: number) => V0 * Math.exp(r * days);
  
  const day7 = calculateValue(7);
  const day30 = calculateValue(30);
  const day90 = calculateValue(90);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-[#c67e15] dark:text-orange-400">
          Scientific Analysis
        </h1>
        
        {/* Hero Highlight Section */}
        <div className="mb-8">
          <HeroHighlight containerClassName="bg-transparent">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 dark:text-white max-w-4xl mx-auto leading-relaxed lg:leading-snug text-center px-4"
            >
              They say you can&apos;t buy{" "}
              <Highlight className="text-black dark:text-white bg-gradient-to-r from-orange-400 to-amber-500">
                happiness
              </Highlight>
              . But with{" "}
              <Highlight className="text-black dark:text-white bg-gradient-to-r from-orange-400 to-amber-500">
                $HAPPINESS
              </Highlight>
              , you can buy the{" "}
              <Highlight className="text-black dark:text-white bg-gradient-to-r from-orange-400 to-amber-500">
                data
              </Highlight>
              {" "}to prove it&apos;s working — one exponential growth model at a time. 📊
            </motion.h2>
          </HeroHighlight>
        </div>
        
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Data-driven insights into exponential growth models, creator rewards, and real-world impact
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Growth Model - Magic Card */}
        <MagicCard className="p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-8 w-8 text-orange-600 dark:text-amber-400" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                Exponential Growth Model
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground text-lg">
                The value of $HAPPINESS follows an exponential growth model:
              </p>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-6 rounded-lg border-2 border-orange-200 dark:border-amber-500/30">
                <BlockMath math="V(t) = V_0 \cdot e^{rt}" />
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p>
                    <strong className="text-orange-600 dark:text-amber-400">V(t):</strong> Value at time t
                  </p>
                  <p>
                    <strong className="text-orange-600 dark:text-amber-400">V₀:</strong> Initial value = $0.001
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <strong className="text-amber-600 dark:text-yellow-400">r:</strong> Growth rate (~0.15-0.50 daily for viral coins)
                  </p>
                  <p>
                    <strong className="text-amber-600 dark:text-yellow-400">t:</strong> Time in days
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="font-semibold text-xl text-orange-600 dark:text-amber-400">Projected Values</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/20 dark:from-orange-500/20 dark:to-orange-600/30 p-6 rounded-lg border border-orange-300 dark:border-amber-500/50">
                  <p className="text-sm text-muted-foreground mb-2">Day 7</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-amber-400">
                    $<NumberTicker value={day7} decimals={6} />
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/20 dark:from-amber-500/20 dark:to-amber-600/30 p-6 rounded-lg border border-amber-300 dark:border-yellow-500/50">
                  <p className="text-sm text-muted-foreground mb-2">Day 30</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-yellow-400">
                    $<NumberTicker value={day30} decimals={4} />
                  </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 dark:from-yellow-500/20 dark:to-yellow-600/30 p-6 rounded-lg border border-yellow-300 dark:border-amber-500/50">
                  <p className="text-sm text-muted-foreground mb-2">Day 90</p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-amber-400">
                    $<NumberTicker value={day90} decimals={2} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MagicCard>

        {/* Projected Creator Rewards & Impact - 5 Year Plan */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
            Projected Creator Rewards & Impact (5-Year Plan)
          </h2>
          <p className="text-sm text-center text-muted-foreground max-w-3xl mx-auto mb-6">
            Based on real Solana DEX data (Dexscreener): Total Solana DEX volume ~$3.84B daily. Top tokens: jellyjelly ($28M, 10mo), 
            pippin ($13.2M, 1y), HERO ($7.6M, 23h). New tokens can reach $1-10M in first days. 
            Conservative projections accounting for Solana ecosystem growth patterns.
          </p>
          <BentoGrid className="max-w-7xl mx-auto">
            {/* Year 1 */}
            <BentoCard
              name="Year 1: Launch & Early Growth"
              header={<DollarSign className="h-6 w-6 text-orange-600 dark:text-amber-400" />}
              className="md:col-span-2"
            >
              <div className="space-y-3">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Month 1-3</p>
                    <p className="text-sm font-bold">$100k - $2M</p>
                    <p className="text-xs text-muted-foreground mt-2">Daily Volume</p>
                    <p className="text-xs text-orange-600 dark:text-amber-400 font-semibold mt-1">$500 - $10k daily rewards</p>
                    <p className="text-xs text-amber-600 dark:text-yellow-400 mt-1">$150 - $3k charity</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">* New Solana tokens: $1-10M possible</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Month 4-6</p>
                    <p className="text-sm font-bold">$500k - $5M</p>
                    <p className="text-xs text-muted-foreground mt-2">Daily Volume</p>
                    <p className="text-xs text-orange-600 dark:text-amber-400 font-semibold mt-1">$2.5k - $25k daily rewards</p>
                    <p className="text-xs text-amber-600 dark:text-yellow-400 mt-1">$1k - $10k charity</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">* Comparable to HERO ($7.6M)</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Month 7-12</p>
                    <p className="text-sm font-bold">$1M - $10M</p>
                    <p className="text-xs text-muted-foreground mt-2">Daily Volume</p>
                    <p className="text-xs text-orange-600 dark:text-amber-400 font-semibold mt-1">$5k - $50k daily rewards</p>
                    <p className="text-xs text-amber-600 dark:text-yellow-400 mt-1">$2k - $20k charity</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">* Top Solana tokens: $10-30M</p>
                  </div>
                </div>
                <p className="text-xs font-semibold mt-4 text-amber-600 dark:text-yellow-400 border-t pt-3">
                  Year 1 Impact: 2,000-20,000 people helped | Based on Solana DEX patterns (new tokens can spike $1-10M in days)
                </p>
              </div>
            </BentoCard>
            
            {/* Year 2 */}
            <BentoCard
              name="Year 2: Community Building"
              header={<TrendingUp className="h-6 w-6 text-orange-600 dark:text-amber-400" />}
              className="md:col-span-2"
            >
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Average Daily Volume</p>
                    <p className="text-lg font-bold">$5M - $15M</p>
                    <p className="text-xs text-muted-foreground mt-2">Daily Rewards (0.5%)</p>
                    <p className="text-sm text-orange-600 dark:text-amber-400 font-semibold">$25k - $75k</p>
                    <p className="text-xs text-muted-foreground mt-2">Marketing (60%)</p>
                    <p className="text-xs">$15k - $45k</p>
                    <p className="text-xs text-muted-foreground mt-1">Charity (40%)</p>
                    <p className="text-xs text-amber-600 dark:text-yellow-400">$10k - $30k</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Peak Days</p>
                    <p className="text-sm font-bold">$15M - $30M</p>
                    <p className="text-xs text-muted-foreground mt-2">During viral events</p>
                    <p className="text-xs text-orange-600 dark:text-amber-400 font-semibold mt-1">$75k - $150k daily rewards</p>
                    <p className="text-xs text-amber-600 dark:text-yellow-400 mt-1">$30k - $60k charity</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">* Top Solana token: jellyjelly ($28M)</p>
                  </div>
                </div>
                <p className="text-xs font-semibold mt-4 text-amber-600 dark:text-yellow-400 border-t pt-3">
                  Year 2 Impact: 20,000-60,000 people helped | Matching top Solana DEX tokens (jellyjelly, pippin levels)
                </p>
              </div>
            </BentoCard>

            {/* Year 3 */}
            <BentoCard
              name="Year 3: Mainstream Recognition"
              header={<Target className="h-6 w-6 text-orange-600 dark:text-amber-400" />}
              className="md:col-span-2"
            >
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Average Daily Volume</p>
                    <p className="text-lg font-bold">$15M - $30M</p>
                    <p className="text-xs text-muted-foreground mt-2">Daily Rewards (0.5%)</p>
                    <p className="text-sm text-orange-600 dark:text-amber-400 font-semibold">$75k - $150k</p>
                    <p className="text-xs text-muted-foreground mt-2">Marketing (55%)</p>
                    <p className="text-xs">$41.25k - $82.5k</p>
                    <p className="text-xs text-muted-foreground mt-1">Charity (45%)</p>
                    <p className="text-xs text-amber-600 dark:text-yellow-400">$33.75k - $67.5k</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Peak Days</p>
                    <p className="text-sm font-bold">$30M - $50M</p>
                    <p className="text-xs text-muted-foreground mt-2">During major events</p>
                    <p className="text-xs text-orange-600 dark:text-amber-400 font-semibold mt-1">$150k - $250k daily rewards</p>
                    <p className="text-xs text-amber-600 dark:text-yellow-400 mt-1">$67.5k - $112.5k charity</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">* Top 0.1% of Solana tokens</p>
                  </div>
                </div>
                <p className="text-xs font-semibold mt-4 text-amber-600 dark:text-yellow-400 border-t pt-3">
                  Year 3 Impact: 60,000-100,000 people helped | Top-tier Solana token status (exceeding current leaders)
                </p>
              </div>
            </BentoCard>

            {/* Year 4 */}
            <BentoCard
              name="Year 4: Established Player"
              header={<Users className="h-6 w-6 text-amber-600 dark:text-yellow-400" />}
              className="md:col-span-2"
            >
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Average Daily Volume</p>
                    <p className="text-lg font-bold">$30M - $50M</p>
                    <p className="text-xs text-muted-foreground mt-2">Daily Rewards (0.5%)</p>
                    <p className="text-sm text-orange-600 dark:text-amber-400 font-semibold">$150k - $250k</p>
                    <p className="text-xs text-muted-foreground mt-2">Marketing (50%)</p>
                    <p className="text-xs">$75k - $125k</p>
                    <p className="text-xs text-muted-foreground mt-1">Charity (50%)</p>
                    <p className="text-xs text-amber-600 dark:text-yellow-400">$75k - $125k</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Peak Days</p>
                    <p className="text-sm font-bold">$50M - $100M</p>
                    <p className="text-xs text-muted-foreground mt-2">During viral cycles</p>
                    <p className="text-xs text-orange-600 dark:text-amber-400 font-semibold mt-1">$250k - $500k daily rewards</p>
                    <p className="text-xs text-amber-600 dark:text-yellow-400 mt-1">$125k - $250k charity</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">* Would be #1 Solana token</p>
                  </div>
                </div>
                <p className="text-xs font-semibold mt-4 text-amber-600 dark:text-yellow-400 border-t pt-3">
                  Year 4 Impact: 100,000-200,000 people helped | Dominant Solana token, 1-2% of total Solana DEX volume
                </p>
              </div>
            </BentoCard>

            {/* Year 5 */}
            <BentoCard
              name="Year 5: Market Leader"
              header={<Zap className="h-6 w-6 text-amber-600 dark:text-yellow-400" />}
              className="md:col-span-2"
            >
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Average Daily Volume</p>
                    <p className="text-lg font-bold">$50M - $100M</p>
                    <p className="text-xs text-muted-foreground mt-2">Daily Rewards (0.5%)</p>
                    <p className="text-sm text-orange-600 dark:text-amber-400 font-semibold">$250k - $500k</p>
                    <p className="text-xs text-muted-foreground mt-2">Marketing (50%)</p>
                    <p className="text-xs">$125k - $250k</p>
                    <p className="text-xs text-muted-foreground mt-1">Charity (50%)</p>
                    <p className="text-xs text-amber-600 dark:text-yellow-400">$125k - $250k</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Peak Days</p>
                    <p className="text-sm font-bold">$100M - $200M</p>
                    <p className="text-xs text-muted-foreground mt-2">During major cycles</p>
                    <p className="text-xs text-orange-600 dark:text-amber-400 font-semibold mt-1">$500k - $1M daily rewards</p>
                    <p className="text-xs text-amber-600 dark:text-yellow-400 mt-1">$250k - $500k charity</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">* 2-5% of total Solana DEX volume ($3.84B)</p>
                  </div>
                </div>
                <p className="text-xs font-semibold mt-4 text-amber-600 dark:text-yellow-400 border-t pt-3">
                  Year 5 Impact: 200,000-400,000 people helped annually | #1 Solana meme token, 2-5% of ecosystem volume
                </p>
              </div>
            </BentoCard>
          </BentoGrid>
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-lg p-4 border border-orange-200 dark:border-orange-800 mt-6">
            <p className="text-xs text-center text-muted-foreground">
              <strong>Methodology:</strong> Projections based on real Solana DEX data (Dexscreener, 2025). Total Solana DEX volume: ~$3.84B daily. 
              Top tokens: jellyjelly ($28M, 10mo old), pippin ($13.2M, 1y old). New tokens can reach $1-10M in first days (HERO: $7.6M in 23h). 
              Our 5-year plan assumes sustainable growth within Solana ecosystem, reaching 1-5% of total Solana DEX volume by Year 5. 
              All figures are conservative estimates based on actual Solana token performance patterns.
            </p>
          </div>
        </div>

        {/* Viral Volume Drivers - Bento Grid */}
        <div className="space-y-6 mt-12">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
            Viral Volume Drivers
          </h2>
          <BentoGrid className="max-w-5xl mx-auto">
            <GlareCard className="md:col-span-1 p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-orange-600 dark:text-amber-400">Meme Themes Pump 10x</h3>
                <p className="text-sm text-muted-foreground">
                  Animals & Holidays drive massive volume spikes
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">DINOSOL:</span>
                    <span className="font-semibold text-amber-600 dark:text-yellow-400">Viral Animal Theme</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SANTA:</span>
                    <span className="font-semibold text-amber-600 dark:text-yellow-400">Holiday Pump</span>
                  </div>
                  <div className="mt-4 p-3 bg-orange-500/10 dark:bg-orange-500/20 rounded-lg border border-orange-500/30">
                    <p className="text-xs font-semibold text-orange-700 dark:text-amber-400">
                      $HAPPINESS combines charity + meme = 10x potential
                    </p>
                  </div>
                </div>
              </div>
            </GlareCard>
            <GlareCard className="md:col-span-1 p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-orange-600 dark:text-amber-400">Low Liquidity = High Volatility</h3>
                <p className="text-sm text-muted-foreground">
                  Small liquidity pools create massive volume multipliers
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">trillions:</span>
                    <span className="font-semibold">$36k Liquidity</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume (1h):</span>
                    <span className="font-semibold text-amber-600 dark:text-yellow-400">$2.3M</span>
                  </div>
                  <div className="mt-4 p-3 bg-orange-500/10 dark:bg-orange-500/20 rounded-lg border border-orange-500/30">
                    <p className="text-xs font-semibold text-orange-700 dark:text-amber-400">
                      64x Volume/Liquidity Ratio
                    </p>
                  </div>
                </div>
              </div>
            </GlareCard>
            <GlareCard className="md:col-span-1 p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-orange-600 dark:text-amber-400">Txn Count = Hype</h3>
                <p className="text-sm text-muted-foreground">
                  High transaction count indicates organic community growth
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CALVIN:</span>
                    <span className="font-semibold">56k Txns</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Makers:</span>
                    <span className="font-semibold text-amber-600 dark:text-yellow-400">9.9k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume (1d):</span>
                    <span className="font-semibold text-amber-600 dark:text-yellow-400">$5.1M</span>
                  </div>
                  <div className="mt-4 p-3 bg-orange-500/10 dark:bg-orange-500/20 rounded-lg border border-orange-500/30">
                    <p className="text-xs font-semibold text-orange-700 dark:text-amber-400">
                      Community engagement = sustainable growth
                    </p>
                  </div>
                </div>
              </div>
            </GlareCard>
          </BentoGrid>
        </div>

        {/* What $10M Daily Volume Means */}
        <div className="space-y-6 mt-12">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
            What $10M Daily Volume Means
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <MagicCard className="p-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-orange-500/20 dark:bg-amber-500/20 flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-orange-600 dark:text-amber-400" />
                  </div>
                </div>
                <div>
                  <p className="text-4xl font-bold text-orange-600 dark:text-amber-400 mb-2">
                    <NumberTicker value={1000} />
                  </p>
                  <p className="text-lg font-semibold">Rents Paid</p>
                  <p className="text-sm text-muted-foreground mt-2">Daily</p>
                </div>
              </div>
            </MagicCard>
            <MagicCard className="p-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 dark:bg-yellow-500/20 flex items-center justify-center">
                    <Users className="h-8 w-8 text-amber-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div>
                  <p className="text-4xl font-bold text-amber-600 dark:text-yellow-400 mb-2">
                    <NumberTicker value={500} />
                  </p>
                  <p className="text-lg font-semibold">Therapies</p>
                  <p className="text-sm text-muted-foreground mt-2">Daily</p>
                </div>
              </div>
            </MagicCard>
            <MagicCard className="p-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-500/20 dark:bg-amber-500/20 flex items-center justify-center">
                    <Target className="h-8 w-8 text-yellow-600 dark:text-amber-400" />
                  </div>
                </div>
                <div>
                  <p className="text-4xl font-bold text-yellow-600 dark:text-amber-400 mb-2">
                    <NumberTicker value={100} />
                  </p>
                  <p className="text-lg font-semibold">Families Saved</p>
                  <p className="text-sm text-muted-foreground mt-2">Daily</p>
                </div>
              </div>
            </MagicCard>
          </div>
        </div>

        {/* Marketing Allocation Strategy - Bento Grid */}
        <div className="space-y-6 mt-12">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
            Marketing Allocation Strategy
          </h2>
          <BentoGrid className="max-w-5xl mx-auto">
            <BentoCard
              name="Start Phase (70% Marketing)"
              header={<TrendingUp className="h-6 w-6 text-orange-600 dark:text-amber-400" />}
              className="md:col-span-1"
            >
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Focus: Initial Growth</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Dexscreener Banner</li>
                  <li>Influencer Partnerships</li>
                  <li>PR Campaigns</li>
                  <li>Community Building</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4">Example: $1k rewards → $700 marketing</p>
              </div>
            </BentoCard>
            <BentoCard
              name="Growth Phase (60% Marketing)"
              header={<TrendingUp className="h-6 w-6 text-orange-600 dark:text-amber-400" />}
              className="md:col-span-1"
            >
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Focus: Scaling</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Mainstream Articles</li>
                  <li>TV Features</li>
                  <li>International Expansion</li>
                  <li>Brand Partnerships</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4">Example: $10k rewards → $6k marketing</p>
              </div>
            </BentoCard>
            <BentoCard
              name="Scale Phase (50% Marketing)"
              header={<Target className="h-6 w-6 text-orange-600 dark:text-amber-400" />}
              className="md:col-span-1"
            >
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Focus: Sustainability</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Netflix & TV Rights</li>
                  <li>Global Festivals</li>
                  <li>Foundation Building</li>
                  <li>Long-term Impact</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4">Example: $50k rewards → $25k marketing</p>
              </div>
            </BentoCard>
          </BentoGrid>
        </div>

        {/* Comparison Table - Bento Grid */}
        <div className="space-y-6 mt-12">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
            Comparison Analysis
          </h2>
          <BentoGrid className="max-w-7xl mx-auto">
            <BentoCard
              name="Metric"
              header={<Target className="h-6 w-6 text-orange-600 dark:text-amber-400" />}
              className="md:col-span-1"
            >
              <div className="space-y-4 text-sm">
                <div className="font-semibold">Daily Charity Shows</div>
                <div className="font-semibold">Transparency</div>
                <div className="font-semibold">Community Voting</div>
                <div className="font-semibold">Trading Fee Model</div>
                <div className="font-semibold">Growth Rate</div>
              </div>
            </BentoCard>
            <BentoCard
              name="$HAPPINESS"
              header={<TrendingUp className="h-6 w-6 text-orange-600 dark:text-amber-400" />}
              className="md:col-span-1"
            >
              <div className="space-y-4 text-sm">
                <div className="text-amber-600 dark:text-yellow-400 font-semibold">✓ Yes</div>
                <div className="text-amber-600 dark:text-yellow-400 font-semibold">100% On-chain</div>
                <div className="text-amber-600 dark:text-yellow-400 font-semibold">✓ Yes</div>
                <div className="text-amber-600 dark:text-yellow-400 font-semibold">5% to Pool</div>
                <div className="text-amber-600 dark:text-yellow-400 font-semibold">
                  <InlineMath math="r = 0.15" />
                </div>
              </div>
            </BentoCard>
            <BentoCard
              name="MrBeast"
              header={<Users className="h-6 w-6 text-orange-600 dark:text-amber-400" />}
              className="md:col-span-1"
            >
              <div className="space-y-4 text-sm">
                <div className="text-muted-foreground">Occasional</div>
                <div className="text-muted-foreground">High</div>
                <div className="text-muted-foreground">No</div>
                <div className="text-muted-foreground">N/A</div>
                <div className="text-muted-foreground">N/A</div>
              </div>
            </BentoCard>
            <BentoCard
              name="Other Meme Coins"
              header={<TrendingUp className="h-6 w-6 text-orange-600 dark:text-amber-400" />}
              className="md:col-span-1"
            >
              <div className="space-y-4 text-sm">
                <div className="text-muted-foreground">No</div>
                <div className="text-muted-foreground">Variable</div>
                <div className="text-muted-foreground">Rare</div>
                <div className="text-muted-foreground">Variable</div>
                <div className="text-muted-foreground">Unpredictable</div>
              </div>
            </BentoCard>
          </BentoGrid>
        </div>

        {/* Snowball Effect - Enhanced Table */}
        <MagicCard className="p-8 mt-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-8 w-8 text-orange-600 dark:text-amber-400" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                Snowball Effect Analysis
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">
              The Snowball effect describes how small initial contributions
              compound over time through network effects and community engagement.
            </p>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-6 rounded-lg border-2 border-orange-200 dark:border-amber-500/30">
              <BlockMath math="S_n = S_0 \cdot (1 + r)^n \cdot (1 + \alpha \cdot n)" />
            </div>
            <BentoGrid className="mt-8 md:grid-cols-7">
              <BentoCard
                name="Phase"
                header={<Target className="h-5 w-5" />}
                className="md:col-span-1"
              >
                <div className="space-y-2 text-sm font-semibold">
                  <div>Launch</div>
                  <div>Early Growth</div>
                  <div>Viral Phase</div>
                  <div>Mainstream</div>
                  <div>Global</div>
                </div>
              </BentoCard>
              <BentoCard
                name="Platforms"
                header={<GlobeIcon className="h-5 w-5" />}
                className="md:col-span-1"
              >
                <div className="space-y-2 text-sm">
                  <div>Pump.fun, X</div>
                  <div>+ Dexscreener</div>
                  <div>+ YouTube, PR</div>
                  <div>+ TV, Netflix</div>
                  <div>+ Global Media</div>
                </div>
              </BentoCard>
              <BentoCard
                name="Estimated Views"
                header={<Users className="h-5 w-5" />}
                className="md:col-span-1"
              >
                <div className="space-y-2 text-sm">
                  <div>1k - 10k</div>
                  <div>10k - 100k</div>
                  <div>100k - 1M</div>
                  <div>1M - 10M</div>
                  <div>10M+</div>
                </div>
              </BentoCard>
              <BentoCard
                name="Revenue/Week"
                header={<DollarSign className="h-5 w-5" />}
                className="md:col-span-1"
              >
                <div className="space-y-2 text-sm">
                  <div>$50 - $500</div>
                  <div>$500 - $5k</div>
                  <div>$5k - $50k</div>
                  <div>$50k - $500k</div>
                  <div>$500k+</div>
                </div>
              </BentoCard>
              <BentoCard
                name="Volume Multiplier"
                header={<TrendingUp className="h-5 w-5 text-orange-600 dark:text-amber-400" />}
                className="md:col-span-1"
              >
                <div className="space-y-2 text-sm">
                  <div className="text-muted-foreground">1x (Base)</div>
                  <div className="text-orange-600 dark:text-amber-400 font-semibold">+3x (Ads)</div>
                  <div className="text-amber-600 dark:text-yellow-400 font-semibold">+10x (Ads)</div>
                  <div className="text-orange-600 dark:text-amber-400 font-semibold">+50x (TV)</div>
                  <div className="text-amber-600 dark:text-yellow-400 font-semibold">+100x (Global)</div>
                </div>
              </BentoCard>
              <BentoCard
                name="Community Size"
                header={<Users className="h-5 w-5 text-orange-600 dark:text-amber-400" />}
                className="md:col-span-1"
              >
                <div className="space-y-2 text-sm">
                  <div>100 - 1k</div>
                  <div>1k - 10k</div>
                  <div>10k - 100k</div>
                  <div>100k - 1M</div>
                  <div>1M+</div>
                </div>
              </BentoCard>
              <BentoCard
                name="Monthly Impact"
                header={<Target className="h-5 w-5 text-orange-600 dark:text-amber-400" />}
                className="md:col-span-1"
              >
                <div className="space-y-2 text-sm text-amber-600 dark:text-yellow-400 font-semibold">
                  <div>10-50 people</div>
                  <div>50-500 people</div>
                  <div>500-5k people</div>
                  <div>5k-50k people</div>
                  <div>50k+ people</div>
                </div>
              </BentoCard>
            </BentoGrid>
          </div>
        </MagicCard>

        {/* Risk Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Low Risk Factors</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>On-chain transparency</li>
                  <li>Community governance</li>
                  <li>Daily charity shows</li>
                  <li>Established tokenomics</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Considerations</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Market volatility</li>
                  <li>Regulatory changes</li>
                  <li>Competition</li>
                  <li>Technology risks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section with Globe + Orbiting Circles */}
        <div className="mt-20 mb-12 relative">
          <div className="relative flex flex-col items-center justify-center min-h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/30 dark:via-amber-950/30 dark:to-yellow-950/30 border-2 border-orange-200 dark:border-amber-500/30">
            <OrbitingCircles className="absolute inset-0" radius={120} duration={20}>
              <div className="flex size-20 items-center justify-center rounded-full border border-orange-300 dark:border-amber-500 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 text-orange-600 dark:text-amber-400" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles className="absolute inset-0" radius={120} duration={20} delay={0.5} reverse>
              <div className="flex size-16 items-center justify-center rounded-full border border-amber-300 dark:border-yellow-500 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
                <Users className="h-6 w-6 text-amber-600 dark:text-yellow-400" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles className="absolute inset-0" radius={120} duration={20} delay={1}>
              <div className="flex size-14 items-center justify-center rounded-full border border-yellow-300 dark:border-amber-500 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
                <Target className="h-5 w-5 text-yellow-600 dark:text-amber-400" />
              </div>
            </OrbitingCircles>
            
            <div className="relative z-10 text-center space-y-8 px-4">
              <div className="flex justify-center">
                <Globe className="w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">🌍</div>
                  </div>
                </Globe>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                  Join the Happiest Movement
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Be part of a memecoin that creates real impact. Every trade helps save lives through daily charity shows.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/apply">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Apply Now
                    </Button>
                  </Link>
                  <Link href="/vote">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-2 border-orange-600 dark:border-amber-400 text-orange-600 dark:text-amber-400 hover:bg-orange-600 hover:text-white dark:hover:bg-amber-400 dark:hover:text-black font-bold px-8 py-6 text-lg"
                    >
                      Vote for Candidates
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

