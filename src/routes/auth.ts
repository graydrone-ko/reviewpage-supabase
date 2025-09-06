import { Router } from 'express';
import { register, login, registerValidation, loginValidation } from '../controllers/authController';
import { checkDuplicate, checkDuplicateValidation } from '../controllers/duplicateCheckController';

const router = Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/check-duplicate', checkDuplicateValidation, checkDuplicate);

export default router;