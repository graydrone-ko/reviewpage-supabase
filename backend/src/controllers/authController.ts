import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../utils/database';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

export const registerValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('role').isIn(['SELLER', 'CONSUMER', 'ADMIN']).withMessage('Role must be SELLER, CONSUMER, or ADMIN'),
  body('birthDate').isLength({ min: 6, max: 6 }).withMessage('Birth date must be YYMMDD format'),
  body('gender').isIn(['MALE', 'FEMALE']).withMessage('Gender must be MALE or FEMALE'),
  body('phoneNumber').isLength({ min: 11, max: 11 }).withMessage('Phone number must be 11 digits'),
  body('bankCode').notEmpty().withMessage('Bank code is required'),
  body('accountNumber').notEmpty().withMessage('Account number is required')
];

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, role, birthDate, gender, phoneNumber, bankCode, accountNumber } = req.body;

    // 전화번호 정규화 (하이픈 제거)
    const normalizedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // 이메일 중복 검사
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUserByEmail) {
      return res.status(400).json({ error: '이미 사용 중인 이메일입니다.' });
    }

    // 전화번호 중복 검사
    const existingUserByPhone = await prisma.user.findUnique({
      where: { phoneNumber: normalizedPhoneNumber }
    });

    if (existingUserByPhone) {
      return res.status(400).json({ error: '이미 사용 중인 전화번호입니다.' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        birthDate,
        gender,
        phoneNumber: normalizedPhoneNumber,
        bankCode,
        accountNumber
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        birthDate: true,
        gender: true,
        phoneNumber: true,
        bankCode: true,
        accountNumber: true,
        createdAt: true
      }
    });

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      birthDate: user.birthDate,
      gender: user.gender
    });

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Prisma unique constraint 오류 처리
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0];
      if (field === 'email') {
        return res.status(400).json({ error: '이미 사용 중인 이메일입니다.' });
      } else if (field === 'phoneNumber') {
        return res.status(400).json({ error: '이미 사용 중인 전화번호입니다.' });
      }
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      birthDate: user.birthDate,
      gender: user.gender
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        birthDate: user.birthDate,
        gender: user.gender,
        phoneNumber: user.phoneNumber,
        bankCode: user.bankCode,
        accountNumber: user.accountNumber
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};