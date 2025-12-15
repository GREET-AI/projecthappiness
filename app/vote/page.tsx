"use client";

import { useState, useEffect, useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { MagicCard } from "@/components/magicui/magic-card";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle2, Wallet, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { supabase, type Candidate } from "@/lib/supabase";

// TODO: Replace with actual $HAPPINESS token mint address after launch
const HAPPINESS_TOKEN_MINT = "11111111111111111111111111111111"; // Placeholder

interface CandidateWithVotes extends Candidate {
  vote_count: number;
  hasVoted: boolean;
}

export default function VotePage() {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<CandidateWithVotes[]>([]);
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [votePower, setVotePower] = useState<number>(0);
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [votedCandidates, setVotedCandidates] = useState<Set<string>>(new Set());
  const [isMounted, setIsMounted] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Client-side only mount check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check token balance when wallet connects
  useEffect(() => {
    const checkBalance = async () => {
      if (!connected || !publicKey) {
        setTokenBalance(0);
        setVotePower(0);
        return;
      }

      setIsCheckingBalance(true);
      try {
        // TODO: Replace with actual token mint address
        // For now, we'll simulate balance check
        // In production, use: getAccount(connection, tokenAccountAddress)
        
        // Simulated balance check - replace with real on-chain check
        const mockBalance = 0; // Will be replaced with actual balance check
        setTokenBalance(mockBalance);
        setVotePower(Math.floor(mockBalance / 100));
      } catch (error) {
        console.error("Error checking balance:", error);
        setTokenBalance(0);
        setVotePower(0);
      } finally {
        setIsCheckingBalance(false);
      }
    };

    checkBalance();
  }, [connected, publicKey, connection]);

  // Fetch candidates from Supabase
  useEffect(() => {
    const fetchCandidates = async () => {
      setIsLoading(true);
      try {
        // Check if Supabase is configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.warn('Supabase not configured. Using mock data.');
          setIsLoading(false);
          return;
        }

        // Fetch verified candidates
        const { data: candidatesData, error: candidatesError } = await supabase
          .from('candidates')
          .select('*')
          .eq('status', 'verified')
          .order('created_at', { ascending: false });

        if (candidatesError) {
          console.error('Supabase error:', candidatesError);
          // Check if table doesn't exist yet (404 = table not found)
          if (candidatesError.code === 'PGRST116' || 
              candidatesError.message?.includes('relation') || 
              candidatesError.message?.includes('does not exist') ||
              candidatesError.message?.includes('404') ||
              candidatesError.code === '42P01') {
            console.warn('Candidates table does not exist yet. Please run the SQL setup from SUPABASE_SETUP.sql');
            setDbError('Database tables not found. Please run the SQL setup from SUPABASE_SETUP.sql');
            setCandidates([]);
            setIsLoading(false);
            return;
          }
          // For other errors, clear dbError (might be network issue, etc.)
          setDbError(null);
          console.warn('Error fetching candidates, using empty array:', candidatesError);
          setCandidates([]);
          setIsLoading(false);
          return;
        }

        // Clear dbError if successful
        setDbError(null);

        // Fetch vote counts for each candidate
        const candidatesWithVotes = await Promise.all(
          (candidatesData || []).map(async (candidate) => {
            const { data: votesData, error: votesError } = await supabase
              .from('votes')
              .select('vote_power')
              .eq('candidate_id', candidate.id);

            if (votesError) {
              // If votes table doesn't exist, just use 0
              if (votesError.code === 'PGRST116' || votesError.message?.includes('404') || votesError.code === '42P01') {
                console.warn('Votes table does not exist yet');
                return { ...candidate, vote_count: 0, hasVoted: false };
              }
              throw votesError;
            }

            const vote_count = votesData?.reduce((sum, v) => sum + (v.vote_power || 0), 0) || 0;

            // Check if current wallet has voted for this candidate today
            let hasVoted = false;
            if (connected && publicKey) {
              try {
                const today = new Date().toISOString().split('T')[0];
                const { data: userVote } = await supabase
                  .from('votes')
                  .select('id')
                  .eq('candidate_id', candidate.id)
                  .eq('wallet_address', publicKey.toString())
                  .gte('created_at', `${today}T00:00:00`)
                  .limit(1);

                hasVoted = (userVote?.length || 0) > 0;
              } catch (err) {
                // If votes table doesn't exist, hasVoted stays false
                console.warn('Error checking vote status:', err);
              }
            }

            return {
              ...candidate,
              vote_count,
              hasVoted,
            };
          })
        );

        setCandidates(candidatesWithVotes);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();

    // Set up Realtime subscription for votes (only if Supabase is configured)
    let votesChannel: any = null;
    let candidatesChannel: any = null;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        votesChannel = supabase
          .channel('votes-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'votes',
            },
            () => {
              // Refetch candidates when votes change
              fetchCandidates();
            }
          )
          .subscribe();

        // Set up Realtime subscription for candidates
        candidatesChannel = supabase
          .channel('candidates-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'candidates',
              filter: 'status=eq.verified',
            },
            () => {
              // Refetch candidates when status changes
              fetchCandidates();
            }
          )
          .subscribe();
      } catch (err) {
        console.warn('Error setting up Realtime subscriptions:', err);
      }
    }

    return () => {
      if (votesChannel) supabase.removeChannel(votesChannel);
      if (candidatesChannel) supabase.removeChannel(candidatesChannel);
    };
  }, [connected, publicKey]);

  // Load voted candidates from localStorage (for UI state)
  useEffect(() => {
    if (connected && publicKey) {
      const today = new Date().toDateString();
      const stored = localStorage.getItem(`votes_${publicKey.toString()}_${today}`);
      if (stored) {
        setVotedCandidates(new Set(JSON.parse(stored)));
      }
    }
  }, [connected, publicKey]);

  const handleVote = async (candidateId: string) => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet to vote!");
      return;
    }

    if (tokenBalance < 100) {
      alert("You need to hold at least 100 $HAPPINESS tokens to vote!");
      return;
    }

    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate?.hasVoted) {
      alert("You've already voted for this candidate today!");
      return;
    }

    if (!executeRecaptcha) {
      alert("reCAPTCHA is not ready. Please try again.");
      return;
    }

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha("vote");
      
      // Get IP address (for bot protection)
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;

      // Insert vote into Supabase
      const { error: voteError } = await supabase
        .from('votes')
        .insert({
          candidate_id: candidateId,
          wallet_address: publicKey.toString(),
          vote_power: votePower,
          ip_address: ipAddress,
        });

      if (voteError) {
        // Check if it's a duplicate vote error
        if (voteError.code === '23505') { // Unique constraint violation
          alert("You've already voted for this candidate today!");
        } else {
          throw voteError;
        }
        return;
      }

      // Update local state
      const today = new Date().toDateString();
      const newVoted = new Set([...votedCandidates, candidateId]);
      setVotedCandidates(newVoted);
      localStorage.setItem(`votes_${publicKey.toString()}_${today}`, JSON.stringify([...newVoted]));

      // Update candidate vote count locally (will be updated by Realtime)
      setCandidates(prev => prev.map(c => 
        c.id === candidateId 
          ? { ...c, vote_count: c.vote_count + votePower, hasVoted: true }
          : c
      ));
    } catch (error: any) {
      console.error("Vote error:", error);
      alert(`Failed to submit vote: ${error.message || 'Please try again.'}`);
    }
  };

  const totalVotes = candidates.reduce((sum, app) => sum + app.vote_count, 0);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-center py-8"
        >
          <p className="text-muted-foreground">Loading candidates...</p>
        </motion.div>
      )}

      {/* Setup Warning - Show only if database tables don't exist */}
      {!isLoading && dbError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 dark:from-yellow-600 dark:via-amber-600 dark:to-yellow-700 rounded-xl p-6 text-center shadow-lg border-2 border-yellow-600 dark:border-yellow-500">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">⚠️</span>
              <p className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">
                Database Setup Required
              </p>
            </div>
            <p className="text-sm md:text-base text-yellow-800 dark:text-yellow-200 mb-4">
              Please run the SQL setup from <code className="bg-yellow-600/30 px-2 py-1 rounded">SUPABASE_SETUP.sql</code> in your Supabase SQL Editor to create the tables.
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              Go to Supabase Dashboard → SQL Editor → New Query → Paste SQL from SUPABASE_SETUP.sql → Run
            </p>
          </div>
        </motion.div>
      )}

      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 dark:from-cyan-500 dark:via-pink-500 dark:to-cyan-600 rounded-xl p-6 text-center shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Top candidates daily at 8 PM on Pump.fun – final polls decide live!
          </h2>
          <p className="text-white/90 text-sm md:text-base">
            Watch the live stream and vote in real-time polls to decide who gets the airdrop
          </p>
        </div>
      </motion.div>

      {/* Wallet Connect Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-3">
          {isMounted ? (
            <WalletMultiButton className="!bg-gradient-to-r !from-orange-400 !to-amber-500 hover:!from-orange-500 hover:!to-amber-600 !text-white !font-bold !rounded-xl !shadow-lg" />
          ) : (
            <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          )}
        </div>
        
        {connected && (
          <div className="flex items-center gap-6 mt-4">
            <div className="bg-card border rounded-lg p-4 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground">Your Vote Power</p>
              </div>
              {isCheckingBalance ? (
                <p className="text-2xl font-bold text-primary">Loading...</p>
              ) : (
                <p className="text-2xl font-bold text-primary">
                  <NumberTicker value={votePower} />
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {tokenBalance >= 100 ? (
                  <>Balance: {tokenBalance.toLocaleString()} $HAPPINESS</>
                ) : (
                  <>Hold 100+ $HAPPINESS to vote</>
                )}
              </p>
            </div>
          </div>
        )}
      </motion.div>

      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold">Daily Voting Leaderboard</h1>
        <p className="text-muted-foreground text-lg">
          Vote for your favorite verified candidates
        </p>
        <div className="flex items-center justify-center gap-8 mt-8">
          <div className="bg-card border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Votes</p>
            <p className="text-3xl font-bold">
              <NumberTicker value={totalVotes} />
            </p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Verified Candidates</p>
            <p className="text-3xl font-bold">
              <NumberTicker value={candidates.length} />
            </p>
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      {candidates.length === 0 && !isLoading ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No verified candidates yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {candidates.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MagicCard className="h-full group relative overflow-hidden">
                {/* Shine Border Effect on Hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 via-amber-500/20 to-orange-400/20 animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
                </div>
                
                <div className="space-y-4 relative z-10">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    {playingVideo === app.id ? (
                      <video
                        src={app.video_url}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                        onEnded={() => setPlayingVideo(null)}
                      />
                    ) : (
                      <>
                        <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center">
                          <div className="text-center">
                            <Play className="h-16 w-16 text-primary mx-auto mb-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                            <p className="text-sm text-muted-foreground">Hover to play preview</p>
                          </div>
                        </div>
                        <div
                          className="absolute inset-0 cursor-pointer"
                          onMouseEnter={() => setPlayingVideo(app.id)}
                        />
                      </>
                    )}
                  </div>

                  {/* Verified Badge */}
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified via X DM – will appear live on Pump.fun
                  </Badge>

                  {/* Name + Country + X Handle */}
                  <div>
                    <h3 className="text-xl font-bold mb-1">{app.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {app.country} • {app.x_handle}
                    </p>
                  </div>

                  {/* Story Excerpt */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {app.story}
                  </p>

                  {/* Vote Section */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Votes</p>
                      <p className="text-2xl font-bold text-primary">
                        <NumberTicker value={app.vote_count} />
                      </p>
                    </div>
                    <Button
                      onClick={() => handleVote(app.id)}
                      disabled={
                        !connected ||
                        tokenBalance < 100 ||
                        app.hasVoted ||
                        votedCandidates.has(app.id)
                      }
                      className={cn(
                        "relative overflow-hidden",
                        app.hasVoted || votedCandidates.has(app.id)
                          ? "bg-green-500 hover:bg-green-600"
                          : !connected || tokenBalance < 100
                          ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                          : "bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600"
                      )}
                    >
                      {app.hasVoted || votedCandidates.has(app.id) ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Voted
                        </>
                      ) : !connected ? (
                        <>
                          <Wallet className="mr-2 h-4 w-4" />
                          Connect Wallet
                        </>
                      ) : tokenBalance < 100 ? (
                        "Hold $HAPPINESS to vote!"
                      ) : (
                        `Vote (${votePower}x)`
                      )}
                    </Button>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
