
import { Router } from 'express';
import authRoutes from './auth.routes';
import deliveryRoutes from './delivery.routes';
import parcelRoutes from './parcel.routes';
import vendorRoutes from './vendor.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/delivery', deliveryRoutes);
router.use('/parcels', parcelRoutes);
router.use('/vendors', vendorRoutes);

export default router;
