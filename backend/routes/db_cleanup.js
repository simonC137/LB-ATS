const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate_model');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'send.one.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error('SMTP verification failed:', error);
  } else {
    console.log('SMTP Server is ready to send emails');
  }
});

router.delete('/clean-rejected', async (req, res) => {
  try {
    const rejectedCandidates = await Candidate.find({ app_status: 'rejected' });

    if (rejectedCandidates.length === 0) {
      return res.status(200).json({
        message: 'No rejected candidates found.',
        deletedCount: 0,
      });
    }

    //  Send rejection emails
    for (const candidate of rejectedCandidates) {
      try {
        await transporter.sendMail({
          from: `"LifeBonder" <${process.env.EMAIL_USER}>`,
          to: candidate.email,
          subject: 'Application Status - LifeBonder',
          text: `Hi ${candidate.first_name},\n\nThank you for your interest in the position "${candidate.title}" at LifeBonder. After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.\n\nWe wish you all the best in your job search and future endeavors.\n\nKind regards,\nLifeBonder Recruitment Team`,
        });
      } catch (emailError) {
        console.error(`Failed to send email to ${candidate.email}:`, emailError.message);
      }
    }

    const result = await Candidate.deleteMany({ app_status: 'rejected' });

    res.status(200).json({
      message: 'Rejection emails sent and rejected candidates cleaned up successfully.',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error cleaning rejected candidates.',
      error: error.message,
    });
  }
});

module.exports = router;
