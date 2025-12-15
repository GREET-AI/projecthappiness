"use client";

import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { LivePoolTicker } from "@/components/live-pool-ticker";
import { Globe } from "@/components/magicui/globe";
import { BackgroundBeams } from "@/components/magicui/background-beams";
import { AuroraBackground } from "@/components/magicui/aurora-background";
import { DottedGlow } from "@/components/magicui/dotted-glow";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { RippleButton } from "@/components/ui/ripple-button";
import { LogoWithShimmer } from "@/components/logo-with-shimmer";
import { SocialButtons } from "@/components/social-buttons";
import { RoadmapModal } from "@/components/roadmap-modal";
import { AboutModal, HowItWorksModal, HowToBuyModal } from "@/components/info-modals";
import { ContractAddressButton } from "@/components/contract-address-button";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { SparklesCore } from "@/components/ui/sparkles";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, FileText, Vote, TrendingUp, BarChart3, Video, Shield, ArrowRightIcon, BookOpen } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { GlareCard } from "@/components/ui/glare-card";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useChristmas } from "@/lib/contexts/christmas-context";

export default function HomePage() {
  const { theme } = useTheme();
  const { isChristmasActive } = useChristmas();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <>
      <BackgroundGradientAnimation
        gradientBackgroundStart={isChristmasActive ? "rgb(200, 220, 240)" : "rgb(255, 200, 80)"}
        gradientBackgroundEnd={isChristmasActive ? "rgb(180, 200, 220)" : "rgb(255, 255, 255)"}
        firstColor={isChristmasActive ? "200, 220, 240" : "255, 200, 80"}
        secondColor={isChristmasActive ? "180, 200, 220" : "255, 232, 31"}
        thirdColor={isChristmasActive ? "160, 180, 200" : "255, 165, 0"}
        fourthColor={isChristmasActive ? "170, 190, 210" : "255, 215, 0"}
        fifthColor={isChristmasActive ? "190, 210, 230" : "255, 200, 80"}
        pointerColor={isChristmasActive ? "150, 170, 190" : "255, 200, 80"}
        size="80%"
        blendingValue={isChristmasActive ? "soft-light" : "hard-light"}
        interactive={true}
        containerClassName="fixed inset-0 -z-10"
      />
      {/* Eisiger Overlay für Christmas Mode */}
      {isChristmasActive && (
        <div 
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(200, 220, 240, 0.3) 0%, rgba(180, 200, 220, 0.4) 50%, rgba(160, 180, 200, 0.3) 100%)',
            backdropFilter: 'blur(0.5px)',
          }}
        />
      )}
      <div className="relative min-h-screen overflow-visible">

      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-[80vh] gap-8 md:gap-12 lg:gap-16 py-12">
            {/* Logo Links - X-Achse links, Y-Achse mittig */}
            <div className="flex-shrink-0 flex items-center justify-center md:justify-start md:self-center">
              <LogoWithShimmer className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80" />
            </div>

            {/* Headline und Subheadline Rechts */}
            <div className="flex-1 text-center md:text-left space-y-2 md:space-y-4 max-w-2xl md:self-center">
            {/* PROJECT - Groß geschrieben */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight leading-tight" style={{
              fontFamily: '"Borel", cursive',
              color: '#c67e15'
            }}>
              PROJECT
            </h1>
            
            {/* happiness - klein geschrieben mit Blur-Schatten */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight leading-tight relative" style={{
              fontFamily: '"Borel", cursive',
              color: '#c67e15',
            }}>
              <span 
                className="relative z-10"
                style={{
                  textShadow: '0 0 20px rgba(198, 126, 21, 0.9), 0 0 40px rgba(198, 126, 21, 0.7), 0 0 60px rgba(198, 126, 21, 0.5), 0 0 80px rgba(198, 126, 21, 0.4), 0 0 100px rgba(198, 126, 21, 0.3)',
                }}
              >
                happiness
              </span>
            </h2>
            
            {/* Animated Gradient Text */}
            <div className="mt-6">
              <AnimatedGradientText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8">
                $HAPPINESS
              </AnimatedGradientText>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                The happiest meme coin on Solana funding daily live charity shows
                via creator trading fees
              </p>
            </div>

            {/* Contract Address Button + Social Media Buttons Container */}
            <div className="mt-20 md:mt-32 flex flex-col gap-6 md:gap-8">
              {/* Social Media Buttons + Roadmap Button - Auf einer Linie (für Breitenberechnung) */}
              <div className="flex flex-wrap gap-6 md:gap-8 justify-center md:justify-start items-center" id="social-buttons-container">
                <SocialButtons />
                <RoadmapModal />
              </div>
              
              {/* Contract Address Button - Über den Social Buttons, gleiche Breite */}
              <div className="flex justify-center md:justify-start">
                <ContractAddressButton />
              </div>
            </div>
          </div>
        </section>

        {/* Info Modals Section */}
        <section className="mt-32 md:mt-40 mb-16 relative">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>
          
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <AboutModal />
              </motion.div>
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <HowItWorksModal />
              </motion.div>
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <HowToBuyModal />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Hero Highlight Section */}
        <section className="mt-20 md:mt-32 mb-16 relative">
          <HeroHighlight containerClassName="bg-transparent dark:bg-transparent">
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-5xl leading-relaxed lg:leading-snug text-center mx-auto relative z-20"
            >
              They say{" "}
              <Highlight className="text-black dark:text-white font-extrabold">
                money can&apos;t buy happiness
              </Highlight>
              . Well,{" "}
              <Highlight className="text-black dark:text-white font-extrabold">
                we&apos;re here to prove them wrong
              </Highlight>
              {" "}— one{" "}
              <Highlight className="text-black dark:text-white font-extrabold">
                $HAPPINESS
              </Highlight>{" "}
              transaction at a time. 🚀
            </motion.h1>
            
            {/* Sparkles Effect */}
            <div className="w-full h-40 relative -mt-20">
              {/* Gradients */}
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px w-1/4" />

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFC850"
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 w-full h-full bg-transparent [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </HeroHighlight>
        </section>

        {/* Live Pool Ticker - Zentriert unter Hero */}
        <div className="w-full max-w-2xl mx-auto mt-32 md:mt-40">
          <LivePoolTicker tradingFees={125000} communityBoost={45000} />
        </div>

        {/* Dexscreener Chart Section */}
        <section className="mt-40 md:mt-48 mb-16">
          {/* Mock Data Warning Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 dark:from-yellow-600 dark:via-amber-600 dark:to-yellow-700 rounded-xl p-4 text-center shadow-lg border-2 border-yellow-600 dark:border-yellow-500">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-2xl">📊</span>
                <p className="text-sm md:text-base font-semibold text-yellow-900 dark:text-yellow-100">
                  Mock Chart Data - Useless Token
                </p>
              </div>
              <p className="text-xs md:text-sm text-yellow-800 dark:text-yellow-200">
                Until we go live, we&apos;re showing the chart from Useless Token as a preview. After launch, the real $HAPPINESS chart will be displayed here.
              </p>
            </div>
          </motion.div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Live Chart Preview
            </h2>
            
            {/* Dexscreener Embed Styles - Smaller */}
            <style jsx>{`
              #dexscreener-embed {
                position: relative;
                width: 100%;
                padding-bottom: 60%;
                max-width: 800px;
                margin: 0 auto;
              }
              @media (min-width: 768px) {
                #dexscreener-embed {
                  padding-bottom: 50%;
                }
              }
              @media (min-width: 1400px) {
                #dexscreener-embed {
                  padding-bottom: 40%;
                }
              }
              #dexscreener-embed iframe {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                border: 0;
              }
            `}</style>
            
            {/* Dexscreener Embed */}
            <div id="dexscreener-embed">
              <iframe 
                src="https://dexscreener.com/solana/Q2sPHPdUWFMg7M7wwrQKLrn619cAucfRsmhVJffodSp?embed=1&loadChartSettings=0&tabs=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=light&theme=light&chartStyle=1&chartType=usd&interval=1"
                title="Dexscreener Chart"
                allow="clipboard-write"
              />
            </div>
          </div>
        </section>

        {/* Page Teasers Sections */}
        <div className="mt-40 md:mt-48 space-y-16 md:space-y-24">
          {/* How It Works Teaser */}
          <section className="relative">
            <GlareCard className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-orange-800 dark:text-orange-400 lowercase" style={{ fontFamily: '"Borel", cursive' }}>how it works</h2>
                  <p className="text-lg text-black dark:text-white leading-relaxed">
                    From submitting your story to appearing live on Pump.fun – discover our 7-step process that turns your application into real impact. Verified candidates, community voting, and instant airdrops.
                  </p>
                  <div className="pt-6">
                    <Link href="/how-it-works">
                      <MovingBorderButton
                        borderRadius="1.75rem"
                        containerClassName="h-12 w-auto min-w-[160px]"
                        borderClassName="bg-[radial-gradient(#ffc850_40%,transparent_60%)]"
                        className="bg-gradient-to-r from-orange-500/90 to-amber-500/90 border-orange-400/50 text-white font-semibold px-6 text-sm"
                      >
                        <span className="flex items-center gap-2">
                          Learn More
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </MovingBorderButton>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl p-8 border-2 border-orange-200 dark:border-amber-500/30">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">Submit Your Story</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">We Verify You via X DM</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">Community Votes Daily</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">Live Stream on Pump.fun</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">Instant Airdrop</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlareCard>
          </section>

          {/* Apply Teaser */}
          <section className="relative">
            <GlareCard className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="hidden md:block order-2">
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl p-8 border-2 border-orange-200 dark:border-amber-500/30">
                    <div className="text-center mb-4">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Quick & Easy Process</p>
                      <p className="text-xs text-muted-foreground mb-4">Submit your story in minutes via X verification</p>
                    </div>
                    <div className="flex items-center justify-center gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <Image
                          src="/files/cryptologos/Twitter Logo.png"
                          alt="Twitter"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                        <p className="text-xs text-muted-foreground">X DM</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Image
                          src="/files/cryptologos/Solana Logo.png"
                          alt="Solana"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                        <p className="text-xs text-muted-foreground">On-Chain</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-10 order-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-orange-800 dark:text-orange-400 lowercase" style={{ fontFamily: '"Borel", cursive' }}>apply now</h2>
                  <p className="text-lg text-black dark:text-white leading-relaxed">
                    Share your story and join the daily live charity shows. Submit your name, country, X handle, and a short video. Get verified via X DM and let the community vote for you.
                  </p>
                  <div className="pt-6">
                    <Link href="/apply">
                      <MovingBorderButton
                        borderRadius="1.75rem"
                        containerClassName="h-12 w-auto min-w-[160px]"
                        borderClassName="bg-[radial-gradient(#ffc850_40%,transparent_60%)]"
                        className="bg-gradient-to-r from-orange-500/90 to-amber-500/90 border-orange-400/50 text-white font-semibold px-6 text-sm"
                      >
                        <span className="flex items-center gap-2">
                          Apply Now
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </MovingBorderButton>
                    </Link>
                  </div>
                </div>
              </div>
            </GlareCard>
          </section>

          {/* Vote Teaser */}
          <section className="relative">
            <GlareCard className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-orange-800 dark:text-orange-400 lowercase" style={{ fontFamily: '"Borel", cursive' }}>vote today</h2>
                  <p className="text-lg text-black dark:text-white leading-relaxed">
                    Connect your wallet and vote for verified candidates. Your vote power equals your $HAPPINESS holdings. Fair, secure, and bot-protected voting that decides who appears on the daily live stream.
                  </p>
                  <div className="pt-6">
                    <Link href="/vote">
                      <MovingBorderButton
                        borderRadius="1.75rem"
                        containerClassName="h-12 w-auto min-w-[160px]"
                        borderClassName="bg-[radial-gradient(#ffc850_40%,transparent_60%)]"
                        className="bg-gradient-to-r from-orange-500/90 to-amber-500/90 border-orange-400/50 text-white font-semibold px-6 text-sm"
                      >
                        <span className="flex items-center gap-2">
                          Go Vote
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </MovingBorderButton>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl p-8 border-2 border-orange-200 dark:border-amber-500/30">
                    <div className="text-center mb-4">
                      <p className="text-2xl font-bold text-orange-600 dark:text-amber-400 mb-2">100+</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white mb-1">Verified Candidates</p>
                      <p className="text-xs text-muted-foreground">Connect wallet to vote</p>
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-4">
                      <div className="flex flex-col items-center gap-2">
                        <Image
                          src="/files/cryptologos/Jupiter Logo.png"
                          alt="Jupiter"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                        <p className="text-xs text-muted-foreground">DEX</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Image
                          src="/files/cryptologos/Raydium.png"
                          alt="Raydium"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                        <p className="text-xs text-muted-foreground">Liquidity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlareCard>
          </section>

          {/* Pool Teaser */}
          <section className="relative">
            <GlareCard className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="hidden md:block order-2">
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl p-8 border-2 border-orange-200 dark:border-amber-500/30">
                    <div className="text-center mb-4">
                      <p className="text-4xl font-bold text-orange-600 dark:text-amber-400">$170,000</p>
                      <p className="text-sm text-muted-foreground mt-2">Total Pool</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <p className="text-xs text-muted-foreground">Trading Fees</p>
                        <p className="text-xl font-bold text-orange-600 dark:text-amber-400">$125k</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Community</p>
                        <p className="text-xl font-bold text-amber-600 dark:text-yellow-400">$45k</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-10 order-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-orange-800 dark:text-orange-400 lowercase" style={{ fontFamily: '"Borel", cursive' }}>impact & pool</h2>
                  <p className="text-lg text-black dark:text-white leading-relaxed">
                    Watch the Happiness Pool grow in real-time and explore our impact archive. See real stories of lives changed, track trading fees, community boosts, and discover how every transaction contributes to saving lives through daily charity shows.
                  </p>
                  <div className="pt-6">
                    <Link href="/pool">
                      <MovingBorderButton
                        borderRadius="1.75rem"
                        containerClassName="h-12 w-auto min-w-[160px]"
                        borderClassName="bg-[radial-gradient(#ffc850_40%,transparent_60%)]"
                        className="bg-gradient-to-r from-orange-500/90 to-amber-500/90 border-orange-400/50 text-white font-semibold px-6 text-sm"
                      >
                        <span className="flex items-center gap-2">
                          View Impact
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </MovingBorderButton>
                    </Link>
                  </div>
                </div>
              </div>
            </GlareCard>
          </section>

          {/* Analysis Teaser */}
          <section className="relative">
            <GlareCard className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-orange-800 dark:text-orange-400 lowercase" style={{ fontFamily: '"Borel", cursive' }}>scientific analysis</h2>
                  <p className="text-lg text-black dark:text-white leading-relaxed">
                    Data-driven insights into exponential growth models, projected creator rewards, viral volume drivers, and real-world impact. See what $10M daily volume means in terms of lives saved.
                  </p>
                  <div className="pt-6">
                    <Link href="/analysis">
                      <MovingBorderButton
                        borderRadius="1.75rem"
                        containerClassName="h-12 w-auto min-w-[160px]"
                        borderClassName="bg-[radial-gradient(#ffc850_40%,transparent_60%)]"
                        className="bg-gradient-to-r from-orange-500/90 to-amber-500/90 border-orange-400/50 text-white font-semibold px-6 text-sm"
                      >
                        <span className="flex items-center gap-2">
                          Read More
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </MovingBorderButton>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl p-8 border-2 border-orange-200 dark:border-amber-500/30">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Day 7</span>
                        <span className="text-lg font-bold text-orange-600 dark:text-amber-400">$0.00286</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Day 30</span>
                        <span className="text-lg font-bold text-orange-600 dark:text-amber-400">$0.091</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Day 90</span>
                        <span className="text-lg font-bold text-amber-600 dark:text-yellow-400">$2.46</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlareCard>
          </section>

          {/* Live Teaser */}
          <section className="relative">
            <GlareCard className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="hidden md:block order-2">
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl p-8 border-2 border-orange-200 dark:border-amber-500/30">
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center mb-3">
                        <Image
                          src="/files/cryptologos/PumpFun Logo.png"
                          alt="Pump.fun"
                          width={70}
                          height={70}
                          className="object-contain"
                        />
                      </div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white mb-1">Daily Live Streams</p>
                      <p className="text-xs text-muted-foreground mb-3">Every day at 8 PM</p>
                      <p className="text-xs text-muted-foreground">Real-time polls & instant airdrops</p>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="flex flex-col items-center gap-1">
                        <Image
                          src="/files/cryptologos/Telegram Logo.png"
                          alt="Telegram"
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                        <p className="text-xs text-muted-foreground">Chat</p>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Image
                          src="/files/cryptologos/Reddit Logo.png"
                          alt="Reddit"
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                        <p className="text-xs text-muted-foreground">Community</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-10 order-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-orange-800 dark:text-orange-400 lowercase" style={{ fontFamily: '"Borel", cursive' }}>live stream</h2>
                  <p className="text-lg text-black dark:text-white leading-relaxed">
                    Watch the daily charity shows live on Pump.fun. Top 6-9 verified candidates appear on camera, real-time polls decide the winners, and instant airdrops happen live. Join thousands of viewers making real impact.
                  </p>
                  <div className="pt-6">
                    <Link href="/live">
                      <MovingBorderButton
                        borderRadius="1.75rem"
                        containerClassName="h-12 w-auto min-w-[160px]"
                        borderClassName="bg-[radial-gradient(#ffc850_40%,transparent_60%)]"
                        className="bg-gradient-to-r from-orange-500/90 to-amber-500/90 border-orange-400/50 text-white font-semibold px-6 text-sm"
                      >
                        <span className="flex items-center gap-2">
                          Watch Live
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </MovingBorderButton>
                    </Link>
                  </div>
                </div>
              </div>
            </GlareCard>
          </section>

          {/* Transparency Teaser */}
          <section className="relative">
            <GlareCard className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-orange-800 dark:text-orange-400 lowercase" style={{ fontFamily: '"Borel", cursive' }}>transparency</h2>
                  <p className="text-lg text-black dark:text-white leading-relaxed">
                    100% on-chain verification. View all transactions, past winners, and see exactly how every dollar flows from trading fees to charity. Complete transparency, verifiable on Solscan.
                  </p>
                  <div className="pt-6">
                    <Link href="/transparency">
                      <MovingBorderButton
                        borderRadius="1.75rem"
                        containerClassName="h-12 w-auto min-w-[160px]"
                        borderClassName="bg-[radial-gradient(#ffc850_40%,transparent_60%)]"
                        className="bg-gradient-to-r from-orange-500/90 to-amber-500/90 border-orange-400/50 text-white font-semibold px-6 text-sm"
                      >
                        <span className="flex items-center gap-2">
                          View Transparency
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </MovingBorderButton>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl p-8 border-2 border-orange-200 dark:border-amber-500/30">
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center mb-3">
                        <Image
                          src="/files/cryptologos/Solscan.png"
                          alt="Solscan"
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                      <p className="text-2xl font-bold text-orange-600 dark:text-amber-400 mb-1">100%</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white mb-1">On-Chain Verified</p>
                      <p className="text-xs text-muted-foreground">All transactions public & verifiable</p>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="flex flex-col items-center gap-1">
                        <Image
                          src="/files/cryptologos/CoinMarketCap Logo.png"
                          alt="CoinMarketCap"
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                        <p className="text-xs text-muted-foreground">CMC</p>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Image
                          src="/files/cryptologos/Coingecko Logo.png"
                          alt="CoinGecko"
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                        <p className="text-xs text-muted-foreground">Gecko</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlareCard>
          </section>
        </div>
      </div>

      {/* Floating Lore Icon */}
      <Link
        href="/lore"
        className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-50 group"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-2xl flex items-center justify-center cursor-pointer border-4 border-orange-300 hover:border-orange-400 transition-all duration-300"
        >
          <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-white" />
          
          {/* Glow Effect on Hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-orange-400 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-black/90 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap backdrop-blur-sm border border-orange-500/30">
              The Legend of $HAPPINESS
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-black/90"></div>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
    </>
  );
}

