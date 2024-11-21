import { Connection, TransactionSignature } from '@solana/web3.js';
import { Redis } from '@upstash/redis';

export class TransactionMonitor {
  private static redis = new Redis({
    url: process.env.UPSTASH_REDIS_URL!,
    token: process.env.UPSTASH_REDIS_TOKEN!,
  });

  static async monitorTransaction(
    connection: Connection,
    signature: TransactionSignature,
    email: string
  ): Promise<boolean> {
    try {
      const confirmation = await connection.confirmTransaction(signature);
      
      if (confirmation.value.err) {
        throw new Error('Transaction failed');
      }

      await this.redis.set(`minted:${email}`, true);
      return true;
    } catch (error) {
      console.error('Transaction monitoring error:', error);
      return false;
    }
  }

  static async checkMintStatus(email: string): Promise<boolean> {
    return Boolean(await this.redis.get(`minted:${email}`));
  }
} 