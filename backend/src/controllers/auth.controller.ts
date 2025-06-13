
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import ApiError from '../utils/apiError';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) throw new ApiError(401, 'Invalid credentials');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(401, 'Invalid credentials');
    
    const token = jwt.sign(
      { sub: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = (req: Request, res: Response) => {
  res.json(req.user);
};
