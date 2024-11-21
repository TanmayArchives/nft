import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { X100Nft } from "../target/types/x100_nft";

async function main() {
  // Configure the client
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Deploy the program
  const program = anchor.workspace.X100Nft as Program<X100Nft>;
  
  // Initialize the collection
  const collectionState = anchor.web3.Keypair.generate();
  
  await program.methods
    .initialize("your_collection_uri")
    .accounts({
      authority: provider.wallet.publicKey,
      collectionState: collectionState.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([collectionState])
    .rpc();

  console.log("Program deployed and initialized!");
  console.log("Collection State:", collectionState.publicKey.toString());
}

main().then(
  () => process.exit(0),
).catch(
  (error) => {
    console.error(error);
    process.exit(1);
  }
); 