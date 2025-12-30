"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import { Copy, Check, Share2, Twitter, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { GlareCard } from "@/components/ui/glare-card";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

export function ReferralSystem() {
  const { publicKey, connected } = useWallet();
  const [referralCode, setReferralCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);

  // Generate or fetch referral code
  useEffect(() => {
    if (!connected || !publicKey) {
      setReferralCode("");
      return;
    }

    const fetchOrCreateReferralCode = async () => {
      try {
        // Check if user already has a referral code
        const { data: existing } = await supabase
          .from("referrals")
          .select("referral_code")
          .eq("referrer_wallet", publicKey.toString())
          .limit(1)
          .single();

        if (existing?.referral_code) {
          setReferralCode(existing.referral_code);
        } else {
          // Generate new referral code (first 8 chars of wallet + random)
          const walletShort = publicKey.toString().slice(0, 8).toUpperCase();
          const random = Math.random().toString(36).substring(2, 6).toUpperCase();
          const newCode = `${walletShort}-${random}`;
          setReferralCode(newCode);
        }

        // Fetch referral stats
        const { count } = await supabase
          .from("referrals")
          .select("id", { count: "exact", head: true })
          .eq("referrer_wallet", publicKey.toString());

        setReferralCount(count || 0);

        // Calculate total rewards (placeholder - would need rewards table)
        setTotalRewards(0);
      } catch (error) {
        console.error("Error fetching referral data:", error);
      }
    };

    fetchOrCreateReferralCode();
  }, [connected, publicKey]);

  const referralUrl = referralCode
    ? `${typeof window !== "undefined" ? window.location.origin : "https://projecthappiness.xyz"}/?ref=${referralCode}`
    : "";

  const handleCopy = async () => {
    if (!referralUrl) return;
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleShare = (platform: "twitter" | "telegram") => {
    const text = encodeURIComponent(
      `Join the happiest meme coin on Solana! Use my referral code: ${referralCode}\n\n${referralUrl}`
    );

    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    } else if (platform === "telegram") {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent(`Join with my code: ${referralCode}`)}`, "_blank");
    }
  };

  if (!connected) {
    return (
      <GlareCard className="p-8 md:p-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-800 dark:text-orange-400 mb-4 lowercase" style={{ fontFamily: '"Borel", cursive' }}>
            referral system
          </h2>
          <p className="text-lg text-black dark:text-white mb-6">
            Connect your wallet to get your unique referral code and start earning rewards!
          </p>
        </div>
      </GlareCard>
    );
  }

  return (
    <GlareCard className="p-8 md:p-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-800 dark:text-orange-400 mb-4 lowercase" style={{ fontFamily: '"Borel", cursive' }}>
            referral system
          </h2>
          <p className="text-lg text-black dark:text-white">
            Share your code and earn rewards when others join!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Referrals</p>
            <p className="text-3xl font-bold text-orange-600 dark:text-amber-400">
              <NumberTicker value={referralCount} />
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Rewards</p>
            <p className="text-3xl font-bold text-orange-600 dark:text-amber-400">
              <NumberTicker value={totalRewards} />
            </p>
          </div>
        </div>

        {/* Referral Code */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Your Referral Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border-2 border-orange-300 dark:border-orange-700 text-lg font-mono font-bold text-orange-800 dark:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleCopy}
                className={cn(
                  "px-6 py-3 rounded-lg font-semibold text-white transition-all",
                  "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
                  "flex items-center gap-2"
                )}
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Referral URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Referral Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralUrl}
                readOnly
                className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border-2 border-orange-300 dark:border-orange-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Share on Social Media</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleShare("twitter")}
              className={cn(
                "flex-1 min-w-[140px] px-4 py-3 rounded-lg font-semibold text-white transition-all",
                "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
                "flex items-center justify-center gap-2"
              )}
            >
              <Twitter className="h-5 w-5" />
              Share on X
            </button>
            <button
              onClick={() => handleShare("telegram")}
              className={cn(
                "flex-1 min-w-[140px] px-4 py-3 rounded-lg font-semibold text-white transition-all",
                "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600",
                "flex items-center justify-center gap-2"
              )}
            >
              <MessageCircle className="h-5 w-5" />
              Share on Telegram
            </button>
          </div>
        </div>

        {/* Rewards Info */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
          <h3 className="text-lg font-bold text-orange-800 dark:text-orange-400 mb-3">How It Works</h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-orange-600 dark:text-amber-400 font-bold">•</span>
              <span>Share your referral code with friends</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 dark:text-amber-400 font-bold">•</span>
              <span>When they connect their wallet using your code, you both get rewards</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 dark:text-amber-400 font-bold">•</span>
              <span>Rewards include extra wheel spins, $HAPPINESS tokens, or SOL</span>
            </li>
          </ul>
        </div>
      </div>
    </GlareCard>
  );
}

