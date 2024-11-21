'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { NFTProgram } from '@/program/nft_program';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

export function VerifyMint() {
  const [email, setEmail] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'error'>('idle');
  const [proof, setProof] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  
  const wallet = useWallet();
  const { connection } = useConnection();
  const { toast } = useToast();

  const handleVerify = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setVerificationStatus('verifying');
      const response = await fetch('/api/verify-enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.proof) {
        setProof(data.proof);
        setVerificationStatus('verified');
        toast({
          title: "Success",
          description: "Email verified successfully!",
        });
      } else {
        throw new Error(data.error || 'Verification failed');
      }
    } catch (error: any) {
      setVerificationStatus('error');
      toast({
        title: "Error",
        description: error.message || "Failed to verify email",
        variant: "destructive",
      });
    }
  };

  const handleMint = async () => {
    if (!wallet.connected || !proof) return;

    try {
      setIsMinting(true);
      
      // Call the NFT program to mint
      const tx = await NFTProgram.verifyAndMint(
        connection,
        wallet.publicKey!,
        email,
        proof
      );

      toast({
        title: "Success",
        description: "NFT minted successfully! View it in your wallet.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to mint NFT",
        variant: "destructive",
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 bg-card rounded-lg border shadow-sm">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Course Email Address
        </label>
        <Input 
          id="email"
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your course email"
          disabled={verificationStatus === 'verifying' || verificationStatus === 'verified'}
        />
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={handleVerify}
          disabled={verificationStatus === 'verifying' || verificationStatus === 'verified'}
          className="w-full"
        >
          {verificationStatus === 'verifying' ? 'Verifying...' : 'Verify Enrollment'}
        </Button>
        
        {verificationStatus === 'verified' && (
          <Button 
            onClick={handleMint}
            disabled={!wallet.connected}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Mint NFT
          </Button>
        )}
      </div>

      {verificationStatus === 'error' && (
        <p className="text-sm text-red-500">
          Verification failed. Please make sure you're using the email address associated with your course enrollment.
        </p>
      )}
    </div>
  );
} 