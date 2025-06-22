const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
    default: '',
  },
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },

  application_date: {
    type: Date,
    default: new Date(),
  },
  app_status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'accepted', 'rejected'],
  },
  message: {
    type: String,
    required: true,
  },
  current_job_title: {
    type: String,
    default: '',
  },
  cv_url: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Candidate', candidateSchema);
