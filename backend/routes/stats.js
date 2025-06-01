const express = require('express');
const Candidate = require('../models/candidate_model');
const Job = require('../models/jobs_model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const activeJobs = await Job.countDocuments({ isActive: true });
    const expiredJobs = await Job.countDocuments({ isActive: false });

    const totalJobs = await Job.countDocuments();
    const totalApplicants = await Candidate.countDocuments();

    const applicantsPerJob = totalJobs === 0 ? 0 : Math.round(totalApplicants / totalJobs);

    const newApplications = await Candidate.countDocuments({
      application_date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, 
    });

    res.json({
      activeJobs,
      expiredJobs,
      applicantsPerJob,
      newApplications,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admin stats', error: err.message });
  }
});

module.exports = router;
