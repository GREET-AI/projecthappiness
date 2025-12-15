"use client";

import { useState } from "react";
import { FileText, MessageSquare, Share2, Vote, Video, BarChart3, Gift, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { SparklesCore } from "@/components/ui/sparkles";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";

const loadingStates = [
  {
    text: "Submit Your Story",
    description: "Name, country, @X handle (just type it), short video + story",
    icon: FileText,
    details: "Start your journey by submitting your personal story. Fill out the application form with your name, country, and X (Twitter) handle. Record a short video (max 60 seconds) explaining your situation and why you need help. Write a compelling story (max 400 characters) that captures your situation. This is your chance to make a real impact and potentially change your life.",
  },
  {
    text: "We Verify You via X DM",
    description: "Real humans only, no bots",
    icon: MessageSquare,
    details: "After you submit your application, our team will reach out to you via X (Twitter) direct message to verify your identity. We check that you&apos;re a real person, not a bot, and that your story is genuine. This verification process ensures fairness and prevents abuse of the system. Only verified applicants can proceed to the next stage.",
  },
  {
    text: "Your Story Goes Live",
    description: "With auto-share button for X",
    icon: Share2,
    details: "Once verified, your story is published on our platform for the community to see. Your video, story, and profile information become visible to all voters. We provide you with an auto-share button for X (Twitter) so you can easily promote your story and ask for votes. The more people see your story, the better your chances of advancing.",
  },
  {
    text: "Community Votes Daily",
    description: "Only verified holders, fair & bot-free",
    icon: Vote,
    details: "Every day, the community votes on all verified applications. Only $HAPPINESS holders can vote - connect your wallet and hold at least 100 tokens. Your vote power equals floor(balance / 100), so 100 tokens = 1 vote, 500 tokens = 5 votes. Each wallet can vote once per candidate per day. Advanced bot protection with reCAPTCHA v3 ensures fairness. The voting is transparent and real-time, with live vote counts displayed on each candidate's card. At the end of each day, the top 6-9 candidates with the most votes advance to the live stream stage.",
  },
  {
    text: "You Join the Live Stream on Pump.fun",
    description: "Top 6–9 verified people",
    icon: Video,
    details: "If you&apos;re among the top vote-getters, you&apos;ll be invited to join our daily live stream on Pump.fun. This is where the magic happens! You&apos;ll appear live on camera alongside other top candidates. The stream is broadcast to our entire community, giving you a platform to share your story directly with thousands of viewers.",
  },
  {
    text: "Live Polls Decide Everything",
    description: "Real-time voting during stream",
    icon: BarChart3,
    details: "During the live stream, real-time polls are conducted. Viewers watching the stream can vote instantly for their favorite candidates. These live polls are the final deciding factor. The voting happens in real-time, creating an exciting and transparent process. Everyone can see the results as they come in, making it a fair and democratic system.",
  },
  {
    text: "Instant Airdrop",
    description: "Winners get SOL/$HAPPINESS live on camera",
    icon: Gift,
    details: "The winners receive their airdrop instantly, live on camera! This happens in real-time during the stream, so everyone can see the moment when lives are changed. Winners receive SOL (Solana) and $HAPPINESS tokens directly to their wallets. The entire process is transparent, recorded, and verifiable on the blockchain.",
  },
];

export default function HowItWorksPage() {

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
            How It Works
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
                . But with these{" "}
                <Highlight className="text-black dark:text-white bg-gradient-to-r from-orange-400 to-amber-500">
                  7 simple steps
                </Highlight>
                , you can join the daily live shows and prove them wrong — one{" "}
                <Highlight className="text-black dark:text-white bg-gradient-to-r from-purple-500 to-pink-500">
                  $HAPPINESS
                </Highlight>{" "}
                transaction at a time. 🚀
              </motion.h2>
            </HeroHighlight>
            
            {/* Sparkles Effect */}
            <div className="w-full h-40 relative -mt-20">
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px w-1/4" />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFC850"
              />
              <div className="absolute inset-0 w-full h-full bg-transparent [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </div>
          
          <Link href="/apply">
            <Button className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>

        {/* Detailed Step Cards */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Detailed Process
          </h2>
          
          {/* Evervault Cards Grid - 2 columns */}
          <div className="grid md:grid-cols-2 gap-6">
            {loadingStates.map((state, index) => {
              const StepIcon = state.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-center"
                >
                  <div className="border border-orange-300/[0.2] dark:border-orange-500/[0.2] flex flex-col items-start w-full p-6 relative min-h-[35rem] bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-2xl">
                    <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-orange-400 text-orange-600" />
                    <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-orange-400 text-orange-600" />
                    <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-orange-400 text-orange-600" />
                    <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-orange-400 text-orange-600" />
                    
                    {/* Evervault Card Effect */}
                    <div className="w-full h-48 mb-6">
                      <EvervaultCard text={`Step ${index + 1}`} className="w-full h-full" />
                    </div>
                    
                    {/* Step Info */}
                    <div className="w-full space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400">
                          <StepIcon className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-bold dark:text-white text-black">
                          {state.text}
                        </h2>
                      </div>
                      
                      <p className="text-sm border font-light dark:border-orange-500/[0.2] border-orange-300/[0.2] rounded-full text-black dark:text-white px-3 py-1.5 inline-block">
                        {state.description}
                      </p>
                      
                      {/* Detailed Description */}
                      <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-700">
                        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                          {state.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 dark:from-orange-950/50 dark:via-amber-950/50 dark:to-orange-950/50 rounded-2xl p-8 border-2 border-orange-200 dark:border-orange-800 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#c67e15] dark:text-orange-400">
              Ready to Change Your Life?
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of people who have already applied. Your story matters, and with $HAPPINESS, 
              we can make a real difference together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-8 py-6 text-lg font-semibold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Submit Your Story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/vote">
                <Button variant="outline" className="px-8 py-6 text-lg font-semibold w-full sm:w-auto border-2 border-orange-500 dark:border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10">
                  Vote for Candidates
                  <Vote className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

