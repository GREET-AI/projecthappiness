"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle2, Shield, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TransparencyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Coming Soon Notice */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 dark:from-yellow-600 dark:via-amber-600 dark:to-yellow-700 rounded-xl p-4 text-center shadow-lg border-2 border-yellow-600 dark:border-yellow-500">
          <div className="flex items-center justify-center gap-2 mb-1">
            <AlertCircle className="h-5 w-5 text-yellow-900 dark:text-yellow-100" />
            <p className="text-sm md:text-base font-semibold text-yellow-900 dark:text-yellow-100">
              Transparency Dashboard Coming Soon
            </p>
          </div>
          <p className="text-xs md:text-sm text-yellow-800 dark:text-yellow-200">
            After launch, all transactions, winners, and on-chain proofs will be displayed here in real-time. Every donation and distribution will be verifiable on Solana blockchain.
          </p>
        </div>
      </motion.div>

      <div className="text-center space-y-4 mb-12">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">100% On-Chain Transparency</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Every transaction is verifiable on Solana blockchain
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* On-Chain Proof */}
        <Card className="opacity-75">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#22c55e]" />
                On-Chain Verification
              </CardTitle>
              <Badge className="bg-yellow-500 text-yellow-900">Coming Soon</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              All transactions will be publicly verifiable on Solana blockchain after launch. Click any
              transaction hash to view on Solscan.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-lg border p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Contract Address</p>
                <p className="text-sm font-mono text-muted-foreground">
                  To be announced after launch
                </p>
              </div>
              <div className="rounded-lg border p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Pool Address</p>
                <p className="text-sm font-mono text-muted-foreground">
                  To be announced after launch
                </p>
              </div>
              <div className="rounded-lg border p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Total Transactions</p>
                <p className="text-2xl font-bold text-muted-foreground">0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="opacity-75">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Badge className="bg-yellow-500 text-yellow-900">No Data Yet</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground mb-2">No transactions yet</p>
              <p className="text-sm text-muted-foreground">
                Transaction history will appear here after launch. All donations and distributions will be tracked on-chain.
              </p>
            </div>
            <Table className="hidden">
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Transaction Hash</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Table structure ready for future data */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Past Winners */}
        <Card className="opacity-75">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Past Charity Show Winners</CardTitle>
              <Badge className="bg-yellow-500 text-yellow-900">No Winners Yet</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground mb-2">No winners yet</p>
              <p className="text-sm text-muted-foreground">
                After the first charity show, all winners will be displayed here with their transaction hashes, amounts received, and verification links to Solscan.
              </p>
            </div>
            <div className="space-y-4 hidden">
              {/* Structure ready for future winners */}
            </div>
          </CardContent>
        </Card>

        {/* Audit Info */}
        <Card>
          <CardHeader>
            <CardTitle>Security & Transparency Commitment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Smart Contract</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Will be audited before launch</li>
                  <li>Open source on GitHub (after launch)</li>
                  <li>No admin keys or backdoors</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Transparency</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>All transactions on-chain (after launch)</li>
                  <li>Public pool address (will be shared)</li>
                  <li>Real-time tracking (coming soon)</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50 rounded-lg border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Our Promise:</strong> Every donation, every distribution, and every winner will be verifiable on Solana blockchain. 
                We believe in complete transparency and will share all contract addresses, pool addresses, and transaction hashes publicly after launch.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

