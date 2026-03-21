import { getMyProfile, loginAdmin, loginUser, loginVendor, registerUser } from '../services/auth.service.js';

export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to register user',
      error: error.message,
    });
  }
};

export const registerVendor = async (req, res) => {
  try {
    const result = await registerUser({
      ...req.body,
      role: 'vendor',
    });

    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to register vendor',
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to login user',
      error: error.message,
    });
  }
};

export const vendorLogin = async (req, res) => {
  try {
    const result = await loginVendor(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to login vendor',
      error: error.message,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const result = await loginAdmin(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to login admin',
      error: error.message,
    });
  }
};

export const me = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: getMyProfile(req.user),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch profile',
    });
  }
};