import { NextApiRequest, NextApiResponse } from 'next';
import { VerificationService } from './services/verification';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    console.log('Verifying email:', email, 'from IP:', clientIp);

    const result = await VerificationService.verifyEmail(email, clientIp as string);
    
    return res.status(200).json({
      success: true,
      proof: result.proof,
    });

  } catch (error: any) {
    console.error('API Error:', error);
    
    return res.status(400).json({ 
      error: error.message || 'Verification failed. Please make sure you\'re using the email address associated with your course enrollment.'
    });
  }
} 