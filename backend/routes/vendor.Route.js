import { Router } from 'express';
import {
  createVendorServiceByMe,
  deleteVendorServiceByMe,
  getVendorBookings,
  getVendorServices,
  meVendor,
  updateVendorBookingStatusByMe,
  updateVendorServiceByMe,
  updateMeVendor,
} from '../controllers/vendor.Controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

const router = Router();

router.use(requireAuth, requireRole('vendor'));

router.get('/me', meVendor);
router.patch('/me', updateMeVendor);

router.get('/services', getVendorServices);
router.post('/services', createVendorServiceByMe);
router.patch('/services/:id', updateVendorServiceByMe);
router.delete('/services/:id', deleteVendorServiceByMe);

router.get('/bookings', getVendorBookings);
router.patch('/bookings/:id/status', updateVendorBookingStatusByMe);

export default router;
