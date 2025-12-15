"use client";

import { NumberTicker } from "./magicui/number-ticker";
import { Particles } from "./magicui/particles";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface LivePoolTickerProps {
  tradingFees: number;
  communityBoost: number;
}

export function LivePoolTicker({
  tradingFees,
  communityBoost,
}: LivePoolTickerProps) {
  const total = tradingFees + communityBoost;

  return (
    <Card className="relative overflow-hidden border-2 border-orange-300 dark:border-amber-500/50 bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-yellow-50/80 dark:from-orange-950/80 dark:via-amber-950/60 dark:to-yellow-950/80 shadow-xl">
      <Particles
        quantity={30}
        className="absolute inset-0"
        color="rgba(255, 200, 80, 0.3)"
      />
      <CardContent className="relative z-10 p-8">
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm font-medium text-orange-700 dark:text-amber-300 uppercase tracking-wide">
              Live Happiness Pool
            </p>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
              <NumberTicker value={total} prefix="$" decimals={0} />
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border-2 border-orange-200 dark:border-amber-500/30 bg-white/60 dark:bg-black/40 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium text-orange-700 dark:text-amber-300 uppercase tracking-wide">From Trading Fees</p>
              <p className="mt-1 text-2xl font-bold text-orange-600 dark:text-amber-400">
                <NumberTicker value={tradingFees} prefix="$" decimals={0} />
              </p>
            </div>
            <div className="rounded-lg border-2 border-amber-200 dark:border-yellow-500/30 bg-white/60 dark:bg-black/40 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium text-amber-700 dark:text-yellow-300 uppercase tracking-wide">Community Boost</p>
              <p className="mt-1 text-2xl font-bold text-amber-600 dark:text-yellow-400">
                <NumberTicker value={communityBoost} prefix="$" decimals={0} />
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/apply" className="flex-1">
              <Button 
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                Apply for Charity Show
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/vote" className="flex-1">
              <Button 
                variant="outline"
                className="w-full border-2 border-orange-500 dark:border-amber-400 text-orange-600 dark:text-amber-400 hover:bg-orange-500 hover:text-white dark:hover:bg-amber-400 dark:hover:text-black font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                Vote Today
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

