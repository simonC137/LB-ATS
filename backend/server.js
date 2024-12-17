require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); 
const Candidate = require('./models/candidate_model');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const candidateRoutes = require('./routes/candidates');
const jobsRoutes = require('./routes/save_job');



const app = express();
// app.use(bodyParser.json());
app.use(express.json());

app.use('/auth',authRoutes)
app.use('/candidate',candidateRoutes)
app.use('/save',jobsRoutes)


// Middleware

// Connect to MongoDB
mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); 
    });

// Routes
app.get('/', (req, res) => {
    res.send('Server is running!');
});





// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
