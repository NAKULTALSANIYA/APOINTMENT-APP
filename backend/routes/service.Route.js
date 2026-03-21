import { Router } from 'express';
import {
  getServiceById,
  getServiceCategories,
  getServices,
} from '../controllers/service.Controller.js';

const router = Router();

router.get('/categories', getServiceCategories);
router.get('/', getServices);
router.get('/:id', getServiceById);

export default router;
