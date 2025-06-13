
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import ApiError from '../utils/apiError';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return next(new ApiError(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden'));
    }
    next();
  };
};
