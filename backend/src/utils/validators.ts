
import { body } from 'express-validator';

export const authValidators = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
];

export const parcelValidators = [
  body('trackingId')
    .notEmpty().withMessage('Tracking ID is required')
    .isLength({ min: 6 }).withMessage('Tracking ID must be at least 6 characters'),
  
  body('pincode')
    .notEmpty().withMessage('Pincode is required')
    .isPostalCode('any').withMessage('Invalid pincode format'),
  
  body('deliveryOrderId')
    .notEmpty().withMessage('Delivery Order ID is required')
];
