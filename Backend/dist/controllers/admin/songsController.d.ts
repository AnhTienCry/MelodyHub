import type { Request, Response } from 'express';
import multer from 'multer';
export declare const upload: multer.Multer;
export declare const createSong: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateSong: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteSong: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const _default: {
    createSong: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateSong: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteSong: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    upload: multer.Multer;
};
export default _default;
//# sourceMappingURL=songsController.d.ts.map