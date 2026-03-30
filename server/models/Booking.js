const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceType: { type: String, required: true },
  items: [{
    name: String,
    qty: Number,
    price: Number
  }],
  totalPrice: { type: Number, required: true },
  deliveryCharge: { type: Number, default: 0 },
  pickupAddress: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'picked', 'washing', 'drying', 'ready', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  },
  txId: { type: String }, // Transaction ID if any
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
