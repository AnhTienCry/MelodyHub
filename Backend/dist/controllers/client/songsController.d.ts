import type { Request, Response } from 'express';
export declare const listSongs: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getSong: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const _default: {
    listSongs: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getSong: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=songsController.d.ts.map