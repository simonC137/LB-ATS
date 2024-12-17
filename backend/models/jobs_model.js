const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  job_id: {
    type: String,
    required: true,
  },
  current_job_title: {
    type: String,
    default: '',
  },
  current_job_description: {
    type: String,
    default: '',
  },

  location: {
    type: String,
    required: true,
    default: '',
  },
  job_date: {
    type: Date,
    default: new Date(),
  },
  isActive:{
    type: Boolean,
    default: true,
  }
});

module.exports = mongoose.model('job', jobSchema);
