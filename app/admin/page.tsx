"use client";

import { useState, useEffect } from "react";
import { supabase, type Candidate } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { CheckCircle2, X, Play, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Simple email protection - replace with your email
const ADMIN_EMAIL = "admin@projecthappiness.com"; // Change this to your email

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [email, setEmail] = useState("");
  const [pendingCandidates, setPendingCandidates] = useState<Candidate[]>([]);
  const [verifiedCandidates, setVerifiedCandidates] = useState<(Candidate & { vote_count: number })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  useEffect(() => {
    // Check if already authorized (stored in sessionStorage)
    const authorized = sessionStorage.getItem("admin_authorized");
    if (authorized === "true") {
      setIsAuthorized(true);
      fetchCandidates();
    }
  }, []);

  const handleLogin = () => {
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      setIsAuthorized(true);
      sessionStorage.setItem("admin_authorized", "true");
      fetchCandidates();
    } else {
      alert("Unauthorized access");
    }
  };

  const fetchCandidates = async () => {
    setIsLoading(true);
    try {
      // Fetch pending candidates
      const { data: pending, error: pendingError } = await supabase
        .from('candidates')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (pendingError) throw pendingError;

      // Fetch verified candidates with vote counts
      const { data: verified, error: verifiedError } = await supabase
        .from('candidates')
        .select('*')
        .eq('status', 'verified')
        .order('created_at', { ascending: false });

      if (verifiedError) throw verifiedError;

      // Get vote counts for verified candidates
      const verifiedWithVotes = await Promise.all(
        (verified || []).map(async (candidate) => {
          const { data: votesData } = await supabase
            .from('votes')
            .select('vote_power')
            .eq('candidate_id', candidate.id);

          const vote_count = votesData?.reduce((sum, v) => sum + (v.vote_power || 0), 0) || 0;
          return { ...candidate, vote_count };
        })
      );

      setPendingCandidates(pending || []);
      setVerifiedCandidates(verifiedWithVotes);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      alert('Error loading candidates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (candidateId: string) => {
    try {
      const { error } = await supabase
        .from('candidates')
        .update({ status: 'verified' })
        .eq('id', candidateId);

      if (error) throw error;

      // Refresh candidates
      fetchCandidates();
    } catch (error: any) {
      console.error('Error verifying candidate:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleReject = async (candidateId: string) => {
    if (!confirm('Are you sure you want to reject this candidate?')) return;

    try {
      const { error } = await supabase
        .from('candidates')
        .update({ status: 'rejected' })
        .eq('id', candidateId);

      if (error) throw error;

      // Refresh candidates
      fetchCandidates();
    } catch (error: any) {
      console.error('Error rejecting candidate:', error);
      alert(`Error: ${error.message}`);
    }
  };

  // Set up Realtime subscriptions
  useEffect(() => {
    if (!isAuthorized) return;

    const candidatesChannel = supabase
      .channel('admin-candidates-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'candidates',
        },
        () => {
          fetchCandidates();
        }
      )
      .subscribe();

    const votesChannel = supabase
      .channel('admin-votes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'votes',
        },
        () => {
          fetchCandidates();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(candidatesChannel);
      supabase.removeChannel(votesChannel);
    };
  }, [isAuthorized]);

  if (!isAuthorized) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter your email to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="email"
              placeholder="admin@projecthappiness.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage candidates and view voting statistics</p>
      </div>

      {/* Pending Candidates */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Pending Candidates ({pendingCandidates.length})</h2>
        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : pendingCandidates.length === 0 ? (
          <p className="text-muted-foreground">No pending candidates</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingCandidates.map((candidate) => (
              <Card key={candidate.id}>
                <CardHeader>
                  <CardTitle>{candidate.name}</CardTitle>
                  <CardDescription>
                    {candidate.country} • {candidate.x_handle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    {playingVideo === candidate.id ? (
                      <video
                        src={candidate.video_url}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                        onEnded={() => setPlayingVideo(null)}
                      />
                    ) : (
                      <>
                        <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center">
                          <Play className="h-12 w-12 text-primary opacity-70" />
                        </div>
                        <div
                          className="absolute inset-0 cursor-pointer"
                          onMouseEnter={() => setPlayingVideo(candidate.id)}
                        />
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {candidate.story}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleVerify(candidate.id)}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Verify & Publish
                    </Button>
                    <Button
                      onClick={() => handleReject(candidate.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Verified Candidates with Votes */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Verified Candidates ({verifiedCandidates.length})</h2>
        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : verifiedCandidates.length === 0 ? (
          <p className="text-muted-foreground">No verified candidates yet</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedCandidates
              .sort((a, b) => b.vote_count - a.vote_count)
              .map((candidate) => (
                <Card key={candidate.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{candidate.name}</CardTitle>
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <CardDescription>
                      {candidate.country} • {candidate.x_handle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-card border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-2">Total Votes</p>
                      <p className="text-3xl font-bold text-primary">
                        <NumberTicker value={candidate.vote_count} />
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {candidate.story}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

