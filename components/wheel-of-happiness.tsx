"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Prize, WHEEL_PRIZES, calculatePrize, calculateSpinRotation } from "@/lib/wheel-logic";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import Confetti from "react-confetti";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Gift, Coins, Shirt, Crown, RefreshCw, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface WheelOfHappinessProps {
  onClose?: () => void;
}

export function WheelOfHappiness({ onClose }: WheelOfHappinessProps) {
  const { publicKey, connected } = useWallet();
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [freeSpinsAvailable, setFreeSpinsAvailable] = useState(0);
  const [paidSpinsToday, setPaidSpinsToday] = useState(0);
  const [happinessBalance, setHappinessBalance] = useState(0);
  
  const rotation = useMotionValue(0);
  const springRotation = useSpring(rotation, {
    damping: 20,
    stiffness: 100,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wheelSize = 600;
  const centerX = wheelSize / 2;
  const centerY = wheelSize / 2;
  const radius = wheelSize / 2 - 20;

  // Get window size for confetti
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Draw wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawWheel = () => {
      ctx.clearRect(0, 0, wheelSize, wheelSize);

      const prizeCount = WHEEL_PRIZES.length;
      const anglePerPrize = (2 * Math.PI) / prizeCount;

      WHEEL_PRIZES.forEach((prize, index) => {
        const startAngle = index * anglePerPrize - Math.PI / 2;
        const endAngle = (index + 1) * anglePerPrize - Math.PI / 2;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = prize.color;
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text
        const textAngle = startAngle + anglePerPrize / 2;
        const textX = centerX + Math.cos(textAngle) * (radius * 0.7);
        const textY = centerY + Math.sin(textAngle) * (radius * 0.7);

        ctx.save();
        ctx.translate(textX, textY);
        ctx.rotate(textAngle + Math.PI / 2);
        ctx.fillStyle = "#000000";
        ctx.font = "bold 14px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(prize.label, 0, 0);
        ctx.restore();
      });

      // Draw center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = "#ffc850";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw pointer
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - radius - 10);
      ctx.lineTo(centerX - 15, centerY - radius - 30);
      ctx.lineTo(centerX + 15, centerY - radius - 30);
      ctx.closePath();
      ctx.fillStyle = "#ff4500";
      ctx.fill();
    };

    drawWheel();
  }, [centerX, centerY, radius]);

  // Check spin eligibility
  useEffect(() => {
    if (!connected || !publicKey) {
      setFreeSpinsAvailable(0);
      return;
    }

    const checkEligibility = async () => {
      try {
        // Check last spin date
        const { data: lastSpin } = await supabase
          .from("wheel_spins")
          .select("spin_date")
          .eq("wallet_address", publicKey.toString())
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        const today = new Date().toISOString().split("T")[0];
        const hasSpunToday = lastSpin?.spin_date === today;

        // Check paid spins today
        const { count: paidCount } = await supabase
          .from("wheel_spins")
          .select("id", { count: "exact", head: true })
          .eq("wallet_address", publicKey.toString())
          .eq("spin_date", today)
          .eq("is_paid", true);

        setPaidSpinsToday(paidCount || 0);

        // Calculate free spins (1 daily + bonus from holdings)
        const freeSpins = hasSpunToday ? 0 : 1;
        const bonusSpins = Math.floor(happinessBalance / 100);
        setFreeSpinsAvailable(freeSpins + bonusSpins);

        // TODO: Check $HAPPINESS balance on-chain
        // For now, set to 0
        setHappinessBalance(0);
      } catch (error) {
        console.error("Error checking eligibility:", error);
      }
    };

    checkEligibility();
  }, [connected, publicKey, happinessBalance]);

  const handleSpin = async (isPaid: boolean = false) => {
    if (isSpinning || !connected || !publicKey) return;

    // Check if paid spin and process payment
    if (isPaid) {
      // TODO: Process 0.1 SOL payment
      // For now, just proceed
    }

    setIsSpinning(true);
    setWonPrize(null);
    setShowConfetti(false);

    // Calculate prize
    const prize = calculatePrize();
    const prizeIndex = WHEEL_PRIZES.findIndex((p) => p.type === prize.type && p.value === prize.value);
    
    // Calculate rotation
    const finalRotation = calculateSpinRotation(prizeIndex, WHEEL_PRIZES.length);
    
    // Animate
    rotation.set(rotation.get() + finalRotation);

    // Wait for animation
    setTimeout(async () => {
      setWonPrize(prize);
      setShowConfetti(true);
      setIsSpinning(false);

      // Save spin to database
      try {
        await supabase.from("wheel_spins").insert({
          wallet_address: publicKey.toString(),
          spin_date: new Date().toISOString().split("T")[0],
          prize_type: prize.type,
          prize_value: prize.value,
          is_paid: isPaid,
        });

        // Process prize (SOL airdrop, etc.)
        if (prize.type === "sol" && prize.value > 0) {
          // TODO: Send SOL via on-chain transaction
          console.log(`Sending ${prize.value} SOL to ${publicKey.toString()}`);
        }
      } catch (error) {
        console.error("Error saving spin:", error);
      }
    }, 4000); // Match animation duration
  };

  const getPrizeIcon = (type: Prize["type"]) => {
    switch (type) {
      case "sol":
        return <Coins className="h-8 w-8 text-orange-600 dark:text-amber-400" />;
      case "merchandise":
        return <Shirt className="h-8 w-8 text-orange-600 dark:text-amber-400" />;
      case "vip-access":
        return <Crown className="h-8 w-8 text-orange-600 dark:text-amber-400" />;
      case "extra-spin":
        return <RefreshCw className="h-8 w-8 text-orange-600 dark:text-amber-400" />;
      default:
        return <Gift className="h-8 w-8 text-gray-400" />;
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto p-6 md:p-10">
      {showConfetti && windowSize.width > 0 && windowSize.height > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          colors={["#ffc850", "#ffa500", "#ffd700", "#ff6347", "#ff4500"]}
        />
      )}
      
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-orange-500/20 hover:bg-orange-500/30 flex items-center justify-center text-orange-600 dark:text-amber-400 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-orange-800 dark:text-orange-400 mb-2" style={{ fontFamily: '"Borel", cursive' }}>
          wheel of happiness
        </h2>
        <p className="text-lg text-black dark:text-white">
          Spin to win SOL, Merchandise, or VIP Access!
        </p>
      </div>

      {/* Spin Info */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 rounded-lg p-4 mb-6 border border-orange-200 dark:border-orange-800">
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Free Spins Available</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-amber-400">
              <NumberTicker value={freeSpinsAvailable} />
            </p>
          </div>
          {happinessBalance >= 100 && (
            <div>
              <p className="text-gray-600 dark:text-gray-400">Bonus from Holdings</p>
              <p className="text-lg font-semibold text-orange-600 dark:text-amber-400">
                +{Math.floor(happinessBalance / 100)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Wheel Container */}
      <div className="relative flex items-center justify-center mb-8 overflow-visible">
        <motion.div
          style={{
            rotate: springRotation,
          }}
          className="relative"
        >
          <canvas
            ref={canvasRef}
            width={wheelSize}
            height={wheelSize}
            className="rounded-full shadow-2xl w-full h-auto max-w-full"
          />
        </motion.div>
      </div>

      {/* Spin Buttons */}
      <div className="flex flex-col gap-4">
        {freeSpinsAvailable > 0 && (
          <button
            onClick={() => handleSpin(false)}
            disabled={isSpinning || !connected}
            className={cn(
              "w-full py-4 px-6 rounded-lg font-semibold text-white transition-all",
              "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-lg hover:shadow-xl transform hover:scale-105"
            )}
          >
            {isSpinning ? "Spinning..." : `Spin Free (${freeSpinsAvailable} left)`}
          </button>
        )}

        {paidSpinsToday < 5 && (
          <button
            onClick={() => handleSpin(true)}
            disabled={isSpinning || !connected}
            className={cn(
              "w-full py-4 px-6 rounded-lg font-semibold text-white transition-all",
              "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-lg hover:shadow-xl transform hover:scale-105"
            )}
          >
            {isSpinning ? "Spinning..." : `Spin for 0.1 SOL (${5 - paidSpinsToday} left today)`}
          </button>
        )}

        {!connected && (
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            Connect your wallet to spin
          </p>
        )}
      </div>

      {/* Prize Display */}
      {wonPrize && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 bg-gradient-to-r from-orange-500/20 to-amber-500/20 dark:from-orange-500/30 dark:to-amber-500/30 rounded-lg p-6 border-2 border-orange-400 dark:border-amber-500"
        >
          <div className="flex items-center gap-4">
            {getPrizeIcon(wonPrize.type)}
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">You Won:</p>
              <p className="text-2xl font-bold text-orange-800 dark:text-orange-400">
                {wonPrize.label}
              </p>
              {wonPrize.type === "sol" && wonPrize.value > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  SOL will be sent to your wallet
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

