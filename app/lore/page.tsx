"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import WorldMap from "@/components/ui/world-map";
import { Timeline } from "@/components/ui/timeline";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { SparklesCore } from "@/components/ui/sparkles";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { ArrowRight } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";

const LORE_TEXT = `Once upon a time in a sad world...

In a hidden corner of the internet existed the Happiness Atelier – a magical place guarded by a lone watcher (the Dev).

The elves there had one power: to heal broken hearts – but only with one currency: $HAPPINESS.

Every trade on Solana sends a spark of energy to the Atelier.

The more traded, the more hearts can be healed.

The community becomes Happiness Elves: You vote daily who gets saved.

Live on Pump.fun, the chosen ones tell their stories – polls decide – and an airdrop of pure happiness changes lives.

The watcher swore: As long as $HAPPINESS is traded, the Atelier will never stop shining.

One day, the whole world will smile – because a meme coin proved happiness is contagious.`;

export default function LorePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sadWojakRef = useRef<HTMLDivElement>(null);
  const happyChadRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Gradient - Orange/Gelb wie auf anderen Seiten */}
      <div className="fixed inset-0 bg-gradient-to-r from-[#ffc850] via-white to-white dark:from-orange-950 dark:via-black dark:to-black -z-10" />
      
      {/* Background Particles */}
      <Particles
        quantity={50}
        className="absolute inset-0"
        color="rgba(255, 200, 80, 0.3)"
      />
      
      {/* Glow Effects - Orange/Gelb */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400/20 dark:bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/20 dark:bg-amber-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-[#c67e15] dark:text-orange-400">
            The Legend of $HAPPINESS
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
                  legend
                </Highlight>
                {" "}that proves it&apos;s real – one story at a time. 📖
              </motion.h2>
            </HeroHighlight>
          </div>

          {/* Sparkles Effect */}
          <div className="relative w-full h-40 -mt-8">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFC850"
            />
          </div>
        </motion.div>

        {/* Animated Beam Section - Sad Wojak to Happy Chad */}
        <div
          ref={containerRef}
          className="relative w-full max-w-4xl mx-auto mb-16 md:mb-24"
        >
          <div className="flex items-center justify-between px-4 md:px-8">
            {/* Sad Wojak */}
            <div
              ref={sadWojakRef}
              className="flex flex-col items-center gap-4 z-10"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-4 border-gray-500 flex items-center justify-center shadow-lg overflow-hidden">
                <Image
                  src="/files/wojak.png"
                  alt="Sad Wojak"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <p className="text-gray-700 dark:text-white text-sm md:text-base font-semibold">Sad Wojak</p>
            </div>

            {/* Happy Chad */}
            <div
              ref={happyChadRef}
              className="flex flex-col items-center gap-4 z-10"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 border-4 border-orange-300 flex items-center justify-center shadow-lg overflow-hidden">
                <Image
                  src="/files/chad.png"
                  alt="Happy Chad"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <p className="text-gray-700 dark:text-white text-sm md:text-base font-semibold">Happy Chad</p>
            </div>
          </div>

          {/* Animated Beam */}
          {containerRef.current && sadWojakRef.current && happyChadRef.current && (
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={sadWojakRef}
              toRef={happyChadRef}
              curvature={-100}
              duration={3}
              className="text-orange-400"
            />
          )}
        </div>

        {/* Lore Text with Typing Animation */}
        <div className="w-full max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-10 border-2 border-orange-200 dark:border-orange-500/30 shadow-2xl">
            <TypingAnimation
              text={LORE_TEXT}
              className="text-gray-800 dark:text-white/90"
              speed={20}
            />
          </div>
        </div>

        {/* Additional Storytelling Sections */}
        <div className="w-full max-w-6xl mx-auto mb-12 md:mb-16 space-y-8">
          {/* Story Section 1: The First Spark */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-orange-950/80 to-amber-950/80 dark:from-orange-950/90 dark:to-amber-950/90 backdrop-blur-md rounded-2xl p-8 md:p-12 border-2 border-orange-800/50 dark:border-orange-700/50 shadow-2xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-orange-400 dark:text-orange-300 mb-4" style={{ fontFamily: '"Borel", cursive' }}>
              The First Spark
            </h3>
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              It started with a single trade. Someone swapped SOL for $HAPPINESS, and that first spark lit up the Atelier. The watcher watched in awe as the energy flowed through the blockchain, reaching the hidden corner where broken hearts waited.
            </p>
            <p className="text-white/90 text-lg leading-relaxed">
              That first spark became a flame. The flame became a fire. And the fire? It became a beacon that called to every soul who had ever felt the weight of sadness. They came from every corner of the internet, drawn by something they couldn&apos;t explain – a feeling that maybe, just maybe, happiness was possible.
            </p>
          </motion.div>

          {/* Story Section 2: The Elves Awaken */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-orange-950/80 to-amber-950/80 dark:from-orange-950/90 dark:to-amber-950/90 backdrop-blur-md rounded-2xl p-8 md:p-12 border-2 border-orange-800/50 dark:border-orange-700/50 shadow-2xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-orange-400 dark:text-orange-300 mb-4" style={{ fontFamily: '"Borel", cursive' }}>
              The Elves Awaken
            </h3>
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              As more trades flowed in, something magical happened. The community didn&apos;t just hold $HAPPINESS – they became Happiness Elves. Each holder gained the power to vote, to decide who would receive the healing energy of the Atelier.
            </p>
            <p className="text-white/90 text-lg leading-relaxed">
              The elves gathered daily, wallets connected, tokens held. They studied the stories, felt the pain, and cast their votes. Not for profit. Not for fame. But because they understood: every vote was a prayer, every trade a promise, every airdrop a miracle.
            </p>
          </motion.div>

          {/* Story Section 3: The Daily Ritual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-orange-950/80 to-amber-950/80 dark:from-orange-950/90 dark:to-amber-950/90 backdrop-blur-md rounded-2xl p-8 md:p-12 border-2 border-orange-800/50 dark:border-orange-700/50 shadow-2xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-orange-400 dark:text-orange-300 mb-4" style={{ fontFamily: '"Borel", cursive' }}>
              The Daily Ritual
            </h3>
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              Every day at 8 PM, the Atelier opens its doors. On Pump.fun, the chosen ones appear – real people with real stories. They speak into cameras, share their pain, and wait. The community watches, votes, and decides.
            </p>
            <p className="text-white/90 text-lg leading-relaxed">
              The polls run in real-time. Numbers tick up. Hearts race. And then – the moment. The airdrop. SOL and $HAPPINESS flow into wallets, live on camera. Tears turn to smiles. Despair becomes hope. The watcher smiles, knowing the Atelier is working.
            </p>
          </motion.div>

          {/* Story Section 4: The Promise */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-br from-orange-950/80 to-amber-950/80 dark:from-orange-950/90 dark:to-amber-950/90 backdrop-blur-md rounded-2xl p-8 md:p-12 border-2 border-orange-800/50 dark:border-orange-700/50 shadow-2xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-orange-400 dark:text-orange-300 mb-4" style={{ fontFamily: '"Borel", cursive' }}>
              The Promise
            </h3>
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              The watcher made a vow: As long as $HAPPINESS is traded, the Atelier will never stop shining. Every transaction feeds the magic. Every holder becomes a guardian. Every vote becomes a lifeline.
            </p>
            <p className="text-white/90 text-lg leading-relaxed">
              The promise echoes through the blockchain, written in code, verified on-chain, witnessed by thousands. It&apos;s not just a meme coin – it&apos;s a movement. A proof that in a world of chaos, happiness can be bought, sold, traded, and most importantly – shared.
            </p>
          </motion.div>

          {/* Story Section 5: The Contagion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-br from-orange-950/80 to-amber-950/80 dark:from-orange-950/90 dark:to-amber-950/90 backdrop-blur-md rounded-2xl p-8 md:p-12 border-2 border-orange-800/50 dark:border-orange-700/50 shadow-2xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-orange-400 dark:text-orange-300 mb-4" style={{ fontFamily: '"Borel", cursive' }}>
              The Contagion
            </h3>
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              Happiness is contagious. One smile becomes two. Two become ten. Ten become a thousand. The meme market noticed. The crypto world watched. Mainstream media couldn&apos;t ignore it.
            </p>
            <p className="text-white/90 text-lg leading-relaxed">
              Because $HAPPINESS proved something the world forgot: when you combine memes with meaning, when you mix trading with transformation, when you turn profits into purpose – you don&apos;t just create a token. You create a revolution. One that starts with a smile and ends with the whole world laughing.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="w-full max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-md rounded-2xl p-6 md:p-10 border-2 border-orange-300 dark:border-orange-400/30 shadow-xl">
            <p className="text-gray-800 dark:text-white text-center text-lg md:text-2xl font-semibold mb-2">
              <NumberTicker
                value={1247}
                className="text-orange-600 dark:text-orange-400 font-bold text-2xl md:text-3xl"
              />{" "}
              people have smiled thanks to $HAPPINESS
            </p>
          </div>
        </div>

        {/* World Map Section - Happiness Spreading */}
        <div className="w-full max-w-6xl mx-auto mb-12 md:mb-16">
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-gray-800 dark:text-white text-2xl md:text-3xl font-bold mb-2">
                Happiness{" "}
                <span className="text-orange-600 dark:text-orange-400">
                  Spreading
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                From Solana to the world – watch $HAPPINESS connect communities across continents. Every trade, every vote, every smile creates a ripple effect that knows no borders.
              </p>
            </motion.div>
            <div className="w-full">
              <WorldMap
                dots={[
                  {
                    start: { lat: 40.7128, lng: -74.0060 }, // New York
                    end: { lat: 51.5074, lng: -0.1278 }, // London
                  },
                  {
                    start: { lat: 51.5074, lng: -0.1278 }, // London
                    end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
                  },
                  {
                    start: { lat: 40.7128, lng: -74.0060 }, // New York
                    end: { lat: -23.5505, lng: -46.6333 }, // São Paulo
                  },
                  {
                    start: { lat: 35.6762, lng: 139.6503 }, // Tokyo
                    end: { lat: -33.8688, lng: 151.2093 }, // Sydney
                  },
                  {
                    start: { lat: 28.6139, lng: 77.2090 }, // New Delhi
                    end: { lat: 1.3521, lng: 103.8198 }, // Singapore
                  },
                  {
                    start: { lat: 52.5200, lng: 13.4050 }, // Berlin
                    end: { lat: 55.7558, lng: 37.6173 }, // Moscow
                  },
                  {
                    start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
                    end: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
                  },
                ]}
                lineColor="#ffc850"
              />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <Link href="/vote">
            <MovingBorderButton
              borderRadius="1.75rem"
              containerClassName="h-14 w-auto min-w-[280px]"
              borderClassName="bg-[radial-gradient(#ffc850_40%,transparent_60%)]"
              className="bg-gradient-to-r from-orange-500/90 to-amber-500/90 border-orange-400/50 text-white font-bold px-8 text-base"
            >
              <span className="flex items-center gap-2">
                Join the Atelier – Hold & Vote
                <ArrowRight className="h-5 w-5" />
              </span>
            </MovingBorderButton>
          </Link>
        </div>

        {/* Timeline Section - The $HAPPINESS Movement */}
        <div className="w-full max-w-7xl mx-auto">
          <Timeline
            data={[
              {
                title: "2025 - The Takeover Begins",
                content: (
                  <div>
                    <p className="mb-4 text-sm md:text-base font-normal text-gray-800 dark:text-gray-200">
                      $HAPPINESS launches on Pump.fun and immediately captures the meme market. Within 24 hours, we hit $1M volume, proving that happiness is the most viral emotion.
                    </p>
                    <p className="mb-4 text-sm md:text-base font-normal text-gray-800 dark:text-gray-200">
                      The first live charity show saves 10 families. Mainstream media takes notice. The movement is born.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-500/30">
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">$1M</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">Day 1 Volume</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-500/30">
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">10</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">Families Saved</p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: "Week 1 - Viral Explosion",
                content: (
                  <div>
                    <p className="mb-4 text-sm md:text-base font-normal text-gray-800 dark:text-gray-200">
                      The meme market explodes. $HAPPINESS becomes the #1 trending token on Solana. Celebrities, influencers, and crypto whales join the movement.
                    </p>
                    <p className="mb-4 text-sm md:text-base font-normal text-gray-800 dark:text-gray-200">
                      Daily volume hits $10M. 100 lives changed. The Happiness Atelier becomes a global phenomenon. Every trade funds real impact.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-500/30">
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">$10M</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">Daily Volume</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-500/30">
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">100+</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">Lives Changed</p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: "Month 1 - Market Domination",
                content: (
                  <div>
                    <p className="mb-4 text-sm md:text-base font-normal text-gray-800 dark:text-gray-200">
                      $HAPPINESS overtakes every meme coin. We&apos;re not just a token – we&apos;re a movement. Netflix wants the documentary rights. TV networks want the reality show.
                    </p>
                    <p className="mb-4 text-sm md:text-base font-normal text-gray-800 dark:text-gray-200">
                      1,000 lives saved. 10,000 holders. The Happiness Foundation launches. We&apos;re building the world&apos;s first happiness economy.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-500/30">
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">1,000</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">Lives Saved</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-500/30">
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">10K+</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">Holders</p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: "The Future - World Domination",
                content: (
                  <div>
                    <p className="mb-4 text-sm md:text-base font-normal text-gray-800 dark:text-gray-200">
                      The meme market belongs to $HAPPINESS. We&apos;ve proven that memes can change the world. 100,000 lives saved. The Happiness Festival launches in 50 countries.
                    </p>
                    <p className="mb-4 text-sm md:text-base font-normal text-gray-800 dark:text-gray-200">
                      We&apos;re not just the biggest meme coin – we&apos;re the happiest movement on Earth. Every smile, every trade, every vote proves that happiness is contagious.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-500/30">
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">100K+</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">Lives Changed</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-500/30">
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">50</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">Countries</p>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
