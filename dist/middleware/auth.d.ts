import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/express';
export declare const authenticateToken: (req: AuthRequest, res: Response, next: NextFunction) => any;
export declare const requireRole: (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => any;
//# sourceMappingURL=auth.d.ts.map