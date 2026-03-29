import {Router} from 'express';
import { getDashboardData } from '../controllers/dashboardControllers';

const router = Router();

router.get('/', getDashboardData);

export default router;