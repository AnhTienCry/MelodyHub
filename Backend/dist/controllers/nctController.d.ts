import type { Request, Response } from 'express';
export declare const home: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const topic: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const song: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const search: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const playlist: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const lyric: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const top20: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const top100: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const _default: {
    home: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    topic: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    song: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    search: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    playlist: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    lyric: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    top20: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    top100: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=nctController.d.ts.map