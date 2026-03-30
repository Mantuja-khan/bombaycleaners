require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        
        const email = 'support.bombaydrycleaners@gmail.com';
        const password = 'bombay@789';
        const fullName = 'Bombay Dry Cleaners Admin';
        
        let user = await User.findOne({ email });
        if (user) {
            user.password = password;
            user.role = 'admin';
            user.fullName = fullName;
            await user.save();
            console.log('Admin user updated');
        } else {
            await User.create({ email, password, fullName, role: 'admin' });
            console.log('Admin user created');
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedAdmin();
