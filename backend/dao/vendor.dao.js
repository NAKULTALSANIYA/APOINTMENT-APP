import Vendor from '../models/Vendor.model.js';

export const createVendorProfile = (payload) => Vendor.create(payload);

export const findVendorByUserId = (userId) => Vendor.findOne({ user: userId });

export const updateVendorByUserId = (userId, update) =>
  Vendor.findOneAndUpdate({ user: userId }, update, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });

export const findAllVendors = () =>
  Vendor.find({}).populate('user', 'name email phone role isActive createdAt').sort({ createdAt: -1 });
