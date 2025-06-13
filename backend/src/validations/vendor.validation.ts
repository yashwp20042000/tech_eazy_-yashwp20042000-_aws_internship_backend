
import { z } from 'zod';
import { phoneRegex, emailRegex } from '../utils/regex';

const contactInfoSchema = z.object({
  email: z.string().regex(emailRegex, 'Invalid email format'),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  address: z.string().min(10, 'Address must be at least 10 characters')
});

export const createVendorSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  contactInfo: contactInfoSchema
});

export const updateVendorSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').optional(),
  contactInfo: contactInfoSchema.partial().optional()
});
