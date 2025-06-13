
import { Request, Response, NextFunction } from 'express';
import Vendor from '../models/Vendor';
import ApiError from '../utils/apiError';

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, contactInfo } = req.body;
    const vendor = new Vendor({ name, contactInfo });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    next(error);
  }
};

export const getVendors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    next(error);
  }
};

export const getVendorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) throw new ApiError(404, 'Vendor not found');
    res.json(vendor);
  } catch (error) {
    next(error);
  }
};

export const updateVendor = async (id: string, payload: any) => {
  const vendor = await Vendor.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true }
  );
  if (!vendor) {
    throw new ApiError(404, 'Vendor not found');
  }
  return vendor;
};

export const deleteVendor = async (id: string) => {
  const vendor = await Vendor.findByIdAndDelete(id);
  if (!vendor) {
    throw new ApiError(404, 'Vendor not found');
  }
  return vendor;
};
