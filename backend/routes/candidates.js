const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Candidate = require('../models/candidate_model');
const Job = require('../models/jobs_model');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const rateLimit = require('express-rate-limit');

// Nodemailer setup with port 587 and STARTTLS
const transporter = nodemailer.createTransport({
  host: 'send.one.com', 
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  
});

// Verify SMTP connection on server start
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP verification failed:', error);
  } else {
    console.log('SMTP Server is ready to send emails');
  }
});

const applyLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: 'Too many applications from this IP, please try again later',
});

const verifyCaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
  try {
    const response = await axios.post(url);
    return response.data.success;
  } catch (error) {
    console.error('CAPTCHA verification failed:', error.message);
    return false;
  }
};
// GET /candidate 
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find().populate('job_id');
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch candidates' });
  }
});
// POST /api/candidate/apply
router.post('/apply', applyLimiter, async (req, res) => {
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

  // Validate CAPTCHA
  const isValid = await verifyCaptcha(captchaToken);
  if (!isValid) {
    return res.status(403).json({ message: 'CAPTCHA verification failed' });
  }

  // Block spam (website field)
  if (req.body.website) {
    return res.status(400).json({ message: 'Spam detected' });
  }

  try {
    // Validate required fields
    if (!first_name || !last_name || !email || !title) {
      return res.status(400).json({ message: 'Missing required fields: first_name, last_name, email, or title' });
    }

    // Find job
    const jobDoc = await Job.findOne({ title });
    if (!jobDoc) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check for existing candidate
    const existCandidate = await Candidate.countDocuments({
      email,
      job_id: jobDoc._id,
    });
    if (existCandidate > 0) {
      return res.status(400).json({ message: 'Candidate already applied for this job' });
    }

    // Create candidate with unique id
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
      application_date: application_date || new Date(),
      app_status: app_status || 'pending',
    });

    // Save candidate
    await newCandidate.save();

    // Send email
    try {
      await transporter.sendMail({
        from: `"LifeBonder" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for your application',
        text: `Hi ${first_name},\n\nHow nice that you are interested in the position as ${title} with Frontend interest for LifeBonder!\n\nWe have received your application and will get back to you with more information about what the next step in the process looks like if it becomes relevant.`,
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError.message);
      return res.status(201).json({
        message: 'Application sent, but email delivery failed',
        candidate: newCandidate,
        emailError: emailError.message,
      });
    }

    res.status(201).json({ message: 'Application sent successfully', candidate: newCandidate });
  } catch (error) {
    console.error('Error processing application:', error.message);
    res.status(500).json({ message: 'Failed to process application', error: error.message });
  }
});
// PUT / update candidate status or fields
router.put('/:id', async (req, res) => {
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.json({ message: 'Candidate updated successfully', candidate: updatedCandidate });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update candidate', error: error.message });
  }
});


module.exports = router;