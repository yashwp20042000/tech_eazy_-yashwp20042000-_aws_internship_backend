
import mongoose, { Document, Schema } from 'mongoose';

export type DeliveryStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface IDeliveryOrder extends Document {
  vendorId: Schema.Types.ObjectId;
  date: Date;
  fileUrl: string;
  status: DeliveryStatus;
  processedAt?: Date;
}

const DeliveryOrderSchema = new mongoose.Schema<IDeliveryOrder>({
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    index: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  processedAt: {
    type: Date
  }
}, { timestamps: true });

// Compound index for vendor and date queries
DeliveryOrderSchema.index({ vendorId: 1, date: 1 });

export default mongoose.model<IDeliveryOrder>('DeliveryOrder', DeliveryOrderSchema);
