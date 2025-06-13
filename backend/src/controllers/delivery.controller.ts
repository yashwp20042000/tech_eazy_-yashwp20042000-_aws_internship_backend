
import { Request, Response, NextFunction } from 'express';
import DeliveryOrder from '../models/DeliveryOrder';
import ApiError from '../utils/apiError';

export const createDeliveryOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vendorId } = req.user;
    const fileUrl = req.file?.path;
    
    if (!fileUrl) throw new ApiError(400, 'File is required');
    
    const order = new DeliveryOrder({
      vendorId,
      fileUrl,
      status: 'pending'
    });
    
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getDeliveryOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vendorId, date } = req.query;
    const filter: any = {};
    
    if (vendorId) filter.vendorId = vendorId;
    if (date) filter.createdAt = { $gte: new Date(date as string) };
    
    const orders = await DeliveryOrder.find(filter).sort('-createdAt');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
