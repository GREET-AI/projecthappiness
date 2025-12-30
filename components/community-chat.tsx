"use client";

import { useState, useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import { Send, MessageCircle, X, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { GlareCard } from "@/components/ui/glare-card";

export interface ChatMessage {
  id: string;
  wallet_address: string;
  message: string;
  created_at: string;
}

export function CommunityChat() {
  const { publicKey, connected } = useWallet();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("chat_messages")
          .select("*")
          .order("created_at", { ascending: true })
          .limit(50);

        if (error) {
          // Check if table doesn't exist (404/PGRST116 = table not found)
          if (error.code === 'PGRST116' || 
              error.message?.includes('relation') || 
              error.message?.includes('does not exist') ||
              error.message?.includes('404')) {
            // Table doesn't exist yet - silently handle, don't show chat
            setMessages([]);
            setIsOpen(false);
            setIsMinimized(true);
            return;
          }
          throw error;
        }
        setMessages(data || []);
      } catch (error) {
        // Only log non-critical errors
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (!errorMessage.includes('relation') && 
            !errorMessage.includes('does not exist') &&
            !errorMessage.includes('404') &&
            !errorMessage.includes('PGRST116')) {
          console.error("Error fetching messages:", error);
        }
        // Hide chat on any error to prevent UI issues
        setMessages([]);
        setIsOpen(false);
        setIsMinimized(true);
      }
    };

    fetchMessages();

    // Subscribe to new messages (only if table exists)
    let channel: any = null;
    try {
      channel = supabase
        .channel("chat_messages")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
          },
          (payload) => {
            setMessages((prev) => [...prev, payload.new as ChatMessage]);
          }
        )
        .subscribe();
    } catch (error) {
      // Silently handle subscription errors (table might not exist)
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !connected || !publicKey) return;

    try {
      const { error } = await supabase.from("chat_messages").insert({
        wallet_address: publicKey.toString(),
        message: newMessage.trim(),
      });

      if (error) throw error;
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!connected) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      {isMinimized && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all"
        >
          <MessageCircle className="h-6 w-6" />
          {messages.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
              {messages.length > 9 ? "9+" : messages.length}
            </span>
          )}
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 w-96 h-[500px] flex flex-col"
          >
            <GlareCard className="flex flex-col h-full p-0">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-orange-600 dark:text-amber-400" />
                  <h3 className="font-bold text-lg text-orange-800 dark:text-orange-400">Community Chat</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <p>No messages yet. Be the first to chat!</p>
                  </div>
                ) : (
                  messages.map((message) => {
                    const isOwn = message.wallet_address === publicKey?.toString();
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          isOwn ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg p-3",
                            isOwn
                              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                          )}
                        >
                          <p className="text-xs font-semibold mb-1 opacity-80">
                            {shortenAddress(message.wallet_address)}
                          </p>
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-60 mt-1">
                            {new Date(message.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-orange-200 dark:border-orange-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border-2 border-orange-300 dark:border-orange-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                    className={cn(
                      "px-4 py-2 rounded-lg font-semibold text-white transition-all",
                      "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </GlareCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

