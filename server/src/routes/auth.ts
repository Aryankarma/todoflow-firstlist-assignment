
import { Router, type Router as ExpressRouter } from 'express';
import { register, login } from '../controllers/authController';
import { validateRegister, validateLogin } from '../middleware/validation';

const router: ExpressRouter = Router();

router.post('/register', validateRegister, register);

router.post('/login', validateLogin, login);

export default router;
