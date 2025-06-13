
import { Router } from 'express';
import { 
  createDeliveryOrder,
  getDeliveryOrders,
  updateOrderStatus
} from '../services/delivery.service';
import { authenticate, authorize } from '../middleware/auth.middleware';
import upload from '../utils/upload';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['vendor']),
  upload.single('file'),
  async (req, res, next) => {
    try {
      const order = await createDeliveryOrder(
        req.user.vendorId || '',
        req.file?.path || ''
      );
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/',
  authenticate,
  authorize(['admin']),
  async (req, res, next) => {
    try {
      const orders = await getDeliveryOrders(req.query);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id/status',
  authenticate,
  authorize(['admin']),
  async (req, res, next) => {
    try {
      const order = await updateOrderStatus(
        req.params.id,
        req.body.status
      );
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
