const express = require('express');
const router = express.Router();
const Query = require('../models/Query');

// Submit a new query (Public)
router.post('/', async (req, res) => {
  try {
    const newQuery = await Query.create(req.body);
    res.status(201).json({ 
        status: 'success', 
        message: 'Your query has been sent successfully!',
        data: newQuery 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
