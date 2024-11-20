import React from "react";
import Link from "next/link";
import { Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="h-fit py-8 bg-gradient-to-b from-accent/50 rounded-t-3xl">
        <section className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="text-3xl font-serifItalic font-bold">
                <span className="">100x</span>
                <span className="text-purple-400">NFT</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Exclusive NFT collection for 100xDevs Web3 cohort members. 
                Built with ❤️ on Solana.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/verify" className="text-muted-foreground hover:text-primary">
                    Verify Enrollment
                  </Link>
                </li>
                <li>
                  <Link href="/mint" className="text-muted-foreground hover:text-primary">
                    Mint NFT
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Community</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com/100xDevs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="https://github.com/100xDevs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-accent/50 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} 100xDevs NFT. All rights reserved.</p>
          </div>
        </section>
      </footer>
    </>
  );
}
