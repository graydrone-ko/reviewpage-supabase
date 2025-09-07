import { Request, Response, NextFunction } from 'express';
export interface AdminRequest extends Request {
    admin?: {
        id: string;
        email: string;
        role: string;
    };
}
export declare const adminAuth: (req: AdminRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
//# sourceMappingURL=adminAuth.d.ts.map