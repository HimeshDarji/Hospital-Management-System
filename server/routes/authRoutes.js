const express = require('express');
const { body, param } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');
const { validate } = require('../middleware/validationMiddleware');

const router = express.Router();
const passwordRule = body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.').matches(/[a-z]/).withMessage('Password must include a lowercase letter.').matches(/[A-Z]/).withMessage('Password must include an uppercase letter.').matches(/\d/).withMessage('Password must include a number.');
const registerRules = [body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Please enter your full name.'), body('email').isEmail().normalizeEmail().withMessage('Enter a valid email address.'), body('phone').trim().isLength({ min: 7, max: 18 }).withMessage('Enter a valid mobile number.'), passwordRule, body('role').isIn(['admin', 'doctor', 'receptionist', 'patient']).withMessage('Select a valid role.'), body('gender').isIn(['male', 'female', 'other', 'prefer-not-to-say']).withMessage('Select a valid gender.'), body('dob').isISO8601().toDate().withMessage('Enter a valid date of birth.'), body('address').trim().isLength({ min: 5, max: 300 }).withMessage('Enter your address.')];

router.post('/register', upload.single('profileImage'), registerRules, validate, authController.register);
router.post('/login', [body('email').isEmail().normalizeEmail(), body('password').notEmpty(), body('role').optional().isIn(['admin', 'doctor', 'receptionist', 'patient'])], validate, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.post('/forgot-password', [body('email').isEmail().normalizeEmail().withMessage('Enter a valid email address.')], validate, authController.forgotPassword);
router.post('/reset-password/:token', [param('token').isHexadecimal().isLength({ min: 64, max: 64 }), passwordRule], validate, authController.resetPassword);
router.get('/verify-email/:token', [param('token').isHexadecimal().isLength({ min: 64, max: 64 })], validate, authController.verifyEmail);
router.post('/resend-verification', authenticate, authController.resendVerification);
router.get('/me', authenticate, authController.getCurrentUser);

module.exports = router;
