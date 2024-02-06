const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// Validation rules
const adminValidationRules = [
    body('username').isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('firstName').not().isEmpty().withMessage('First name is required'),
    body('lastName').not().isEmpty().withMessage('Last name is required'),
    // Add more validation as needed
];

// Admin login
router.post('/login', adminController.login);

// Add a new admin
router.post('/add', authenticateToken, adminValidationRules, adminController.addAdmin);

// Edit an existing admin
router.put('/edit/:adminId', authenticateToken, adminValidationRules, adminController.editAdmin);

// Remove an admin
router.delete('/remove/:adminId', authenticateToken, adminController.removeAdmin);

// Change password
router.post('/change-password', authenticateToken, adminController.changePassword);

// Reset password request (if the password is forgotten)
router.post('/reset-password-request', adminController.resetPasswordRequest);

// Perform password reset
router.post('/reset-password', adminController.resetPassword);

module.exports = router;
