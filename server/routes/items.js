const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ category: 1, name: 1 });
    res.status(200).json({ status: 'success', data: items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
