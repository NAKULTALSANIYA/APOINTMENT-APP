import generateToken from '../utils/generateToken.js';
import { createUser, findUserByEmail, findUserByEmailWithPassword } from '../dao/auth.dao.js';
import { createVendorProfile, findVendorByUserId } from '../dao/vendor.dao.js';

const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const buildAuthResponse = (user, vendorProfile) => ({
  token: generateToken(user._id.toString()),
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    vendorProfile: vendorProfile || user.vendorProfile,
  },
});

export const registerUser = async ({
  name,
  email,
  password,
  phone,
  role,
  vendorProfile,
}) => {
  if (!name || !email || !password) {
    throw createError(400, 'name, email and password are required');
  }

  if (password.length < 6) {
    throw createError(400, 'Password must be at least 6 characters');
  }

  const normalizedRole = role || 'user';

  if (!['user', 'vendor'].includes(normalizedRole)) {
    throw createError(400, 'Only user or vendor registration is allowed');
  }

  if (normalizedRole === 'vendor' && !vendorProfile?.businessName) {
    throw createError(400, 'Vendor businessName is required');
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw createError(409, 'Email is already registered');
  }

  const user = await createUser({
    name,
    email,
    password,
    phone,
    role: normalizedRole,
    vendorProfile: normalizedRole === 'vendor' ? vendorProfile : undefined,
  });

  let savedVendorProfile;

  if (normalizedRole === 'vendor') {
    savedVendorProfile = await createVendorProfile({
      user: user._id,
      businessName: vendorProfile.businessName,
      category: vendorProfile.category,
      city: vendorProfile.city,
      address: vendorProfile.address,
      isApproved: vendorProfile.isApproved,
    });
  }

  return {
    message: 'Registration successful',
    data: buildAuthResponse(user, savedVendorProfile),
  };
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw createError(400, 'email and password are required');
  }

  const user = await findUserByEmailWithPassword(email);

  if (!user) {
    throw createError(401, 'Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw createError(401, 'Invalid email or password');
  }

  const vendorProfile = user.role === 'vendor' ? await findVendorByUserId(user._id) : null;

  return {
    message: 'Login successful',
    data: buildAuthResponse(user, vendorProfile),
  };
};

export const loginVendor = async ({ email, password }) => {
  const result = await loginUser({ email, password });

  if (result.data.user.role !== 'vendor') {
    throw createError(403, 'Only vendor can login from this endpoint');
  }

  return {
    message: 'Vendor login successful',
    data: result.data,
  };
};

export const loginAdmin = async ({ email, password }) => {
  const result = await loginUser({ email, password });

  if (result.data.user.role !== 'admin') {
    throw createError(403, 'Only admin can login from this endpoint');
  }

  return {
    message: 'Admin login successful',
    data: result.data,
  };
};

export const getMyProfile = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  vendorProfile: user.vendorProfile,
  isActive: user.isActive,
  createdAt: user.createdAt,
});
