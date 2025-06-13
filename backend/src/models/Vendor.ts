
import mongoose, { Document } from 'mongoose';

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface IVendor extends Document {
  name: string;
  contactInfo: ContactInfo;
  createdAt: Date;
  updatedAt: Date;
}

const VendorSchema = new mongoose.Schema<IVendor>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10,15}$/
    },
    address: {
      type: String,
      required: true,
      maxlength: 200
    }
  }
}, { timestamps: true });

// Indexes for better query performance
VendorSchema.index({ name: 1 });
VendorSchema.index({ 'contactInfo.email': 1 }, { unique: true });

export default mongoose.model<IVendor>('Vendor', VendorSchema);
