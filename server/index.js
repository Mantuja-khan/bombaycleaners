require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

// Route Imports
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/admin');
const testimonialRoutes = require('./routes/testimonials');
const queryRoutes = require('./routes/queries');
const deliveryRoutes = require('./routes/delivery');

const app = express();

// 1. Security HTTP headers
app.use(helmet());

// 2. Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// 3. Limit requests from same API (Rate Limiting)
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// 4. Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// 5. Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// 6. Data sanitization against XSS (Express prevents most, but helmet helps too)

// 7. Prevent parameter pollution
app.use(hpp());

// 8. Compression for response bodies
app.use(compression());

// 9. CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'https://bombaydrycleaners.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Database connection
const DB = process.env.MONGODB_URI;
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
    res.status(200).json({ status: 'ok', domain: 'bombaydrycleaners.com' });
});

// 404 handler
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        // Operational, trusted error: send message to client
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } else {
            // Programming or other unknown error: don't leak error details
            console.error('ERROR 💥', err);
            res.status(500).json({
                status: 'error',
                message: 'Something went very wrong!'
            });
        }
    }
});

// Start Server
const PORT = process.env.PORT || 7006;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
