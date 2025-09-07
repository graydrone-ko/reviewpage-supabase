import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const getFinanceStats: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getPayments: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getWithdrawals: (req: AuthRequest, res: Response) => Promise<void>;
export declare const approveWithdrawal: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const rejectWithdrawal: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTransactions: (req: AuthRequest, res: Response) => Promise<void>;
export declare const exportFinanceData: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=financeController.d.ts.map