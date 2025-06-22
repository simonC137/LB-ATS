const express = require('express');
const mongoose = require('mongoose');
const Job = require('../models/jobs_model'); // Job model
const router = express.Router();

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs', error });
  }
});
// GET all active jobs
router.get('/active', async (req, res) => {
  try {
    const activeJobs = await Job.find({ isActive: true });
    res.status(200).json(activeJobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch active jobs', error });
  }
});
// GET all inactive jobs
router.get('/inactive', async (req, res) => {
  try {
    const inactiveJobs = await Job.find({ isActive: false });
    res.status(200).json(inactiveJobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch inactive jobs', error });
  }
});

// GET a single job by ID
router.get('/:id', async (req, res) => {
  try {
    const jobEl = await Job.findById(req.params.id);
    if (!jobEl) return res.status(404).json({ message: 'Job not found' });
    res.json(jobEl);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// POST a new job
router.post('/', async (req, res) => {
  try {
    const { title, description, team, location, isActive } = req.body;

    const newJob = new Job({
      title,
      description,
      team,
      location,
      job_date: new Date(),
      isActive: isActive !== undefined ? isActive : true
    });

    const savedJob = await newJob.save();
    res.status(201).json({
      message: 'Job saved successfully!',
      job: savedJob
    });
  } catch (error) {
    res.status(500).json({ error: 'Error saving job: ' + error.message });
  }
});

// PUT (Update) job by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        team: req.body.team, 
        isActive: req.body.isActive 
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({
      message: 'Job updated successfully!',
      job: updatedJob
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating job: ' + error.message });
  }
});

// DELETE job by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting job: ' + error.message });
  }
});

module.exports = router;
