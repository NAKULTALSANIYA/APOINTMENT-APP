import { Router } from 'express';
import {
	adminLogin,
	login,
	me,
	register,
	registerVendor,
	vendorLogin,
} from '../controllers/auth.Controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register-user', register);
router.post('/register-vendor', registerVendor);
router.post('/login-user', login);
router.post('/login-vendor', vendorLogin);
router.post('/login-admin', adminLogin);
router.get('/me', requireAuth, me);

export default router;