
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../types';

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
    }

    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string };
      
      const user = await User.findById(decoded.id);
      if (!user) {
        res.status(401).json({ message: 'Invalid token. User not found.' });
        return;
      }

      req.user = {
        id: decoded.id,
        email: decoded.email
      };
      
      next();
    } catch (jwtError) {
      res.status(401).json({ message: 'Invalid token.' });
      return;
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};
