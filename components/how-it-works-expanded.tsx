"use client";

import { useState } from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { FileText, MessageSquare, Share2, Vote, Video, BarChart3, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { cn } from "@/lib/utils";

const loadingStates = [
  {
    text: "Submit Your Story",
    description: "Name, country, @X handle (just type it), short video + story",
    icon: FileText,
  },
  {
    text: "We Verify You via X DM",
    description: "Real humans only, no bots",
    icon: MessageSquare,
  },
  {
    text: "Your Story Goes Live",
    description: "With auto-share button for X",
    icon: Share2,
  },
  {
    text: "Community Votes Daily",
    description: "Top entries advance",
    icon: Vote,
  },
  {
    text: "You Join the Live Stream on Pump.fun",
    description: "Top 6–9 verified people",
    icon: Video,
  },
  {
    text: "Live Polls Decide Everything",
    description: "Real-time voting during stream",
    icon: BarChart3,
  },
  {
    text: "Instant Airdrop",
    description: "Winners get SOL/$HAPPINESS live on camera",
    icon: Gift,
  },
];

export function HowItWorksExpanded() {
  const [loading, setLoading] = useState(true);

  return (
    <section className="relative py-8 md:py-12 overflow-hidden">
      {/* Background Particles */}
      <Particles
        quantity={50}
        className="absolute inset-0"
        color="rgba(6, 182, 212, 0.2)"
      />

      {/* Gradient Overlays - Light Mode: Deep Blue + Green, Dark Mode: Neon Cyan + Pink */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 via-green-600/20 to-blue-900/20 dark:from-cyan-400/30 dark:via-pink-500/30 dark:to-cyan-500/30 pointer-events-none" />
      
            {/* Glow Effects - Light: Deep Blue + Green, Dark: Neon Cyan + Pink */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-700/20 dark:bg-cyan-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-600/20 dark:bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-green-600 to-blue-900 dark:from-cyan-400 dark:via-pink-500 dark:to-cyan-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Follow these 7 steps to join the daily live charity shows and make real impact
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[400px] flex items-center justify-center">
            <MultiStepLoader
              loadingStates={loadingStates.map(state => ({
                text: state.text,
                description: state.description,
              }))}
              loading={loading}
              duration={3000}
              loop={true}
            />
          </div>

          {/* Step Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {loadingStates.map((state, index) => {
              const Icon = state.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                    className={cn(
                    "relative group p-6 rounded-xl border-2 backdrop-blur-sm transition-all duration-300",
                    "bg-white/80 dark:bg-black/80",
                    "border-blue-400 dark:border-cyan-500/50",
                    "hover:border-blue-600 dark:hover:border-cyan-400",
                    "hover:shadow-lg hover:shadow-blue-600/30 dark:hover:shadow-cyan-400/40 hover:shadow-pink-500/20 dark:hover:shadow-pink-500/30"
                  )}
                >
                  {/* Glow Effect on Hover - Light: Deep Blue + Green, Dark: Neon Cyan + Pink */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-700/10 via-green-600/10 to-blue-900/10 dark:from-cyan-400/20 dark:via-pink-500/20 dark:to-cyan-500/20 blur-xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn(
                        "p-3 rounded-lg",
                        "bg-blue-100 dark:bg-cyan-500/20",
                        "text-blue-700 dark:text-cyan-400"
                      )}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className={cn(
                        "text-2xl font-bold",
                        "text-blue-700 dark:text-cyan-400"
                      )}>
                        {index + 1}
                      </span>
                    </div>
                    <h3 className={cn(
                      "text-xl font-bold mb-2",
                      "text-blue-900 dark:text-cyan-300"
                    )}>
                      {state.text}
                    </h3>
                    <p className={cn(
                      "text-sm",
                      "text-blue-800 dark:text-cyan-400/90"
                    )}>
                      {state.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

