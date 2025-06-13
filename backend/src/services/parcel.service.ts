
import Parcel from '../models/Parcel';
import ApiError from '../utils/apiError';

export const createParcel = async (
  trackingId: string,
  vendorId: string,
  pincode: string,
  deliveryOrderId: string
) => {
  if (await Parcel.findOne({ trackingId })) {
    throw new ApiError(400, 'Tracking ID already exists');
  }
  
  const parcel = new Parcel({
    trackingId,
    vendorId,
    pincode,
    deliveryOrderId
  });
  
  await parcel.save();
  return parcel;
};

export const getParcelsByDate = async (date: Date) => {
  return await Parcel.find({
    createdAt: { $gte: date }
  }).sort('-createdAt');
};

export const updateParcelStatus = async (id: string, status: string) => {
  const parcel = await Parcel.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!parcel) throw new ApiError(404, 'Parcel not found');
  return parcel;
};
