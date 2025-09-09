import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const getMyRewards: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const requestWithdrawal: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRewardStats: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=rewardController.d.ts.map