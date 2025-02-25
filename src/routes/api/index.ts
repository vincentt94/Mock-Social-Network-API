import {Router} from 'express';
const router = Router();
//  import routes from users
import userRoutes from './userRoutes.js';

// import routes from thoughts
 import thoughtsRoutes from './thoughtsRoutes.js';


router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoutes);

export default router;