import type { Request, Response, NextFunction } from 'express';
import { type ValidationChain } from 'express-validator';
export declare const validate: (validations: ValidationChain[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validateRequest.d.ts.map