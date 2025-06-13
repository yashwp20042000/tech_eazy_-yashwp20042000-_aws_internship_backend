
import { Router } from 'express';
import {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor
} from '../controllers/vendor.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import {
  createVendorSchema,
  updateVendorSchema
} from '../validations/vendor.validation';

const router = Router();

// Admin-only routes
router.use(authenticate, authorize(['admin']));

router.post(
  '/',
  validate(createVendorSchema),
  async (req, res, next) => {
    try {
      const vendor = await createVendor(req.body);
      res.status(201).json({
        success: true,
        data: vendor
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await getVendors({
      page: Number(page),
      limit: Number(limit)
    });
    res.json({
      success: true,
      data: result.vendors,
      meta: result.meta
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const vendor = await getVendorById(req.params.id);
    res.json({
      success: true,
      data: vendor
    });
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:id',
  validate(updateVendorSchema),
  async (req, res, next) => {
    try {
      const vendor = await updateVendor(req.params.id, req.body);
      res.json({
        success: true,
        data: vendor
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteVendor(req.params.id);
    res.json({
      success: true,
      message: 'Vendor deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
