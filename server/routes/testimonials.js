const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect, restrictTo } = require('../middleware/auth');

// Get all approved testimonials (Public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', data: testimonials });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit a new testimonial (Protected)
router.post('/', protect, async (req, res) => {
  try {
    const newTestimonial = await Testimonial.create(req.body);
    res.status(201).json({ 
        status: 'success', 
        message: 'Testimonial submitted and awaiting approval!',
        data: newTestimonial 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
