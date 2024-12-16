const mongoose = require('mongoose');
const Candidate = require('../models/candidate_model');
const express = require('express');


//Test, Will change later

const newCandidate = new Candidate({
    id: "1",
    first_name: "testy",
    last_name: "testerson",
    phone: "555-5555",
    email: "test@test.com",
    location: "n/a",
    job_id: "11",
    message: "test text",
});

async function saveCandidate() {
    try {
        await newCandidate.save();
        console.log('Candidate saved successfully');
    } catch (err) {
        console.error('Error saving candidate:', err);
    }
}


