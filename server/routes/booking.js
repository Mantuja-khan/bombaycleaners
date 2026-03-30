const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

// Create a booking
router.post('/', protect, async (req, res) => {
  try {
    const { serviceType, items, totalPrice, deliveryCharge, pickupAddress } = req.body;
    const newBooking = await Booking.create({
      userId: req.user._id,
      serviceType,
      items,
      totalPrice,
      deliveryCharge,
      pickupAddress
    });
    res.status(201).json({ status: 'success', data: newBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user bookings
router.get('/my-bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', data: bookings });
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
});

module.exports = router;
