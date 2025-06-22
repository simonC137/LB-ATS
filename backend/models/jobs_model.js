const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
 
title: {
    type: String,
    default: '',
  },
  team: {
    type: String,
    default: '',
  },
 description: {
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

module.exports = mongoose.model('Job', jobSchema);
