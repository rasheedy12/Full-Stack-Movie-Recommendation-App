const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
// Always load dotenv from the config/.env file
dotenv.config({ path: path.resolve(__dirname, 'config/.env') });

const app = express();

// --- Middleware ---
// CORS: Allows requests from our frontend
app.use(cors());
app.use(express.json());


// --- Database Connection ---
const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not defined. Please check your .env file.');
        process.exit(1);
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully.');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

connectDB();


// --- Route Definitions ---
// A simple test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import and use route files
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes'); 
const listRoutes = require('./routes/listRoutes'); 
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/users', userRoutes);


// --- Server Initialization ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
