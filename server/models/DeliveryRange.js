const mongoose = require('mongoose');

const deliveryRangeSchema = new mongoose.Schema({
    range: {
        type: String,
        required: true, // e.g. "0-5km"
        unique: true
    },
    charge: {
        type: Number,
        required: true,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('DeliveryRange', deliveryRangeSchema);
