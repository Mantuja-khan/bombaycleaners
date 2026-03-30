require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Route Imports
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/admin');
const testimonialRoutes = require('./routes/testimonials');
const queryRoutes = require('./routes/queries');
const deliveryRoutes = require('./routes/delivery');

const app = express();

// Middlewares
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Database connection
const DB = process.env.MONGODB_URI || 'mongodb://localhost:27017/laundryDB';
mongoose.connect(DB).then(() => {
    console.log('MongoDB connection successful');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/items', itemRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/queries', queryRoutes);
app.use('/api/v1/delivery', deliveryRoutes);

// Root
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
