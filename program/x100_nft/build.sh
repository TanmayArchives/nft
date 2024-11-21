#!/bin/bash

# Clean everything
rm -rf target/
rm -rf .anchor/
rm -f Cargo.lock

# Install Solana
sh -c "$(curl -sSfL https://release.solana.com/v1.9.13/install)"
export PATH="/Users/$USER/.local/share/solana/install/active_release/bin:$PATH"

# Build
cargo build-bpf

# Deploy
solana config set --url devnet
solana program deploy \
    --program-id FDPnHfvDDmsDQ4uy2qVzwjjZGeKaAVRT38wGFNPykhJC \
    target/deploy/x100_nft.so 