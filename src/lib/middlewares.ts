import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export function withRateLimit(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const key = `rate-limit:${ip}`;
    
    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, 60); // 1 minute expiry
    }
    
    if (current > 5) { // 5 requests per minute
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }
    
    return handler(req, res);
  };
} 