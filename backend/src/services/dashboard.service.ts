
import Parcel from '../models/Parcel';
import { DateRange } from '../types';

export const getVendorMetrics = async (vendorId: string, range: DateRange) => {
    const [delivered, inTransit, returned] = await Promise.all([
        Parcel.countDocuments({
            vendorId,
            status: 'delivered',
            createdAt: { $gte: range.start, $lte: range.end }
        }),
        Parcel.countDocuments({
            vendorId,
            status: 'in_transit',
            createdAt: { $gte: range.start, $lte: range.end }
        }),
        Parcel.countDocuments({
            vendorId,
            status: 'returned',
            createdAt: { $gte: range.start, $lte: range.end }
        })
    ]);

    return { delivered, inTransit, returned };
};
