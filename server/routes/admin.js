const express = require('express');
const router = express.Router();
const DeliveryRange = require('../models/DeliveryRange');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Item = require('../models/Item');
const Query = require('../models/Query');
const Testimonial = require('../models/Testimonial');
const { protect, restrictTo } = require('../middleware/auth');

// Protect and Restrict to 'admin' role
router.use(protect);
router.use(restrictTo('admin'));

// Get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId', 'fullName email phone').sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', data: bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status
router.patch('/bookings/:id', async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status, paymentStatus }, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ status: 'success', data: booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ITEM MANAGEMENT
// Get all items (publicly available for booking)
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ category: 1, name: 1 });
    res.status(200).json({ status: 'success', data: items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new item
router.post('/items', async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        res.status(201).json({ status: 'success', data: newItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update item
router.patch('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ status: 'success', data: item });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete item
router.delete('/items/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// QUERY MANAGEMENT
// Get all queries
router.get('/queries', async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: queries });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update query status
router.patch('/queries/:id', async (req, res) => {
    try {
        const query = await Query.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ status: 'success', data: query });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete query
router.delete('/queries/:id', async (req, res) => {
    try {
        await Query.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// TESTIMONIAL MANAGEMENT
// Get all testimonials (including pending)
router.get('/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: testimonials });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update testimonial status
router.patch('/testimonials/:id', async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ status: 'success', data: testimonial });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete testimonial
router.delete('/testimonials/:id', async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Delivery Ranges ---

// Get all delivery ranges (including inactive)
router.get('/delivery', async (req, res) => {
    try {
        const ranges = await DeliveryRange.find().sort('charge');
        res.status(200).json({ success: true, data: ranges });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update or Create delivery range
router.post('/delivery', async (req, res) => {
    try {
        const { id, range, charge, isActive } = req.body;
        let dr;
        if (id) {
            dr = await DeliveryRange.findByIdAndUpdate(id, { range, charge, isActive }, { new: true });
        } else {
            dr = await DeliveryRange.create({ range, charge, isActive });
        }
        res.status(200).json({ success: true, data: dr });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/delivery/:id', async (req, res) => {
    try {
        await DeliveryRange.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Range deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
