const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate_model'); // Candidate model

// Route to clean up rejected candidates
router.delete('/clean-rejected', async (req, res) => {
  try {
    // Find and delete candidates where app_status is 'rejected'
    const result = await Candidate.deleteMany({ app_status: 'rejected' });

    // Return the number of deleted documents
    res.status(200).json({
      message: 'Rejected candidates cleaned up successfully.',
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
