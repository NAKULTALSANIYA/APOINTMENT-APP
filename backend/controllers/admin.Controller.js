import {
  changeUserRole,
  listAllBookingsForAdmin,
  listAllServicesForAdmin,
  listAllVendorsForAdmin,
  listUsersForAdmin,
  updateVendorApproval,
} from '../services/admin.service.js';

export const getUsers = async (req, res) => {
  try {
    const users = await listUsersForAdmin();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch users',
    });
  }
};

export const getVendors = async (req, res) => {
  try {
    const vendors = await listAllVendorsForAdmin();

    return res.status(200).json({
      success: true,
      data: vendors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch vendors',
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const user = await changeUserRole(req.params.id, req.body.role);

    return res.status(200).json({
      success: true,
      message: 'User role updated',
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to update role',
    });
  }
};

export const setVendorApproval = async (req, res) => {
  try {
    const user = await updateVendorApproval(req.params.id, req.body.isApproved);

    return res.status(200).json({
      success: true,
      message: 'Vendor approval updated',
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to update vendor approval',
    });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await listAllServicesForAdmin();

    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch services',
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await listAllBookingsForAdmin();

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch bookings',
    });
  }
};
