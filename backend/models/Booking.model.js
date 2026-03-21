import mongoose from 'mongoose';

const bookingStatusEnum = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];

const bookingSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
      index: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    scheduleAt: {
      type: Date,
      required: true,
      index: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: bookingStatusEnum,
      default: 'pending',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BOOKING_STATUSES = bookingStatusEnum;

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
