
import { ApiResponse, PaginatedResponse } from '../types';

export const successResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data
});

export const errorResponse = (message: string, code: string, details?: any): ApiResponse => ({
  success: false,
  error: { message, code, details }
});

export const paginatedResponse = <T>(
  data: T[],
  meta: PaginatedResponse<T>['meta']
): PaginatedResponse<T> => ({
  success: true,
  data,
  meta
});