import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const createSurveyValidation: import("express-validator").ValidationChain[];
export declare const createSurvey: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getSurveys: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getSurvey: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTemplates: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateSurvey: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getSurveyResponses: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTemplate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const extendSurvey: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const requestSurveyCancellation: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=surveyController.d.ts.map