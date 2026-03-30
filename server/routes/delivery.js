const express = require('express');
const router = express.Router();
const DeliveryRange = require('../models/DeliveryRange');

// Get all active delivery ranges
router.get('/', async (req, res) => {
    try {
        const ranges = await DeliveryRange.find({ isActive: true }).sort('charge');
        res.status(200).json({ success: true, data: ranges });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
