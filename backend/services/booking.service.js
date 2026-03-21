import {
  createBookingDoc,
  findBookingById,
  findUserBookings,
  findVendorBookings,
  updateBookingById,
} from '../dao/booking.dao.js';
import { findServiceById } from '../dao/service.dao.js';

const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const VENDOR_ALLOWED_STATUS = ['confirmed', 'in-progress', 'completed', 'cancelled'];

export const createBooking = async (userId, payload) => {
  const { serviceId, scheduleAt, contactPhone, address, notes } = payload;

  if (!serviceId || !scheduleAt) {
    throw createError(400, 'serviceId and scheduleAt are required');
  }

  const service = await findServiceById(serviceId);

  if (!service || !service.isActive) {
    throw createError(404, 'Service not found or inactive');
  }

  const bookingDate = new Date(scheduleAt);

  if (Number.isNaN(bookingDate.getTime())) {
    throw createError(400, 'Invalid scheduleAt date');
  }

  if (bookingDate <= new Date()) {
    throw createError(400, 'Booking schedule must be in the future');
  }

  const booking = await createBookingDoc({
    service: service._id,
    vendor: service.vendor._id,
    user: userId,
    scheduleAt: bookingDate,
    contactPhone,
    address,
    notes,
    totalAmount: service.price,
  });

  return findBookingById(booking._id);
};

export const listMyBookings = (userId) => findUserBookings(userId);

export const listVendorBookingQueue = (vendorId) => findVendorBookings(vendorId);

export const updateVendorBookingStatus = async (bookingId, vendorId, status) => {
  if (!VENDOR_ALLOWED_STATUS.includes(status)) {
    throw createError(400, `Invalid status. Allowed: ${VENDOR_ALLOWED_STATUS.join(', ')}`);
  }

  const booking = await findBookingById(bookingId);

  if (!booking) {
    throw createError(404, 'Booking not found');
  }

  if (booking.vendor._id.toString() !== vendorId.toString()) {
    throw createError(403, 'You can only update your own bookings');
  }

  if (booking.status === 'completed') {
    throw createError(400, 'Completed booking cannot be modified');
  }

  return updateBookingById(bookingId, { status });
};

export const cancelMyBooking = async (bookingId, userId) => {
  const booking = await findBookingById(bookingId);

  if (!booking) {
    throw createError(404, 'Booking not found');
  }

  if (booking.user._id.toString() !== userId.toString()) {
    throw createError(403, 'You can only cancel your own booking');
  }

  if (['completed', 'cancelled'].includes(booking.status)) {
    throw createError(400, 'Booking cannot be cancelled now');
  }

  return updateBookingById(bookingId, { status: 'cancelled' });
};
