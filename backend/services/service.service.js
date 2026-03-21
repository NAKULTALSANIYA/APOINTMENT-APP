import { SERVICE_CATEGORIES } from '../models/Service.model.js';
import {
  createServiceDoc,
  findAllServices,
  findPublicServices,
  findServiceById,
  findVendorServices,
  softDeleteVendorService,
  updateVendorService,
} from '../dao/service.dao.js';

const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const validateCategory = (category) => {
  if (!SERVICE_CATEGORIES.includes(category)) {
    throw createError(400, `Invalid category. Allowed: ${SERVICE_CATEGORIES.join(', ')}`);
  }
};

export const getCategories = () => SERVICE_CATEGORIES;

export const createVendorService = async (vendorId, payload) => {
  const { title, category, shopName, city, price } = payload;

  if (!title || !category || !shopName || !city || price === undefined) {
    throw createError(400, 'title, category, shopName, city and price are required');
  }

  validateCategory(category);

  return createServiceDoc({
    ...payload,
    vendor: vendorId,
  });
};

export const listPublicServices = async (filters) => {
  if (filters.category) {
    validateCategory(filters.category);
  }

  return findPublicServices(filters);
};

export const getServiceDetails = async (serviceId) => {
  const service = await findServiceById(serviceId);

  if (!service) {
    throw createError(404, 'Service not found');
  }

  return service;
};

export const listVendorServices = (vendorId) => findVendorServices(vendorId);

export const editVendorService = async (serviceId, vendorId, payload) => {
  if (payload.category) {
    validateCategory(payload.category);
  }

  const updated = await updateVendorService(serviceId, vendorId, payload);

  if (!updated) {
    throw createError(404, 'Service not found or not owned by vendor');
  }

  return updated;
};

export const removeVendorService = async (serviceId, vendorId) => {
  const deleted = await softDeleteVendorService(serviceId, vendorId);

  if (!deleted) {
    throw createError(404, 'Service not found or not owned by vendor');
  }

  return deleted;
};

export const listAllServicesForAdmin = () => findAllServices();
