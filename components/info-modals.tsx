"use client";

import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "@/components/ui/animated-modal";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { motion } from "framer-motion";
import { Heart, Sparkles, Coins } from "lucide-react";
import Link from "next/link";

const CloseButton = () => {
  const { setOpen } = useModal();
  return (
    <button 
      onClick={() => setOpen(false)}
      className="px-4 py-2 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors"
    >
      Close
    </button>
  );
};

export function AboutModal() {
  return (
    <Modal>
      <ModalTrigger className="relative bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white flex justify-center group/modal-btn px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg overflow-hidden">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover/modal-btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          About
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
          <Heart className="h-6 w-6" />
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <CardContainer containerClassName="py-0" className="w-full">
            <CardBody className="bg-gray-50 dark:bg-black relative group/card dark:hover:shadow-2xl dark:hover:shadow-orange-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white"
              >
                You can&apos;t buy{" "}
                <span className="px-2 py-1 rounded-md bg-gradient-to-r from-orange-400 to-amber-500 text-white">
                  happiness
                </span>
                <br />
                But you can buy{" "}
                <span className="px-2 py-1 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  $HAPPINESS
                </span>
                ✨
              </CardItem>
              
              <CardItem
                translateZ="60"
                as="div"
                className="space-y-6 text-gray-700 dark:text-gray-300"
              >
                <p className="text-lg leading-relaxed">
                  <strong className="text-orange-600 dark:text-orange-400">Fun fact:</strong> Scientists have been trying to quantify happiness for centuries. 
                  They&apos;ve measured serotonin, dopamine, endorphins—but never found a way to package it.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Until now. <span className="font-bold text-purple-600 dark:text-purple-400">$HAPPINESS</span> is the first meme coin that doesn&apos;t just promise 
                  gains—it delivers actual happiness through daily live charity shows funded by creator trading fees.
                </p>
                
                <p className="text-lg leading-relaxed italic">
                  &quot;Money can&apos;t buy happiness&quot; they said. Well, we&apos;re here to prove them wrong—one transaction at a time.
                </p>
              </CardItem>
              
              <CardItem
                translateZ="80"
                className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800 mt-6"
              >
                <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  The Paradox:
                </p>
                <p className="text-base text-gray-700 dark:text-gray-300">
                  Every trade creates real-world impact. Every holder becomes part of a movement. 
                  Every pump funds someone&apos;s dream. This isn&apos;t just a token—it&apos;s proof that in the right hands, 
                  even memes can change lives.
                </p>
              </CardItem>
            </CardBody>
          </CardContainer>
        </ModalContent>
        <ModalFooter className="gap-4">
          <CloseButton />
          <Link href="https://pump.fun" target="_blank" rel="noopener noreferrer">
            <button className="bg-gradient-to-r from-orange-400 to-amber-500 text-white text-sm px-4 py-2 rounded-md border border-orange-600 w-32">
              Buy $HAPPINESS
            </button>
          </Link>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}

export function HowItWorksModal() {
  return (
    <Modal>
      <ModalTrigger className="relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex justify-center group/modal-btn px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg overflow-hidden">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover/modal-btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          How It Works
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
          <Sparkles className="h-6 w-6" />
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <CardContainer containerClassName="py-0" className="w-full">
            <CardBody className="bg-gray-50 dark:bg-black relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
              >
                The{" "}
                <span className="px-2 py-1 rounded-md bg-gradient-to-r from-orange-400 to-amber-500 text-white">
                  Magic
                </span>{" "}
                Behind the{" "}
                <span className="px-2 py-1 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  Meme
                </span>
              </CardItem>
              
              <CardItem
                translateZ="60"
                as="div"
                className="space-y-6"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Trading Fees Flow</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      Every time someone trades $HAPPINESS, a portion of the fees goes directly into our 
                      <span className="font-semibold text-orange-600 dark:text-orange-400"> Happiness Pool</span>. 
                      No middlemen. No delays. Just pure, transparent impact.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Daily Live Shows</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      Every single day, we go live and fund real charity initiatives. You vote. We execute. 
                      The community decides where the happiness goes. It&apos;s democracy, but make it memes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">The Beautiful Paradox</h5>
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      You can&apos;t buy happiness—but you can buy $HAPPINESS. And when you do, 
                      you&apos;re not just holding a token. You&apos;re holding proof that memes can make the world better.
                    </p>
                  </div>
                </div>
              </CardItem>
              
              <CardItem
                translateZ="80"
                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800 mt-6"
              >
                <p className="text-base text-gray-700 dark:text-gray-300">
                  <strong className="text-purple-600 dark:text-purple-400">Remember:</strong> Traditional finance 
                  says money can&apos;t buy happiness. We say: watch us try. And succeed. One charity show at a time.
                </p>
              </CardItem>
            </CardBody>
          </CardContainer>
        </ModalContent>
        <ModalFooter className="gap-4">
          <CloseButton />
          <Link href="/how-it-works" className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white text-sm px-4 py-2 rounded-md border border-orange-600 w-32 text-center transition-all duration-300 transform hover:scale-105">
            Read More
          </Link>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}

export function HowToBuyModal() {
  return (
    <Modal>
      <ModalTrigger className="relative bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white flex justify-center group/modal-btn px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg overflow-hidden">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover/modal-btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 opacity-0 group-hover/modal-btn:opacity-30 blur-xl transition-opacity duration-300 -z-10"></div>
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          How to Buy
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
          <Coins className="h-6 w-6" />
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <CardContainer containerClassName="py-0" className="w-full">
            <CardBody className="bg-gray-50 dark:bg-black relative group/card dark:hover:shadow-2xl dark:hover:shadow-orange-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
              >
                Buy{" "}
                <span className="px-2 py-1 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  $HAPPINESS
                </span>
                <br />
                <span className="text-lg font-normal text-gray-600 dark:text-gray-400">
                  (Because you can&apos;t buy the other kind)
                </span>
              </CardItem>
              
              <CardItem
                translateZ="60"
                as="div"
                className="space-y-6"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Get a Solana Wallet</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      Download Phantom, Solflare, or any Solana wallet. This is your gateway to happiness 
                      (the tokenized kind, of course).
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Get Some SOL</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      Buy SOL on any exchange. Transfer it to your wallet. You&apos;re now one step away from 
                      buying what money supposedly can&apos;t buy.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Swap SOL for $HAPPINESS</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      Head to Pump.fun, connect your wallet, and swap. In seconds, you&apos;ll own something 
                      that philosophers have been debating for millennia: Can money buy happiness? 
                      <span className="font-bold text-purple-600 dark:text-purple-400"> Yes. Yes, it can.</span>
                    </p>
                  </div>
                </div>
              </CardItem>
              
              <CardItem
                translateZ="80"
                className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800 mt-6"
              >
                <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  The Ultimate Flex:
                </p>
                <p className="text-base text-gray-700 dark:text-gray-300 italic">
                  When someone tells you &quot;money can&apos;t buy happiness,&quot; you can literally show them your wallet. 
                  You bought $HAPPINESS. They didn&apos;t. Who&apos;s happier now?
                </p>
              </CardItem>
              
              <CardItem
                translateZ="70"
                className="text-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl mt-6"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="text-purple-600 dark:text-purple-400">Disclaimer:</strong> This is a meme coin. 
                  You can&apos;t buy actual happiness. But you can buy $HAPPINESS, and that&apos;s pretty close. 
                  Plus, every trade helps fund real charity. So there&apos;s that.
                </p>
              </CardItem>
            </CardBody>
          </CardContainer>
        </ModalContent>
        <ModalFooter className="gap-4">
          <CloseButton />
          <Link href="https://pump.fun" target="_blank" rel="noopener noreferrer">
            <button className="bg-gradient-to-r from-orange-400 to-amber-500 text-white text-sm px-4 py-2 rounded-md border border-orange-600 w-32">
              Buy Now
            </button>
          </Link>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}

