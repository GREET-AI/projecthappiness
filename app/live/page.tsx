"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";
import { Video, MessageSquare, Heart, Archive, PlayCircle } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function LivePage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [donationCount, setDonationCount] = useState(0);

  useEffect(() => {
    // Simulate donations every 30 seconds
    const interval = setInterval(() => {
      setDonationCount((prev) => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      {/* Coming Soon Notice */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 dark:from-yellow-600 dark:via-amber-600 dark:to-yellow-700 rounded-xl p-4 text-center shadow-lg border-2 border-yellow-600 dark:border-yellow-500">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">🚀</span>
            <p className="text-sm md:text-base font-semibold text-yellow-900 dark:text-yellow-100">
              Live Features Coming Soon
            </p>
          </div>
          <p className="text-xs md:text-sm text-yellow-800 dark:text-yellow-200">
            Real-time live streaming, interactive donations, and live chat will be available soon. All streams will be archived for later viewing.
          </p>
        </div>
      </div>

      <div className="text-center space-y-4 mb-12">
        <div className="flex items-center justify-center gap-2">
          <Video className="h-6 w-6 text-destructive animate-pulse" />
          <h1 className="text-4xl font-bold">LIVE NOW</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Watch today&apos;s charity show powered by $HAPPINESS
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* Main Stream */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-destructive" />
                Live Stream
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Pump.fun Embed Placeholder */}
                <div className="text-center space-y-2">
                  <Video className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">Live Stream</p>
                  <p className="text-sm text-muted-foreground">
                    Embed your Pump.fun stream URL here
                  </p>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    <div className="h-2 w-2 bg-destructive-foreground rounded-full animate-pulse" />
                    LIVE
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stream Info */}
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Charity Show</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Building Schools in Africa
                </h3>
                <p className="text-muted-foreground">
                  Join us as we fund the construction of 5 new schools in rural
                  Africa. Every donation goes directly to building materials and
                  teacher salaries.
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Raised Today</p>
                  <p className="text-2xl font-bold text-success">$12,450</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Donations</p>
                  <p className="text-2xl font-bold">{donationCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Viewers</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat & Donations */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 h-[400px] overflow-y-auto">
                {[
                  { user: "CryptoKing", message: "Amazing project! 🚀", time: "2m ago" },
                  { user: "HappinessHodler", message: "Just donated! 💚", time: "3m ago" },
                  { user: "SolanaFan", message: "This is why I love crypto", time: "5m ago" },
                  { user: "CharityLover", message: "Keep up the great work!", time: "7m ago" },
                  { user: "MoonBoy", message: "To the moon! 🌙", time: "10m ago" },
                ].map((msg, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{msg.user}</span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{msg.message}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <Button size="sm">Send</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-destructive" />
                Donate Now
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Support today&apos;s charity show with $HAPPINESS or SOL
              </p>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  Connect Phantom Wallet
                </Button>
                <RainbowButton className="w-full">
                  Donate with Card
                </RainbowButton>
              </div>
              <div className="pt-4 border-t space-y-2">
                <p className="text-xs text-muted-foreground">Quick Donate:</p>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 50, 100].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 3000);
                      }}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stream Archive Section */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Archive className="h-7 w-7" />
              Stream Archive
            </h2>
            <p className="text-muted-foreground mt-2">
              Watch past charity shows and relive the moments that changed lives
            </p>
          </div>
        </div>

        {/* Archive Notice */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 dark:from-blue-600 dark:via-indigo-600 dark:to-blue-700 rounded-xl p-4 text-center shadow-lg border-2 border-blue-600 dark:border-blue-500">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Archive className="h-5 w-5" />
              <p className="text-sm md:text-base font-semibold text-blue-900 dark:text-blue-100">
                Archive Feature Coming Soon
              </p>
            </div>
            <p className="text-xs md:text-sm text-blue-800 dark:text-blue-200">
              All live streams will be automatically archived here for later viewing. Watch past shows, see donation highlights, and relive the moments that made a difference.
            </p>
          </div>
        </div>

        {/* Archive Grid Placeholder */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="opacity-60">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-center space-y-2">
                    <PlayCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Stream #{item}</p>
                  </div>
                  <div className="absolute top-2 right-2">
                    <div className="bg-muted-foreground/80 text-background px-2 py-1 rounded text-xs">
                      Archived
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">Charity Show #{item}</h3>
                  <p className="text-xs text-muted-foreground mb-2">Date: Coming soon</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>👁️ 0 views</span>
                    <span>💚 $0 raised</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

