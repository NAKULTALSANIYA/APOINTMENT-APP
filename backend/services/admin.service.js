import { findAllUsers, findUserById, updateUserById } from '../dao/auth.dao.js';
import { findAllBookings } from '../dao/booking.dao.js';
import { findAllServices } from '../dao/service.dao.js';
import { findAllVendors, updateVendorByUserId } from '../dao/vendor.dao.js';

const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const listUsersForAdmin = () => findAllUsers();

export const changeUserRole = async (userId, role) => {
  if (!['admin', 'user', 'vendor'].includes(role)) {
    throw createError(400, 'Invalid role');
  }

  const user = await findUserById(userId);

  if (!user) {
    throw createError(404, 'User not found');
  }

  return updateUserById(userId, { role });
};

export const updateVendorApproval = async (userId, isApproved) => {
  const user = await findUserById(userId);

  if (!user) {
    throw createError(404, 'User not found');
  }

  if (user.role !== 'vendor') {
    throw createError(400, 'Only vendor users can be approved');
  }

  const approvedValue = Boolean(isApproved);

  await updateVendorByUserId(userId, {
    isApproved: approvedValue,
  });

  return updateUserById(userId, {
    'vendorProfile.isApproved': approvedValue,
  });
};

export const listAllBookingsForAdmin = () => findAllBookings();

export const listAllServicesForAdmin = () => findAllServices();

export const listAllVendorsForAdmin = () => findAllVendors();
