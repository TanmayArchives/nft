"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SelectTheme } from "./theme-toggle";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function NavBar() {
  const wallet = useWallet();

  return (
    <>
      <header>
        <nav className="flex items-center justify-between gap-2 p-3 rounded-xl">
          <div className="flex flex-1 font-medium items-center gap-4">
            <Link href="/verify">
              <Button variant={"linkHover2"} className="cursor-pointer">
                Verify
              </Button>
            </Link>
            <Link href="/mint">
              <Button variant={"linkHover2"} className="cursor-pointer">
                Mint
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant={"linkHover2"} className="cursor-pointer">
                FAQ
              </Button>
            </Link>
          </div>
          <Link
            href={"/"}
            className="flex flex-1 text-2xl justify-center items-center font-serifItalic font-semibold"
          >
            <span className="">100x</span>
            <span className="text-purple-400">NFT</span>
          </Link>
          <div className="flex flex-1 items-center justify-end gap-2">
            <SelectTheme />
            <WalletMultiButton />
          </div>
        </nav>
      </header>
    </>
  );
}
