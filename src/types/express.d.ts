import { Request } from 'express';
import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface AuthRequest extends Request {
  user: User;
}

export interface AdminRequest extends Request {
  user: User;
}