import { findVendorByUserId } from '../dao/vendor.dao.js';

export const requireRole = (...roles) => async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: insufficient permissions',
    });
  }

  if (req.user.role === 'vendor') {
    const vendor = await findVendorByUserId(req.user._id);
    const isApproved = vendor ? vendor.isApproved : req.user.vendorProfile?.isApproved;

    if (isApproved === false) {
      return res.status(403).json({
        success: false,
        message: 'Vendor account is not approved',
      });
    }
  }

  return next();
};
