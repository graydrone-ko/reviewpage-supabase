import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const submitResponseValidation: import("express-validator").ValidationChain[];
export declare const submitResponse: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMyResponses: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=responseController.d.ts.map