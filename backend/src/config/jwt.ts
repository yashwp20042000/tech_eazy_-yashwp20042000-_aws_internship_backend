
import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError';

export const generateToken = (userId: string, role: string) => {
  return jwt.sign(
    { sub: userId, role },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired token');
  }
};
