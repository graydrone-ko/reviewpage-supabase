import { Router } from 'express';
import { register, login, registerValidation, loginValidation } from '../controllers/authController';
import { checkDuplicate, checkDuplicateValidation } from '../controllers/duplicateCheckController';

const router = Router();

// Test endpoint for auth routes
router.get('/test', (req, res) => {
  res.status(200).json({ 
    message: 'Auth routes working',
    timestamp: new Date().toISOString()
  });
});

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/check-duplicate', checkDuplicateValidation, checkDuplicate);

export default router;