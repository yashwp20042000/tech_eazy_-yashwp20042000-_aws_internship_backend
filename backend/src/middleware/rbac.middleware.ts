
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Insufficient permissions'));
    }
    next();
  };
};

export const vendorAccess = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'vendor' || !req.user.vendorId) {
    return next(new ApiError(403, 'Vendor access required'));
  }
  next();
};
