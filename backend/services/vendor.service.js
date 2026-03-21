import { findVendorByUserId, updateVendorByUserId } from '../dao/vendor.dao.js';
import {
  createVendorService,
  editVendorService,
  listVendorServices,
  removeVendorService,
} from './service.service.js';
import { listVendorBookingQueue, updateVendorBookingStatus } from './booking.service.js';

const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const getVendorProfile = async (user) => {
  const vendor = await findVendorByUserId(user._id);

  if (!vendor) {
    throw createError(404, 'Vendor profile not found');
  }

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    vendor,
  };
};

export const updateVendorProfile = async (userId, payload) => {
  const allowedUpdate = {
    businessName: payload.businessName,
    category: payload.category,
    city: payload.city,
    address: payload.address,
  };

  return updateVendorByUserId(userId, allowedUpdate);
};

export const getMyVendorServices = (vendorId) => listVendorServices(vendorId);

export const createMyVendorService = (vendorId, payload) => createVendorService(vendorId, payload);

export const updateMyVendorService = (serviceId, vendorId, payload) =>
  editVendorService(serviceId, vendorId, payload);

export const deleteMyVendorService = (serviceId, vendorId) =>
  removeVendorService(serviceId, vendorId);

export const getMyVendorBookings = (vendorId) => listVendorBookingQueue(vendorId);

export const updateMyVendorBookingStatus = (bookingId, vendorId, status) =>
  updateVendorBookingStatus(bookingId, vendorId, status);
