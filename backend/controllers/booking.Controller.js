import {
  cancelMyBooking,
  createBooking,
  listMyBookings,
  listVendorBookingQueue,
  updateVendorBookingStatus,
} from '../services/booking.service.js';

export const createServiceBooking = async (req, res) => {
  try {
    const booking = await createBooking(req.user._id, req.body);

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to create booking',
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await listMyBookings(req.user._id);

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

export const getVendorBookings = async (req, res) => {
  try {
    const bookings = await listVendorBookingQueue(req.user._id);

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

export const changeVendorBookingStatus = async (req, res) => {
  try {
    const updated = await updateVendorBookingStatus(req.params.id, req.user._id, req.body.status);

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

export const cancelBookingByUser = async (req, res) => {
  try {
    const cancelled = await cancelMyBooking(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      message: 'Booking cancelled',
      data: cancelled,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to cancel booking',
    });
  }
};
