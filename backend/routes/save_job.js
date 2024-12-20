const express = require('express');
const mongoose = require('mongoose');
const Job = require('./models/job'); // Job model
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// POST Endpoint to save a new job
router.post('/jobs', async (req, res) => {
  try {
    const generatedJobId = uuidv4();

    const {
      current_job_title,
      current_job_description,
      location,
      isActive
    } = req.body;

    // Create a new job document
    const newJob = new Job({
     job_id: generatedJobId,
      current_job_title,
      current_job_description,
      location,
      job_date:new Date(), 
      isActive: isActive !== undefined ? isActive : true 
    });

    // Save the job to the database
    const savedJob = await newJob.save();

    // Return success response
    res.status(201).json({
      message: 'Job saved successfully!',
      job: savedJob
    });
  } catch (error) {
    res.status(500).json({ error: 'Error saving job: ' + error.message });
  }
});


