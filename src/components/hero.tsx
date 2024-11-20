import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Image from "next/image";
import {
  coupleGaming,
  menGaming,
  menGaming2,
  womenGaming,
  womenGaming2,
} from "@/constants/images";
import { Heart, Telescope } from "lucide-react";

export default function Hero() {
  return (
    <>
      <section className="w-full relative rotate-12min-h-[80vh] max-h-fit flex flex-col items-center justify-start my-20">
        <div className="absolute z-[-1] transition-all duration-700 ease-out opacity-35 -left-[15rem] rounded-xl bg-gradient-to-t from-purple-400 to-purple-700 blur-[8em] -top-[35rem] size-[40rem]"></div>
        <div className="absolute transition-all duration-700 ease-out opacity-35 -right-[15rem] rounded-xl bg-gradient-to-t from-purple-400 to-purple-700 blur-[8em] top-[25rem] size-[40rem]"></div>

        <Badge className="p-1 rounded-full text-xs px-4 bg-accent/50 text-foreground mb-4 hover:bg-accent/50 border-2 border-primary/80">
          Exclusive for 100xDevs Web3 Cohort Members ✨
        </Badge>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-2 flex flex-col gap-4">
              <h1 className="text-3xl font-semibold max-w-4xl sm:text-4xl md:text-5xl lg:text-6xl/none">
                Claim your
                <span className="bg-gradient-to-tr pl-3 font-serifItalic from-primary to-purple-300 bg-clip-text text-transparent">
                  exclusive
                </span>{" "}
                100xDevs NFT
              </h1>
              <p className="mx-auto max-w-[600px] font-medium md:text-lg">
                Verify your course enrollment and mint your unique 100xDevs NFT on Solana.
                Limited to verified course participants only.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button Icon={Telescope} iconPlacement="right">
                Verify & Mint
              </Button>
              <Button variant={"linkHover2"} className="">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
