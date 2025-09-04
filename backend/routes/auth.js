const express = require('express');
const Admin = require('../models/admin_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();
const NodeCache = require('node-cache');
const crypto = require('crypto');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: 'send.one.com', 
  port: 587,          
  secure: false,         
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Initialize memory cache
const cache = new NodeCache({ stdTTL: 600, checkperiod: 60 });

// Signup route
router.post('/signup', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: 'Admin already exists' });

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newAdmin = new Admin({
      first_name,
      last_name,
      email,
      password,
    });

    await newAdmin.save();
    cache.set(email, verificationCode);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${verificationCode}. It will expire in 15 minutes.`,
    });

    res.status(201).json({ message: 'Admin registered. Verify your email.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify email
router.post('/verify-email', (req, res) => {
  const { code } = req.body;

  // Get the email and verification code from the cache
  let email = null;
  cache.keys().forEach((key) => {
    if (cache.get(key) === code) {
      email = key;
    }
  });

  if (!email) {
    return res
      .status(400)
      .json({ message: 'Verification code expired or not found' });
  }
  const storedCode = cache.get(email);

  if (!storedCode) {
    return res
      .status(400)
      .json({ message: 'Verification code expired or not found' });
  }

  // Check if the entered code matches the stored code
  if (storedCode === code) {
    Admin.findOne({ email }).then(async (admin) => {
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      admin.isVerified = true;
      await admin.save();

      //  remove the verification code from the cache once it has been verified
      cache.del(email);

      res.status(200).json({ message: 'Email verified successfully.' });
    });
  } else {
    res.status(400).json({ message: 'Invalid verification code.' });
  }
});

// Resend verification email
router.post('/resend-code', async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    cache.set(email, verificationCode);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${verificationCode}. It will expire in 15 minutes.`,
    });

    res.json({ message: 'Verification code resent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to resend verification code' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    if (!admin.isVerified)
      return res.status(400).json({ message: 'Email not verified.' });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '3h',
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure:false,
      sameSite: 'Lax',
      maxAge: 3 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
// Logout route
router.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
  });
  res.status(200).json({ message: 'Logged out successfully' });
});


// GET /api/admin/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { first_name, last_name, email } = req.body;
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    admin.first_name = first_name || admin.first_name;
    admin.last_name = last_name || admin.last_name;
    admin.email = email || admin.email;
    await admin.save();

    res.json({
      first_name: admin.first_name,
      last_name: admin.last_name,
      email: admin.email,
      role: 'Administrator',
      joined: admin.createdAt ? admin.createdAt.toDateString() : '',
      permissions: 'Full Access',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/change-password
router.post('/change-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Current password is incorrect' });

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Forget Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    admin.resetPasswordToken = tokenHash;
    admin.resetPasswordExpires = Date.now() + 15 * 60 * 1000; //15 min

    await admin.save();

    const resetURL = `http://lbats.onthewifi.com/reset-password/${resetToken}`; 

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Use the link below to reset it:\n\n${resetURL}\n\nLink expires in 15 minutes.`,
    });

    res.json({ message: 'Password reset link sent.' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending reset email' });
  }
});
//Reset Password
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const admin = await Admin.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!admin) return res.status(400).json({ message: 'Invalid or expired token' });

  
    admin.password =newPassword;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;

    await admin.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Password reset failed' });
  }
});


module.exports = router;
