require('dotenv').config();
const mongoose = require('mongoose'); 

// MongoDB connection URI
const dbURI = process.env.DB_URI;  
// Connect to MongoDB
mongoose.connect(dbURI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

module.exports = mongoose;
