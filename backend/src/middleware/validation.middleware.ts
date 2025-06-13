
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ApiError from '../utils/apiError';
import { 
  emailRegex, 
  phoneRegex, 
  pincodeRegex,
  trackingIdRegex,
  regexErrors
} from '../utils/regex';

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return phoneRegex.test(phone);
};

export const validatePincode = (pincode: string): boolean => {
  return pincodeRegex.test(pincode);
};

export const validateTrackingId = (trackingId: string): boolean => {
  return trackingIdRegex.test(trackingId);
};

export const validateRequestFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: Record<string, string> = {};
    
    fields.forEach(field => {
      const value = req.body[field];
      
      if (!value) {
        errors[field] = `${field} is required`;
        return;
      }

      switch (field) {
        case 'email':
          if (!validateEmail(value)) errors[field] = regexErrors.email;
          break;
        case 'phone':
          if (!validatePhone(value)) errors[field] = regexErrors.phone;
          break;
        case 'pincode':
          if (!validatePincode(value)) errors[field] = regexErrors.pincode;
          break;
        case 'trackingId':
          if (!validateTrackingId(value)) errors[field] = regexErrors.trackingId;
          break;
      }
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors
      });
    }

    next();
  };
};

export const validate = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    
    const errorMessages = errors.array().map(err => err.msg);
    next(new ApiError(400, errorMessages.join(', ')));
  };
};
