
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';

export const versionCheck = (supportedVersions: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const version = parseInt(req.headers['x-api-version'] as string) || 1;
    
    if (!supportedVersions.includes(version)) {
      return next(new ApiError(
        400, 
        `Unsupported API version. Supported versions: ${supportedVersions.join(', ')}`
      ));
    }
    
    req.apiVersion = version;
    next();
  };
};
