import { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { NFTProgram } from '@/program/nft_program';

export function MintStatus() {
  const [hasMinted, setHasMinted] = useState<boolean>(false);
  const wallet = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const checkMintStatus = async () => {
      if (!wallet.connected) return;
      
      try {
        // Check if wallet has already minted
        const status = await NFTProgram.checkMintStatus(
          connection,
          wallet.publicKey!
        );
        setHasMinted(status);
      } catch (error) {
        console.error('Failed to check mint status:', error);
      }
    };

    checkMintStatus();
  }, [wallet.connected, wallet.publicKey, connection]);

  if (!wallet.connected) return null;

  return hasMinted ? (
    <div className="text-sm text-green-500">
      You have already minted your 100xDevs NFT!
    </div>
  ) : null;
} 