
import User from '../models/User';
import ApiError from '../utils/apiError';
import { generateToken } from '../config/jwt';
import bcrypt from 'bcryptjs';

export const registerUser = async (
  username: string,
  password: string,
  role: 'admin' | 'vendor',
  vendorId?: string
) => {
  if (await User.findOne({ username })) {
    throw new ApiError(400, 'Username already exists');
  }

  const user = new User({
    username,
    password: await bcrypt.hash(password, 12),
    role,
    vendorId
  });

  await user.save();
  return user;
};

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, 'Invalid credentials');
  }

  return {
    token: generateToken(user.id, user.role),
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      vendorId: user.vendorId
    }
  };
};

export const refreshToken = async (token: string) => {
  const decoded = verifyToken(token) as { sub: string; role: string };
  return generateToken(decoded.sub, decoded.role);
};
