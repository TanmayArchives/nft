import { NFTStorage, File } from 'nft.storage';

export class NFTMetadata {
  private static getClient() {
    const token = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY;
    if (!token) {
      throw new Error('NFT_STORAGE_KEY is not configured');
    }
    if (!token.startsWith('eyJ')) {
      throw new Error('Invalid NFT.storage API key format');
    }
    return new NFTStorage({ token });
  }

  static async uploadMetadata(email: string): Promise<string> {
    try {
      console.log('Initializing NFT.storage client...');
      const client = this.getClient();

      // Create a more compact SVG
      const svgImage = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500"><rect width="100%" height="100%" fill="#8B5CF6"/><text x="50%" y="45%" text-anchor="middle" font-size="36" fill="white" font-family="Arial">100xDevs</text><text x="50%" y="55%" text-anchor="middle" font-size="24" fill="white" font-family="Arial">NFT</text></svg>`;
      
      // Convert SVG to Blob
      const imageBlob = new Blob([svgImage], { type: 'image/svg+xml' });
      const imageFile = new File([imageBlob], '100xdevs.svg', { type: 'image/svg+xml' });

      console.log('Uploading image to IPFS...');
      let imageCid;
      try {
        imageCid = await client.storeBlob(imageFile);
        console.log('Image uploaded successfully. CID:', imageCid);
      } catch (error) {
        console.error('Image upload error:', error);
        throw new Error('Failed to upload image to IPFS');
      }

      const metadata = {
        name: "100xDevs NFT",
        description: "Proof of participation in 100xDevs Web3 Cohort",
        image: `ipfs://${imageCid}`,
        attributes: [
          {
            trait_type: "Course",
            value: "Web3 Cohort"
          },
          {
            trait_type: "Year",
            value: new Date().getFullYear().toString()
          }
        ]
      };

      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });

      console.log('Uploading metadata to IPFS...');
      let metadataCid;
      try {
        metadataCid = await client.storeBlob(metadataFile);
        console.log('Metadata uploaded successfully. CID:', metadataCid);
      } catch (error) {
        console.error('Metadata upload error:', error);
        throw new Error('Failed to upload metadata to IPFS');
      }

      return `ipfs://${metadataCid}`;
    } catch (error: any) {
      console.error('Metadata upload error:', error);
      throw new Error(error.message || 'Failed to upload NFT metadata');
    }
  }
} 