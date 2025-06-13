
export type DateRange = {
  start: Date;
  end: Date;
};

export interface Vendor {
  id: string;
  name: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryOrder {
  id: string;
  vendorId: string;
  date: Date;
  fileUrl: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface Parcel {
  id: string;
  trackingId: string;
  vendorId: string;
  pincode: string;
  status: 'created' | 'in_transit' | 'delivered' | 'returned';
  deliveryOrderId: string;
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  meta: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
};

export type CreateVendorPayload = Omit<Vendor, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateVendorPayload = Partial<CreateVendorPayload>;
