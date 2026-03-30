require('dotenv').config();
const mongoose = require('mongoose');
const DeliveryRange = require('./models/DeliveryRange');

const seedDelivery = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        
        const ranges = [
            { range: '0-5km', charge: 50 },
            { range: '5-10km', charge: 100 },
            { range: '10-15km', charge: 150 }
        ];
        
        for (const r of ranges) {
            await DeliveryRange.findOneAndUpdate(
                { range: r.range },
                { charge: r.charge, isActive: true },
                { upsert: true, new: true }
            );
        }
        
        console.log('Delivery ranges seeded');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedDelivery();
