import Service from '../models/Service.model.js';

export const createServiceDoc = (payload) => Service.create(payload);

export const findServiceById = (serviceId) =>
  Service.findById(serviceId).populate('vendor', 'name email phone role vendorProfile');

export const findPublicServices = ({ category, city, vendor, search }) => {
  const query = { isActive: true };

  if (category) {
    query.category = category;
  }

  if (city) {
    query.city = city;
  }

  if (vendor) {
    query.vendor = vendor;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { shopName: { $regex: search, $options: 'i' } },
    ];
  }

  return Service.find(query)
    .populate('vendor', 'name email phone vendorProfile')
    .sort({ createdAt: -1 });
};

export const findVendorServices = (vendorId) =>
  Service.find({ vendor: vendorId }).sort({ createdAt: -1 });

export const updateVendorService = (serviceId, vendorId, payload) =>
  Service.findOneAndUpdate({ _id: serviceId, vendor: vendorId }, payload, {
    new: true,
  });

export const softDeleteVendorService = (serviceId, vendorId) =>
  Service.findOneAndUpdate({ _id: serviceId, vendor: vendorId }, { isActive: false }, { new: true });

export const findAllServices = () =>
  Service.find({})
    .populate('vendor', 'name email role vendorProfile')
    .sort({ createdAt: -1 });
