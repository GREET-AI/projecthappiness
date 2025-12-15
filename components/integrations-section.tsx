"use client";

import { motion } from "framer-motion";
import { GlareCard } from "@/components/ui/glare-card";
import { Particles } from "@/components/magicui/particles";
import { Wallet, TrendingUp, Wrench, Share2, ExternalLink, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Integration {
  name: string;
  category: "wallet" | "dex" | "tool" | "social" | "charity";
  icon?: React.ReactNode;
  logoPath?: string;
  url?: string;
  description?: string;
}

const integrations: Integration[] = [
  // Wallets
  { name: "Phantom", category: "wallet", logoPath: "/files/cryptologos/Phantom Logo.png", url: "https://phantom.app" },
  { name: "Solflare", category: "wallet", icon: <Wallet className="h-8 w-8" />, url: "https://solflare.com" },
  { name: "Backpack", category: "wallet", icon: <Wallet className="h-8 w-8" />, url: "https://backpack.app" },
  
  // DEXs
  { name: "Jupiter", category: "dex", logoPath: "/files/cryptologos/Jupiter Logo.png", url: "https://jup.ag" },
  { name: "Raydium", category: "dex", logoPath: "/files/cryptologos/Raydium.png", url: "https://raydium.io" },
  { name: "Orca", category: "dex", logoPath: "/files/cryptologos/orca.png", url: "https://www.orca.so" },
  { name: "Pump.fun", category: "dex", logoPath: "/files/cryptologos/PumpFun Logo.png", url: "https://pump.fun" },
  
  // Tools
  { name: "Dexscreener", category: "tool", logoPath: "/files/cryptologos/Dexscreener Logo.png", url: "https://dexscreener.com" },
  { name: "Solscan", category: "tool", logoPath: "/files/cryptologos/Solscan.png", url: "https://solscan.io" },
  { name: "Birdeye", category: "tool", icon: <Wrench className="h-8 w-8" />, url: "https://birdeye.so" },
  { name: "CoinGecko", category: "tool", logoPath: "/files/cryptologos/Coingecko Logo.png", url: "https://coingecko.com" },
  { name: "CoinMarketCap", category: "tool", logoPath: "/files/cryptologos/CoinMarketCap Logo.png", url: "https://coinmarketcap.com" },
  
  // Social
  { name: "X (Twitter)", category: "social", logoPath: "/files/cryptologos/Twitter Logo.png", url: "https://twitter.com" },
  { name: "Telegram", category: "social", logoPath: "/files/cryptologos/Telegram Logo.png", url: "https://telegram.org" },
  { name: "Discord", category: "social", icon: <Share2 className="h-8 w-8" />, url: "https://discord.com" },
  
  // Charity Platforms
  { name: "The Giving Block", category: "charity", icon: <Heart className="h-8 w-8" />, url: "https://thegivingblock.com" },
  { name: "Crypto for Charity", category: "charity", icon: <Heart className="h-8 w-8" />, url: "https://www.cryptoforcharity.io" },
];

const categoryColors = {
  wallet: "from-purple-500/20 to-purple-600/20",
  dex: "from-blue-500/20 to-blue-600/20",
  tool: "from-green-500/20 to-green-600/20",
  social: "from-pink-500/20 to-pink-600/20",
  charity: "from-red-500/20 to-red-600/20",
};

const categoryLabels = {
  wallet: "Wallets",
  dex: "DEXs",
  tool: "Tools",
  social: "Social",
  charity: "Charity",
};

export function IntegrationsSection() {
  // Duplicate arrays for seamless infinite scroll
  const allIntegrations = [...integrations, ...integrations];

  return (
    <section className="relative mt-40 md:mt-48 mb-16 py-20 overflow-hidden">
      {/* Background Particles */}
      <Particles
        quantity={30}
        className="absolute inset-0"
        color="rgba(255, 200, 80, 0.3)"
      />
      
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 bg-clip-text text-transparent">
            Integrations & Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seamlessly connect with the Solana ecosystem. Trade, track, and interact with $HAPPINESS across all major platforms.
          </p>
        </motion.div>

        {/* Infinite Moving Cards Container */}
        <div className="relative">
          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

          {/* Infinite Scroll Row 1 - Left to Right */}
          <div className="overflow-hidden mb-8">
            <motion.div
              className="flex gap-6"
              style={{ width: "max-content" }}
              animate={{
                x: [0, -((192 + 24) * integrations.length)], // 192px (w-48) + 24px (gap-6) per card
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {allIntegrations.map((integration, index) => (
                <motion.div
                  key={`${integration.name}-${index}`}
                  className="flex-shrink-0 w-48"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={integration.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className="w-48 h-32">
                      <GlareCard className="flex flex-col items-center justify-center gap-3 p-4 group cursor-pointer h-full">
                        <div className={cn(
                          "p-3 rounded-lg bg-gradient-to-br transition-all duration-300 group-hover:scale-110 flex items-center justify-center",
                          categoryColors[integration.category]
                        )}>
                          {integration.logoPath ? (
                            <Image
                              src={integration.logoPath}
                              alt={integration.name}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          ) : (
                            <div className="text-white">
                              {integration.icon}
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-sm text-white">{integration.name}</h3>
                          <span className="text-xs text-white/70">
                            {categoryLabels[integration.category]}
                          </span>
                        </div>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 text-orange-500" />
                      </GlareCard>
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Infinite Scroll Row 2 - Right to Left (Reverse) */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              style={{ width: "max-content" }}
              animate={{
                x: [-((192 + 24) * integrations.length), 0], // Start from negative, move to 0
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 45,
                  ease: "linear",
                },
              }}
            >
              {allIntegrations.slice().reverse().map((integration, index) => (
                <motion.div
                  key={`reverse-${integration.name}-${index}`}
                  className="flex-shrink-0 w-48"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={integration.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className="w-48 h-32">
                      <GlareCard className="flex flex-col items-center justify-center gap-3 p-4 group cursor-pointer h-full [aspect-ratio:auto]">
                        <div className={cn(
                          "p-3 rounded-lg bg-gradient-to-br transition-all duration-300 group-hover:scale-110 flex items-center justify-center",
                          categoryColors[integration.category]
                        )}>
                          {integration.logoPath ? (
                            <Image
                              src={integration.logoPath}
                              alt={integration.name}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          ) : (
                            <div className="text-white">
                              {integration.icon}
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-sm text-white">{integration.name}</h3>
                          <span className="text-xs text-white/70">
                            {categoryLabels[integration.category]}
                          </span>
                        </div>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 text-amber-500" />
                      </GlareCard>
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Category Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded-full bg-gradient-to-br", categoryColors[key as keyof typeof categoryColors])} />
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

