import { Redis } from '@upstash/redis';

let redis: Redis | null = null;
try {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_URL!,
    token: process.env.UPSTASH_REDIS_TOKEN!,
  });
} catch (error) {
  console.error('Redis connection error:', error);
}

export class VerificationService {
  private static RATE_LIMIT = 5;
  private static PROOF_EXPIRY = 60 * 5;

  static async verifyEmail(email: string, clientIp: string): Promise<{ proof: string }> {
    try {
      // Check if email is in allowed list first
      const isVerified = await this.checkCourseParticipant(email);
      if (!isVerified) {
        throw new Error('Email not found in course participants list.');
      }

      // Generate proof without Redis dependency
      const proof = await this.generateProof(email);

      // Try Redis operations only if Redis is connected
      if (redis) {
        try {
          // Rate limiting
          const rateLimited = await this.checkRateLimit(clientIp);
          if (rateLimited) {
            throw new Error('Too many requests. Please try again later.');
          }

          // Store proof
          await redis.setex(`proof:${email}`, this.PROOF_EXPIRY, proof);
        } catch (redisError) {
          console.error('Redis operation error:', redisError);
          // Continue even if Redis fails
        }
      }

      return { proof };
    } catch (error: any) {
      console.error('Verification error:', error);
      throw error;
    }
  }

  private static async checkRateLimit(clientIp: string): Promise<boolean> {
    if (!redis) return false;

    try {
      const key = `rate-limit:${clientIp}`;
      const current = await redis.incr(key);
      if (current === 1) {
        await redis.expire(key, 60);
      }
      return current > this.RATE_LIMIT;
    } catch (error) {
      console.error('Rate limit check error:', error);
      return false;
    }
  }

  private static async checkCourseParticipant(email: string): Promise<boolean> {
    const validEmails = new Set([
      'student1@100xdevs.com',
      'student2@100xdevs.com',
      'test@100xdevs.com'
    ]);

    return validEmails.has(email.toLowerCase());
  }

  private static async generateProof(email: string): Promise<string> {
    const timestamp = Date.now();
    const message = `100xDevs-NFT-${email}-${timestamp}`;
    return Buffer.from(message).toString('base64');
  }
} 