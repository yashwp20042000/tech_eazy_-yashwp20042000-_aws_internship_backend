
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';
import logger from '../utils/logger';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    logger.error(`${err.statusCode}: ${err.message}`);
    return res.status(err.statusCode).json({ error: err.message });
  }

  logger.error(`500: ${err.message}`);
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};
