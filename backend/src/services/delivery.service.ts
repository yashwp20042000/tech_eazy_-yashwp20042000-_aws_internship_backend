
import DeliveryOrder from '../models/DeliveryOrder';
import ApiError from '../utils/apiError';

export const createDeliveryOrder = async (
  vendorId: string,
  fileUrl: string
) => {
  const order = new DeliveryOrder({ vendorId, fileUrl });
  await order.save();
  return order;
};

export const getDeliveryOrders = async (filter: any = {}) => {
  return await DeliveryOrder.find(filter).sort('-createdAt');
};

export const updateOrderStatus = async (id: string, status: string) => {
  const order = await DeliveryOrder.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!order) throw new ApiError(404, 'Order not found');
  return order;
};
