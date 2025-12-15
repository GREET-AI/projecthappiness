"use client";

import { useRef } from "react";
import { LivePoolTicker } from "@/components/live-pool-ticker";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Particles } from "@/components/magicui/particles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlareCard } from "@/components/ui/glare-card";
import { TrendingUp, Zap, Heart, Calendar, MapPin, ExternalLink, Video, Trophy, Users, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Mock data for impact archive
const impactStories = [
  {
    id: 1,
    name: "Maria Santos",
    country: "Philippines",
    xHandle: "@MariaHope2025",
    date: "2025-01-15",
    livestreamUrl: "https://pump.fun/stream/jan-15-2025",
    livestreamTitle: "Daily Charity Show - Jan 15, 2025",
    amountSOL: 2.5,
    amountUSDC: 450,
    story: "Single mother of three, lost her job during the pandemic. Struggling to pay rent and feed her children. Maria applied through our platform, shared her story, and the community voted her as one of the top candidates. She appeared live on Pump.fun and won the daily poll.",
    whatBought: "Rent for 2 months ($400) + Groceries ($50)",
    voteCount: 1247,
    rank: 1,
    totalCandidates: 9,
    winningPost: {
      text: "I can't believe it! Thanks to $HAPPINESS and this amazing community, I just received 2.5 SOL! This will cover our rent for 2 months and groceries. My kids are crying happy tears. You can't buy happiness, but you can buy $HAPPINESS and change lives! 🎉\n\n@projecthappysol\nprojecthappiness.xyz\n\n#HAPPINESS #ProjectHappiness",
      image: "/files/chad.png", // Happy photo after winning
      likes: 342,
      retweets: 89,
      replies: 23,
      timestamp: "2025-01-15T20:30:00Z",
    },
    socialPost: "https://x.com/MariaHope2025/status/1234567890",
    image: "/files/wojak.png", // Placeholder
    verified: true,
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    country: "Egypt",
    xHandle: "@AhmedNewStart",
    date: "2025-01-14",
    livestreamUrl: "https://pump.fun/stream/jan-14-2025",
    livestreamTitle: "Daily Charity Show - Jan 14, 2025",
    amountSOL: 3.0,
    amountUSDC: 540,
    story: "Medical student who couldn't afford tuition. Dreams of becoming a doctor to help his community. Ahmed's story touched thousands of hearts. He received the most votes in the community poll and won the top prize.",
    whatBought: "Tuition payment ($500) + Books ($40)",
    voteCount: 2156,
    rank: 1,
    totalCandidates: 8,
    winningPost: {
      text: "Dreams do come true! 🎓 Just won 3 SOL from $HAPPINESS! This covers my tuition and books. I'm one step closer to becoming a doctor. Thank you to everyone who voted! This is what real impact looks like.\n\n@projecthappysol\nprojecthappiness.xyz\n\n#HAPPINESS #MedicalStudent",
      image: "/files/chad.png", // Photo with books/university
      likes: 521,
      retweets: 156,
      replies: 67,
      timestamp: "2025-01-14T20:45:00Z",
    },
    socialPost: "https://x.com/AhmedNewStart/status/1234567891",
    image: "/files/chad.png", // Placeholder
    verified: true,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    country: "USA",
    xHandle: "@SarahRebuilds",
    date: "2025-01-13",
    livestreamUrl: "https://pump.fun/stream/jan-13-2025",
    livestreamTitle: "Daily Charity Show - Jan 13, 2025",
    amountSOL: 1.8,
    amountUSDC: 324,
    story: "Fled domestic violence with her two children. Starting over with nothing but hope. Sarah's courage inspired the community. She won second place in the daily poll and received enough to secure a safe home for her family.",
    whatBought: "Security deposit for apartment ($300) + Basic furniture ($24)",
    voteCount: 892,
    rank: 2,
    totalCandidates: 7,
    winningPost: {
      text: "New beginning! 🏠 Received 1.8 SOL from $HAPPINESS. This is my security deposit and first furniture. My kids and I are safe now. Thank you to the community for believing in us.\n\n@projecthappysol\nprojecthappiness.xyz\n\n#HAPPINESS #NewStart",
      image: "/files/chad.png", // Photo of new home/apartment
      likes: 287,
      retweets: 94,
      replies: 45,
      timestamp: "2025-01-13T21:00:00Z",
    },
    socialPost: "https://x.com/SarahRebuilds/status/1234567892",
    image: "/files/wojak.png", // Placeholder
    verified: true,
  },
  {
    id: 4,
    name: "Raj Patel",
    country: "India",
    xHandle: "@RajDreams",
    date: "2025-01-12",
    livestreamUrl: "https://pump.fun/stream/jan-12-2025",
    livestreamTitle: "Daily Charity Show - Jan 12, 2025",
    amountSOL: 2.2,
    amountUSDC: 396,
    story: "Young entrepreneur whose small business was destroyed by floods. Needs capital to rebuild. Raj's determination resonated with voters. He won first place and is now rebuilding his business with the community's support.",
    whatBought: "Business equipment ($350) + Initial inventory ($46)",
    voteCount: 1634,
    rank: 1,
    totalCandidates: 9,
    winningPost: {
      text: "Rebuilding starts now! 💪 Won 2.2 SOL from $HAPPINESS! My business is coming back stronger. This community is incredible. Real people, real impact.\n\n@projecthappysol\nprojecthappiness.xyz\n\n#HAPPINESS #Entrepreneur",
      image: "/files/chad.png", // Photo of business/workshop
      likes: 412,
      retweets: 123,
      replies: 34,
      timestamp: "2025-01-12T20:15:00Z",
    },
    socialPost: "https://x.com/RajDreams/status/1234567893",
    image: "/files/chad.png", // Placeholder
    verified: true,
  },
];

export default function ImpactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const feesRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const totalRef = useRef<HTMLDivElement>(null);

  // Values set to 0 - will be connected via API within 24 hours after launch
  const tradingFees = 0;
  const communityBoost = 0;
  const total = tradingFees + communityBoost;

  return (
    <div className="container mx-auto px-4 py-16">
      {/* API Connection Notice */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 dark:from-yellow-600 dark:via-amber-600 dark:to-yellow-700 rounded-xl p-4 text-center shadow-lg border-2 border-yellow-600 dark:border-yellow-500">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">🔌</span>
            <p className="text-sm md:text-base font-semibold text-yellow-900 dark:text-yellow-100">
              API Connection Coming Soon
            </p>
          </div>
          <p className="text-xs md:text-sm text-yellow-800 dark:text-yellow-200">
            Real-time pool data will be connected via API within the first 24 hours after launch.
          </p>
        </div>
      </div>

      {/* Page Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-800 dark:text-orange-400" style={{ fontFamily: '"Borel", cursive' }}>
          Impact & Happiness Pool
        </h1>
        <p className="text-muted-foreground text-lg">
          Real-time tracking of funds collected for daily charity shows
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Main Pool Display */}
        <div className="mb-16">
          <LivePoolTicker tradingFees={tradingFees} communityBoost={communityBoost} />
        </div>

        {/* Animated Beam Visualization */}
        <div
          ref={containerRef}
          className="relative h-[400px] w-full rounded-xl border border-border bg-card/50 backdrop-blur-sm mb-16"
        >
          <Particles quantity={50} className="absolute inset-0" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Trading Fees Source */}
            <div
              ref={feesRef}
              className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Card className="w-48 border-2 border-primary/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <CardTitle className="text-sm">Trading Fees</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    <NumberTicker value={tradingFees} prefix="$" decimals={0} />
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Community Boost Source */}
            <div
              ref={communityRef}
              className="absolute right-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Card className="w-48 border-2 border-[#06b6d4]/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-[#06b6d4]" />
                    <CardTitle className="text-sm">Community</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-[#06b6d4]">
                    <NumberTicker value={communityBoost} prefix="$" decimals={0} />
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Total Pool */}
            <div
              ref={totalRef}
              className="absolute bottom-1/4 left-1/2 -translate-x-1/2"
            >
              <Card className="w-64 border-2 border-orange-500/50 bg-gradient-to-br from-orange-500/10 to-primary/10">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="h-6 w-6 text-orange-500" />
                    <CardTitle className="text-lg">Total Pool</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-center text-orange-500">
                    <NumberTicker value={total} prefix="$" decimals={0} />
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Animated Beams */}
            {containerRef.current && feesRef.current && totalRef.current && (
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={feesRef}
                toRef={totalRef}
                curvature={-50}
                duration={3}
                startYOffset={0}
                endYOffset={-20}
              />
            )}
            {containerRef.current && communityRef.current && totalRef.current && (
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={communityRef}
                toRef={totalRef}
                curvature={50}
                duration={3}
                delay={0.5}
                startYOffset={0}
                endYOffset={-20}
              />
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                Daily Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                <NumberTicker value={0} prefix="$" decimals={0} />
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                <NumberTicker value={0} prefix="$" decimals={0} />
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                All Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                <NumberTicker value={0} prefix="$" decimals={0} />
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Impact Archive Section */}
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-800 dark:text-orange-400 mb-4" style={{ fontFamily: '"Borel", cursive' }}>
              Impact Archive
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories, real impact. See how $HAPPINESS is changing lives around the world.
            </p>
          </div>

          {/* Mock Data Warning */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 dark:from-yellow-600 dark:via-amber-600 dark:to-yellow-700 rounded-xl p-4 text-center shadow-lg border-2 border-yellow-600 dark:border-yellow-500">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xl">⚠️</span>
                <p className="text-sm md:text-base font-semibold text-yellow-900 dark:text-yellow-100">
                  Mock Data - Impact Archive
                </p>
              </div>
              <p className="text-xs md:text-sm text-yellow-800 dark:text-yellow-200">
                All stories, amounts, and social media posts shown here are mock data for demonstration purposes. Real impact stories will be added after launch.
              </p>
            </div>
          </div>

          {/* Archive Cards - Full Width, One Per Row */}
          <div className="space-y-8">
            {impactStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlareCard className="p-6 md:p-10 w-full">
                  <div className="space-y-6">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Profile Image */}
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-orange-300 dark:border-orange-600 flex-shrink-0">
                        <Image
                          src={story.image}
                          alt={story.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Name and Basic Info */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                          <div>
                            <h3 className="text-3xl md:text-4xl font-bold text-orange-800 dark:text-orange-400 mb-2">
                              {story.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{story.country}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(story.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                              {story.verified && (
                                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                  <span>Verified via X DM</span>
                                </div>
                              )}
                            </div>
                            <Link
                              href={story.socialPost}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orange-600 dark:text-orange-400 hover:underline text-base flex items-center gap-1"
                            >
                              {story.xHandle}
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </div>

                          {/* Rank Badge */}
                          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg">
                            <Trophy className="h-5 w-5" />
                            <span className="font-bold">#{story.rank} of {story.totalCandidates}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Story */}
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                      <p className="text-black dark:text-white leading-relaxed text-lg">
                        {story.story}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Amount Given */}
                      <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Amount Given:</p>
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {story.amountSOL} SOL
                          </span>
                          <span className="text-lg text-gray-500 dark:text-gray-500">
                            ≈ ${story.amountUSDC} USDC
                          </span>
                        </div>
                      </div>

                      {/* Vote Count */}
                      <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Community Votes:</p>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {story.voteCount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* What They Bought */}
                      <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Used For:</p>
                        <p className="text-black dark:text-white font-semibold">
                          {story.whatBought}
                        </p>
                      </div>
                    </div>

                    {/* Livestream Link */}
                    <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Video className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                          <div>
                            <p className="font-semibold text-orange-800 dark:text-orange-400">Winning Livestream</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{story.livestreamTitle}</p>
                          </div>
                        </div>
                        <Link
                          href={story.livestreamUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all"
                        >
                          Watch Stream
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Social Media Post Preview */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-200 dark:border-gray-800 overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Winning Post on X
                        </p>
                      </div>
                      <div className="p-4">
                        {/* Post Header */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-300 dark:border-orange-600">
                            <Image
                              src={story.image}
                              alt={story.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-black dark:text-white">{story.name}</span>
                              <span className="text-gray-500 dark:text-gray-400">{story.xHandle}</span>
                              <span className="text-gray-400 dark:text-gray-500">·</span>
                              <span className="text-gray-500 dark:text-gray-400 text-sm">
                                {new Date(story.winningPost.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Post Text */}
                        <div className="text-black dark:text-white mb-4 leading-relaxed whitespace-pre-line">
                          {story.winningPost.text.split('\n').map((line, idx) => {
                            // Check if line contains @projecthappysol or projecthappiness.xyz
                            if (line.includes('@projecthappysol')) {
                              return (
                                <p key={idx} className="mb-1">
                                  {line.split('@projecthappysol').map((part, i) => (
                                    <span key={i}>
                                      {part}
                                      {i < line.split('@projecthappysol').length - 1 && (
                                        <Link
                                          href="https://x.com/projecthappysol"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-orange-600 dark:text-orange-400 hover:underline font-semibold"
                                        >
                                          @projecthappysol
                                        </Link>
                                      )}
                                    </span>
                                  ))}
                                </p>
                              );
                            }
                            if (line.includes('projecthappiness.xyz')) {
                              return (
                                <p key={idx} className="mb-1">
                                  {line.split('projecthappiness.xyz').map((part, i) => (
                                    <span key={i}>
                                      {part}
                                      {i < line.split('projecthappiness.xyz').length - 1 && (
                                        <Link
                                          href="https://projecthappiness.xyz"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-orange-600 dark:text-orange-400 hover:underline font-semibold"
                                        >
                                          projecthappiness.xyz
                                        </Link>
                                      )}
                                    </span>
                                  ))}
                                </p>
                              );
                            }
                            return <p key={idx} className="mb-1">{line}</p>;
                          })}
                        </div>

                        {/* Post Image - Like Twitter/X Feed */}
                        {story.winningPost.image && (
                          <div className="mb-4 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                            <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800">
                              <Image
                                src={story.winningPost.image}
                                alt={`${story.name}'s winning post`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}

                        {/* Post Stats */}
                        <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{story.winningPost.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V7.12L1 6l3.75-2.21zm16.5 0L23 6l-1.5 1.12v7.38c0 .97-.784 1.75-1.75 1.75H15v2.25h4.25c2.347 0 4.25-1.9 4.25-4.25V8.41l1.706-1.82-4.603-4.3zm0 2.62L19.97 8 18 9.88V7.12zm-15 0L4.97 8 3 9.88V7.12z"/>
                            </svg>
                            <span>{story.winningPost.retweets}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{story.winningPost.likes}</span>
                          </div>
                        </div>

                        {/* View Full Post Link */}
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <Link
                            href={story.socialPost}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 dark:text-orange-400 hover:underline text-sm flex items-center gap-2 font-semibold"
                          >
                            View full post on X
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlareCard>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              More impact stories coming soon after launch. Every day, new lives are changed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
