const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const sendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  user.password = undefined; // mask password
  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Set first user to admin or check specific email
    const usersCount = await User.countDocuments();
    let role = 'user';
    if (usersCount === 0 || email === 'admin@bombaydrycleaners.com') {
      role = 'admin';
    }

    const newUser = await User.create({ fullName, email, password, role });
    sendToken(newUser, 201, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// OTP login (simulated mostly, but using nodemailer for real emails)
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    let user = await User.findOne({ email });
    if (!user) {
        // optionally auto-signup
        user = await User.create({ email, fullName: email.split('@')[0] });
    }
    user.otp = { code: otp, expiry };
    await user.save();

    // Send email logic (if configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        await transporter.sendMail({
            from: '"Bombay Dry Cleaners" <no-reply@bombaydrycleaners.com>',
            to: email,
            subject: "Your OTP for Bombay Dry Cleaners",
            text: `Your OTP is ${otp}. It expires in 10 minutes.`,
            html: `<b>Your OTP is ${otp}</b><br>It expires in 10 minutes.`
        });
    } else {
        console.log(`Development: OTP for ${email} is ${otp}`);
    }

    res.status(200).json({ status: 'success', message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.otp.code !== otp || user.otp.expiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.otp = undefined; // clear otp
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const { protect } = require('../middleware/auth');
router.get('/me', protect, async (req, res) => {
    res.status(200).json({
        status: 'success',
        data: { user: req.user }
    });
});

router.patch('/profile', protect, async (req, res) => {
    try {
        const { fullName, phone, address } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, { fullName, phone, address }, { new: true });
        res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
