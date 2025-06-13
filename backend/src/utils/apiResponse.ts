
import { Response } from 'express';
import ApiError from './apiError';

export class ApiResponse {
  constructor(
    public success: boolean,
    public data: any,
    public message?: string
  ) {}

  static send(res: Response, data: any, message?: string) {
    res.json(new ApiResponse(true, data, message));
  }

  static error(res: Response, error: Error | ApiError) {
    const statusCode = error instanceof ApiError ? error.statusCode : 500;
    const message = error.message || 'Internal Server Error';
    
    res.status(statusCode).json(new ApiResponse(false, null, message));
  }
}
