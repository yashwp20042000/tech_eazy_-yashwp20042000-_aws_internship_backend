
import bcrypt from 'bcryptjs';
import { promisify } from 'util';

const hashAsync = promisify(bcrypt.hash);
const compareAsync = promisify(bcrypt.compare);

export const hashPassword = async (password: string): Promise<string> => {
  return await hashAsync(password, 12);
};

export const verifyPassword = async (
  password: string, 
  hashedPassword: string
): Promise<boolean> => {
  return await compareAsync(password, hashedPassword);
};
