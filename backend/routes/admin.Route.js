import { Router } from 'express';
import {
  getAllBookings,
  getAllServices,
  getUsers,
  getVendors,
  setVendorApproval,
  updateUserRole,
} from '../controllers/admin.Controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

const router = Router();

router.use(requireAuth, requireRole('admin'));

router.get('/users', getUsers);
router.get('/vendors', getVendors);
router.patch('/users/:id/role', updateUserRole);
router.patch('/vendors/:id/approval', setVendorApproval);
router.get('/services', getAllServices);
router.get('/bookings', getAllBookings);

export default router;
