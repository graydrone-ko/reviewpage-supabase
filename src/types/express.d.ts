import { Request } from 'express';
import { User } from '../generated/prisma';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface AuthRequest extends Request {
  user: User;
  body: any;
  params: any;
  query: any;
  headers: any;
}

export interface AdminRequest extends Request {
  user: User;
  body: any;
  params: any;
  query: any;
  headers: any;
  header: (name: string) => string | undefined;
}