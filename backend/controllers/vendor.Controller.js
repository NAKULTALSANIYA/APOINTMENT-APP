import {
  createMyVendorService,
  deleteMyVendorService,
  getMyVendorBookings,
  getMyVendorServices,
  getVendorProfile,
  updateMyVendorBookingStatus,
  updateMyVendorService,
  updateVendorProfile,
} from '../services/vendor.service.js';

export const meVendor = async (req, res) => {
  try {
    const data = await getVendorProfile(req.user);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch vendor profile',
    });
  }
};

export const updateMeVendor = async (req, res) => {
  try {
    const vendor = await updateVendorProfile(req.user._id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Vendor profile updated',
      data: vendor,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to update vendor profile',
    });
  }
};

export const getVendorServices = async (req, res) => {
  try {
    const services = await getMyVendorServices(req.user._id);

    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch vendor services',
    });
  }
};

export const createVendorServiceByMe = async (req, res) => {
  try {
    const service = await createMyVendorService(req.user._id, req.body);

    return res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to create service',
    });
  }
};

export const updateVendorServiceByMe = async (req, res) => {
  try {
    const updated = await updateMyVendorService(req.params.id, req.user._id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: updated,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to update service',
    });
  }
};

export const deleteVendorServiceByMe = async (req, res) => {
  try {
    const deleted = await deleteMyVendorService(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      message: 'Service removed successfully',
      data: deleted,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to remove service',
    });
  }
};

export const getVendorBookings = async (req, res) => {
  try {
    const bookings = await getMyVendorBookings(req.user._id);

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch vendor bookings',
    });
  }
};

export const updateVendorBookingStatusByMe = async (req, res) => {
  try {
    const updated = await updateMyVendorBookingStatus(req.params.id, req.user._id, req.body.status);

    return res.status(200).json({
      success: true,
      message: 'Booking status updated',
      data: updated,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to update booking status',
    });
  }
};
