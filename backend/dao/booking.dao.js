import Booking from '../models/Booking.model.js';

const bookingPopulate = [
  { path: 'service', select: 'title category shopName city price durationMinutes' },
  { path: 'vendor', select: 'name email phone vendorProfile' },
  { path: 'user', select: 'name email phone' },
];

export const createBookingDoc = (payload) => Booking.create(payload);

export const findBookingById = (bookingId) => Booking.findById(bookingId).populate(bookingPopulate);

export const findUserBookings = (userId) =>
  Booking.find({ user: userId }).populate(bookingPopulate).sort({ createdAt: -1 });

export const findVendorBookings = (vendorId) =>
  Booking.find({ vendor: vendorId }).populate(bookingPopulate).sort({ createdAt: -1 });

export const findAllBookings = () => Booking.find({}).populate(bookingPopulate).sort({ createdAt: -1 });

export const updateBookingById = (bookingId, update) =>
  Booking.findByIdAndUpdate(bookingId, update, { new: true }).populate(bookingPopulate);
