import { Response } from 'express';
import { AdminRequest } from '../middleware/adminAuth';
export declare const getDashboardStats: (req: AdminRequest, res: Response) => Promise<void>;
export declare const getUsers: (req: AdminRequest, res: Response) => Promise<void>;
export declare const updateSurveyStatus: (req: AdminRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllSurveys: (req: AdminRequest, res: Response) => Promise<void>;
export declare const getPendingSurveys: (req: AdminRequest, res: Response) => Promise<void>;
export declare const getRewards: (req: AdminRequest, res: Response) => Promise<void>;
export declare const updateRewardStatus: (req: AdminRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getSurveyResponses: (req: AdminRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCancellationRequests: (req: AdminRequest, res: Response) => Promise<void>;
export declare const getCancellationRequestStats: (req: AdminRequest, res: Response) => Promise<void>;
export declare const processCancellationRequest: (req: AdminRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRecentCancellationRequests: (req: AdminRequest, res: Response) => Promise<void>;
export declare const getWithdrawalRequests: (req: AdminRequest, res: Response) => Promise<void>;
export declare const processWithdrawalRequest: (req: AdminRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRecentWithdrawalRequests: (req: AdminRequest, res: Response) => Promise<void>;
//# sourceMappingURL=adminController.d.ts.map