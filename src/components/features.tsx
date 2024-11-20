import {
  Airplay,
  ArrowRightIcon,
  Columns2,
  Film,
  LucideExternalLink,
  Users,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export default function Features() {
  return (
    <section className="mt-32">
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold">How it works</div>
          <div className="text-4xl mt-1 font-serifItalic">Simple Steps</div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 my-16 gap-4">
        <div className="h-[25rem] bg-gradient-to-t transition-all duration-700 ease-in-out from-accent/50 hover:shadow-2xl group p-4 overflow-hidden relative rounded-xl border">
          <div className="flex flex-col gap-2 absolute bottom-6">
            <h3 className="text-3xl font-semibold">
              <span className="font-serifItalic">Verify</span> Enrollment
            </h3>
            <p className="text-sm text-gray-500 font-semibold">
              Connect your wallet and verify your enrollment in the 100xDevs Web3 cohort using your registered email.
            </p>
            <Button
              Icon={ArrowRightIcon}
              iconPlacement="right"
              className="w-fit mt-4 text-xs h-6"
            >
              Verify Now
            </Button>
          </div>
        </div>

        <div className="h-[25rem] bg-gradient-to-t transition-all duration-700 ease-in-out from-accent/50 hover:shadow-2xl group p-4 overflow-hidden relative rounded-xl border">
          <div className="flex flex-col gap-2 absolute bottom-6">
            <h3 className="text-3xl font-semibold">
              Free <span className="font-serifItalic">Mint</span>
            </h3>
            <p className="text-sm text-gray-500 font-semibold">
              Once verified, mint your exclusive 100xDevs NFT for free. Each NFT is unique and proves your participation.
            </p>
            <Button
              Icon={ArrowRightIcon}
              iconPlacement="right"
              className="w-fit mt-4 text-xs h-6"
            >
              Start Minting
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
