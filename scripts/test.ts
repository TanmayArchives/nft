import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { NFTProgram } from '../src/program/nft_program';

async function main() {
  // Connect to devnet
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  
  // Create a test wallet
  const wallet = Keypair.generate();
  
  // Test email verification
  const testEmail = 'test@100xdevs.com';
  
  try {
    // Test verification
    const response = await fetch('http://localhost:3000/api/verify-enrollment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail }),
    });
    
    const { proof } = await response.json();
    console.log('Verification successful, proof:', proof);

    // Test minting
    const tx = await NFTProgram.verifyAndMint(
      connection,
      wallet.publicKey,
      testEmail,
      proof
    );
    console.log('Mint successful, tx:', tx);

  } catch (error) {
    console.error('Test failed:', error);
  }
}

main(); 