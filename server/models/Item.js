const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Daily Wear', 'Traditional Wear', 'Formal Wear', 'Home Items', 'Accessories', 'Steam Pressing'] 
  },
  basePrice: { type: Number, required: true },
  priceRange: { type: String, required: false }, // For items like "₹550 to ₹1500"
  icon: { type: String, default: '🧺' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);
