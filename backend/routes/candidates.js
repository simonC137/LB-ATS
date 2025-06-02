const mongoose = require('mongoose');
const Candidate = require('../models/candidate_model');
const job = require('../models/jobs_model');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const NodeCache = require('node-cache');
const axios = require('axios');
const rateLimit = require('express-rate-limit');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const applyLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3, // max 3 attempts per minute per IP
  message: 'Too many applications from this IP, please try again later',
});

const verifyCaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
  const response = await axios.post(url);
  return response.data.success;
};
//Candidate Route

router.post('/apply',applyLimiter, async (req, res) => {
  const {
    first_name,
    last_name,
    phone,
    email,
    location,
    message,
    cv_url,
    title,
    application_date,
    app_status,
    captchaToken,
  } = req.body;
  const isValid = await verifyCaptcha(captchaToken);
  if (!isValid) return res.status(403).json({ message: 'CAPTCHA failed' });
  if (req.body.website) {
    return res.status(400).json({ message: 'Spam detected' });
  }

  try {
    const jobDoc = await job.findOne({ title });
    if (!jobDoc) {

      return res.status(404).json({ message: 'Job not found!' });
    }

    const existCandidate = await Candidate.countDocuments({
      email,
      job_id: jobDoc._id,
    });
    if (existCandidate > 0) {
      return res.status(400).json({ message: 'Candidate already applied for this job!' });
    }
    const newCandidate = new Candidate({
      first_name,
      last_name,
      phone,
      email,
      location,
      message,
      cv_url,
      title,
      job_id: jobDoc._id,
      application_date,
      app_status,
    });
    await newCandidate.save();
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for your application',
      text: `Hi ${first_name},

How nice that you are interested in the position as ${title} with Frontend interest for LifeBonder!

We have received your application and will get back to you with more information about what the next step in the process looks like if it becomes relevant .`,
    });

    res.status(201).json({ message: 'Application sent.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Get all candidates

router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find().populate('job_id', 'title');
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch candidates', error: error.message });
  }
});
// Update application status
router.put('/:id', async (req, res) => {
  const { app_status } = req.body;

  if (!['pending', 'accepted', 'rejected'].includes(app_status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { app_status },
      { new: true }
    ).populate('job_id', 'title');

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found.' });
    }

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status.', error: error.message });
  }
});


module.exports = router;