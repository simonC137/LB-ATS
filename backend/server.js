const path = require('path');
const dotenv = require('dotenv'); 
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const fs = require('fs');
const cookieParser = require('cookie-parser');


dotenv.config();
const Candidate = require('./models/candidate_model');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const candidateRoutes = require('./routes/candidates');
const jobsRoutes = require('./routes/save_job');
const cleanRejectedRoute = require('./routes/db_cleanup');
const uploadRoutes = require('./routes/upload');
const statsRoutes = require('./routes/stats');



const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
const allowedOrigins = ['http://localhost:5173', 'https://lbats.onthewifi.com'];

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());
app.use('/auth',authRoutes)
app.use('/candidate',candidateRoutes)
app.use('/jobs', jobsRoutes);
app.use('/delete', cleanRejectedRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', uploadRoutes);
app.use('/stats', statsRoutes);
app.use('/stats/count', statsRoutes);

app.use('/candidates', cleanRejectedRoute);



// Middleware

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

