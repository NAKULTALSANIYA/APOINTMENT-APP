import mongoose from 'mongoose';

const serviceCategoryEnum = [
  'salon',
  'beauty-parlor',
  'doctor-appointment',
  'hospital',
  'home-service',
  'car-bike-service',
  'lawyer',
  'hotel-guest-room',
  'education',
];

const serviceSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: serviceCategoryEnum,
      required: true,
      index: true,
    },
    shopName: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    address: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    durationMinutes: {
      type: Number,
      min: 15,
      default: 60,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SERVICE_CATEGORIES = serviceCategoryEnum;

const Service = mongoose.model('Service', serviceSchema);

export default Service;
