
import { Router } from 'express';
import { 
  createParcel,
  getParcelByTrackingId,
  getTodayParcels,
  updateParcelStatus
} from '../controllers/parcel.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['admin']),
  validate([
    body('trackingId').notEmpty(),
    body('pincode').notEmpty(),
    body('deliveryOrderId').notEmpty()
  ]),
  createParcel
);

router.get(
  '/today',
  authenticate,
  authorize(['admin']),
  getTodayParcels
);

router.get(
  '/track/:trackingId',
  getParcelByTrackingId
);

router.patch(
  '/:id/status',
  authenticate,
  authorize(['admin']),
  validate([
    body('status').isIn(['pending', 'in-transit', 'delivered'])
  ]),
  updateParcelStatus
);

export default router;
