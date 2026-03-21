import {
  createVendorService,
  editVendorService,
  getCategories,
  getServiceDetails,
  listPublicServices,
  listVendorServices,
  removeVendorService,
} from '../services/service.service.js';

export const getServiceCategories = (req, res) => {
  return res.status(200).json({
    success: true,
    data: getCategories(),
  });
};

export const createService = async (req, res) => {
  try {
    const service = await createVendorService(req.user._id, req.body);

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

export const getServices = async (req, res) => {
  try {
    const services = await listPublicServices(req.query);

    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch services',
    });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await getServiceDetails(req.params.id);

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch service',
    });
  }
};

export const getMyServices = async (req, res) => {
  try {
    const services = await listVendorServices(req.user._id);

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

export const updateMyService = async (req, res) => {
  try {
    const updated = await editVendorService(req.params.id, req.user._id, req.body);

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

export const deleteMyService = async (req, res) => {
  try {
    const deleted = await removeVendorService(req.params.id, req.user._id);

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
