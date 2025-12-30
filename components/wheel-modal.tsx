"use client";

import { Modal, ModalBody, ModalContent, useModal } from "@/components/ui/animated-modal";
import { WheelOfHappiness } from "@/components/wheel-of-happiness";
import { Gift } from "lucide-react";
import { MovingBorder } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";

function WheelModalButton() {
  const { setOpen } = useModal();
  return (
    <div
      onClick={() => setOpen(true)}
      className="relative h-12 w-auto min-w-[180px] overflow-hidden bg-transparent p-[1px] text-xl cursor-pointer"
      style={{ borderRadius: "1.75rem" }}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: "calc(1.75rem * 0.96)" }}
      >
        <MovingBorder duration={3000} rx="30%" ry="30%">
          <div className="h-20 w-20 bg-[radial-gradient(#ffc850_40%,transparent_60%)] opacity-[0.8]" />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-orange-400/50 bg-gradient-to-r from-orange-500/90 to-amber-500/90 text-sm text-white antialiased backdrop-blur-xl px-6",
        )}
        style={{ borderRadius: "calc(1.75rem * 0.96)" }}
      >
        <span className="flex items-center gap-2 font-semibold">
          <Gift className="h-4 w-4" />
          Spin the Wheel
        </span>
      </div>
    </div>
  );
}

export function WheelModal() {
  const { setOpen } = useModal();
  
  return (
    <Modal>
      <WheelModalButton />
      <ModalBody className="max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <ModalContent>
          <WheelOfHappiness onClose={() => setOpen(false)} />
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}

