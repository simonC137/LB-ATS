const express = require('express');
const Admin = require('../models/admin_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();
const NodeCache = require('node-cache');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your preferred email service
  auth: {
    user: process.env.EMAIL_USER, // Sender email address (from .env)
    pass: process.env.EMAIL_PASS, // Sender email password (from .env)
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
    // Store the verification code in memory cache for 10 minutes
    cache.set(email, verificationCode);

    // Send email
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
    // Mark the admin as verified
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
        expiresIn: '1h',
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000, // 1 hour in milliseconds
    });
    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
