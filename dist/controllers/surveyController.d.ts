import { Request, Response } from 'express';
import { AuthRequest } from '../types/express';
export declare const createSurveyValidation: any[];
export declare const createSurvey: (req: AuthRequest, res: Response) => Promise<any>;
export declare const getSurveys: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getSurvey: (req: AuthRequest, res: Response) => Promise<any>;
export declare const getTemplates: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateSurvey: (req: AuthRequest, res: Response) => Promise<any>;
export declare const getSurveyResponses: (req: AuthRequest, res: Response) => Promise<any>;
export declare const getTemplate: (req: Request, res: Response) => Promise<any>;
export declare const extendSurvey: (req: AuthRequest, res: Response) => Promise<any>;
export declare const requestSurveyCancellation: (req: AuthRequest, res: Response) => Promise<any>;
//# sourceMappingURL=surveyController.d.ts.map