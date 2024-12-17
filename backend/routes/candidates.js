const mongoose = require('mongoose');
const Candidate = require('../models/candidate_model');
const job = require('../models/jobs_model');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const NodeCache = require('node-cache');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',// Or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
//Candidate Route

router.post('/apply', async (req, res) => {
  const {
    first_name,
    last_name,
    phone,
    email,
    location,
    message,
    cv_url,
    current_job_title,
    application_date,
    app_status,
  } = req.body;
  try {
    //  Retrieve the job details based on the job title
    const job = await job.findOne({ current_job_title });
    if (!job) {
      return res.status(404).json({ message: 'Job not found!' });
    }

    const existCandidate = await Candidate.findOne({
      email,
      job_id: job.job_id,
    });
    if (existCandidate)
      return res
        .status(400)
        .json({ message: 'Candidate already applied for this job!' });
    const newCandidate = new Candidate({
      first_name,
      last_name,
      phone,
      email,
      location,
      message,
      cv_url,
      current_job_title,
      job_id,
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

How nice that you are interested in the position as ${current_job_title} with Frontend interest for LifeBonder!

We have received your application and will get back to you with more information about what the next step in the process looks like if it becomes relevant .`,
    });

    res.status(201).json({ message: 'Application sent.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
