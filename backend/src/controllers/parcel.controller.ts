
import { Request, Response, NextFunction } from 'express';
import Parcel from '../models/Parcel';
import ApiError from '../utils/apiError';

export const createParcel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { trackingId, pincode, deliveryOrderId } = req.body;
    
    const parcel = new Parcel({
      trackingId,
      pincode,
      deliveryOrderId,
      status: 'pending',
      vendorId: req.user.vendorId
    });
    
    await parcel.save();
    res.status(201).json(parcel);
  } catch (error) {
    next(error);
  }
};

export const getParcelByTrackingId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parcel = await Parcel.findOne({ trackingId: req.params.trackingId });
    if (!parcel) throw new ApiError(404, 'Parcel not found');
    res.json(parcel);
  } catch (error) {
    next(error);
  }
};

export const getTodayParcels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const parcels = await Parcel.find({
      createdAt: { $gte: today }
    }).sort('-createdAt');
    
    res.json(parcels);
  } catch (error) {
    next(error);
  }
};

export const updateParcelStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    const parcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!parcel) throw new ApiError(404, 'Parcel not found');
    res.json(parcel);
  } catch (error) {
    next(error);
  }
};
