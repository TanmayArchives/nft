import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from '@solana/web3.js';

const PROGRAM_ID = new PublicKey("FDPnHfvDDmsDQ4uy2qVzwjjZGeKaAVRT38wGFNPykhJC");

async function main() {
    // Configure the client
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    // Create the program interface
    const program = new Program(IDL, PROGRAM_ID, provider);
    
    try {
        // Initialize NFT mint
        const mint = anchor.web3.Keypair.generate();
        const metadata = anchor.web3.Keypair.generate();
        
        console.log("Creating NFT...");
        const tx = await program.methods
            .createNft(
                "My NFT",
                "NFT",
                "https://your-metadata-url.com"
            )
            .accounts({
                mintAuthority: provider.wallet.publicKey,
                mint: mint.publicKey,
                metadata: metadata.publicKey,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                systemProgram: anchor.web3.SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                tokenMetadataProgram: new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),
            })
            .signers([mint, metadata])
            .rpc();

        console.log("Transaction signature:", tx);
        console.log("NFT mint address:", mint.publicKey.toString());
        
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

main().then(
    () => process.exit(0),
).catch((error) => {
    console.error(error);
    process.exit(1);
}); 