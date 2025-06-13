
import mongoose, { Document, Schema } from 'mongoose';

export type ParcelStatus = 'created' | 'in_transit' | 'delivered' | 'returned';

export interface IParcel extends Document {
  trackingId: string;
  vendorId: Schema.Types.ObjectId;
  pincode: string;
  status: ParcelStatus;
  deliveryOrderId: Schema.Types.ObjectId;
  deliveryAttempts: number;
  lastAttemptAt?: Date;
}

const ParcelSchema = new mongoose.Schema<IParcel>({
  trackingId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  pincode: {
    type: String,
    required: true,
    match: /^[0-9]{6}$/
  },
  status: {
    type: String,
    enum: ['created', 'in_transit', 'delivered', 'returned'],
    default: 'created'
  },
  deliveryOrderId: {
    type: Schema.Types.ObjectId,
    ref: 'DeliveryOrder',
    required: true
  },
  deliveryAttempts: {
    type: Number,
    default: 0
  },
  lastAttemptAt: {
    type: Date
  }
}, { timestamps: true });

// Compound indexes for common queries
ParcelSchema.index({ pincode: 1, status: 1 });
ParcelSchema.index({ vendorId: 1, status: 1 });

export default mongoose.model<IParcel>('Parcel', ParcelSchema);
