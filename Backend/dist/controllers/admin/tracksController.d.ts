import type { Request, Response } from 'express';
import multer from 'multer';
export declare const upload: multer.Multer;
export declare const createTrack: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTrack: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteTrack: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=tracksController.d.ts.map