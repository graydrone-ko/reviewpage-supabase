import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const getSurveyParticipationStatus: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getBulkParticipationStatus: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUserSurveyResponse: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateSurveyResponse: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=surveyParticipationController.d.ts.map