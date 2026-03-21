import { Router } from 'express';
import {
  cancelBookingByUser,
  createServiceBooking,
  getMyBookings,
} from '../controllers/booking.Controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

const router = Router();

router.post('/', requireAuth, requireRole('user'), createServiceBooking);
router.get('/my-bookings', requireAuth, requireRole('user'), getMyBookings);
router.patch('/my-bookings/:id/cancel', requireAuth, requireRole('user'), cancelBookingByUser);

export default router;
