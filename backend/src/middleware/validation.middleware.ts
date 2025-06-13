
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ApiError from '../utils/apiError';

export const validate = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    
    const errorMessages = errors.array().map(err => err.msg);
    next(new ApiError(400, errorMessages.join(', ')));
  };
};
