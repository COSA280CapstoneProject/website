const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer'); // You need to configure this with your mail server details
const crypto = require('crypto'); // Node.js module for generating a secure token
const adminController = {
    // Admin login
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const admin = await Admin.findOne({ where: { username } });

            if (!admin || !await bcrypt.compare(password, admin.password_hash)) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            return res.json({ token });
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    },

    // Add a new admin
    addAdmin: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { firstName, lastName, email, username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = await Admin.create({ firstName, lastName, email, username, password_hash: hashedPassword });

            res.status(201).json(newAdmin);
        } catch (error) {
            res.status(500).json({ message: 'Error creating new admin' });
        }
    },

    // Edit an existing admin
    editAdmin: async (req, res) => {
        try {
            const { adminId } = req.params;
            const { firstName, lastName, email, username } = req.body;

            const admin = await Admin.findByPk(adminId);
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            admin.firstName = firstName || admin.firstName;
            admin.lastName = lastName || admin.lastName;
            admin.email = email || admin.email;
            admin.username = username || admin.username;

            await admin.save();
            res.json(admin);
        } catch (error) {
            res.status(500).json({ message: 'Error updating admin' });
        }
    },

    // Remove an admin
    removeAdmin: async (req, res) => {
        try {
            const { adminId } = req.params;
            const admin = await Admin.findByPk(adminId);
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            await admin.destroy();
            res.status(200).json({ message: 'Admin removed' });
        } catch (error) {
            res.status(500).json({ message: 'Error removing admin' });
        }
    },

    // Change password
    changePassword: async (req, res) => {
        try {
            const { adminId } = req.user; // Assuming JWT contains admin ID
            const { oldPassword, newPassword } = req.body;

            const admin = await Admin.findByPk(adminId);
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            const match = await bcrypt.compare(oldPassword, admin.password_hash);
            if (!match) {
                return res.status(401).json({ message: 'Old password is incorrect' });
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            admin.password_hash = hashedNewPassword;
            await admin.save();

            res.json({ message: 'Password successfully changed' });
        } catch (error) {
            res.status(500).json({ message: 'Error changing password' });
        }
    },


// Reset password request
    resetPasswordRequest: async (req, res) => {
        try {
            const { email } = req.body;
            const admin = await Admin.findOne({ where: { email } });

            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            // Generate a random reset token
            const resetToken = crypto.randomBytes(20).toString('hex');
            const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

            // Update the admin with the reset token and expiry
            admin.resetPasswordToken = resetToken;
            admin.resetPasswordExpires = resetTokenExpiry;
            await admin.save();

            // Nodemailer setup
            let transporter = nodemailer.createTransport({
                // ...configure your SMTP settings...
            });

            const resetUrl = `https://yourfrontenddomain.com/reset-password/${resetToken}`;

            // Sending email
            let info = await transporter.sendMail({
                from: '"Your Company Name" <your-email@example.com>',
                to: email,
                subject: "Password Reset Request",
                text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
            });

            res.json({ message: 'Password reset email sent' });
        } catch (error) {
            res.status(500).json({ message: 'Error sending password reset email' });
        }
    },

// Perform password reset
    resetPassword: async (req, res) => {
        try {
            const { resetToken, newPassword } = req.body;
            const admin = await Admin.findOne({
                where: {
                    resetPasswordToken: resetToken,
                    resetPasswordExpires: {
                        [Op.gt]: Date.now() // Sequelize operator for 'greater than'
                    }
                }
            });

            if (!admin) {
                return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
            }

            // Hash new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            admin.password_hash = hashedNewPassword;
            admin.resetPasswordToken = null; // Clear the reset token
            admin.resetPasswordExpires = null; // Clear the token expiry
            await admin.save();

            res.json({ message: 'Password successfully reset' });
        } catch (error) {
            res.status(500).json({ message: 'Error resetting password' });
        }
    }



};

module.exports = adminController;
