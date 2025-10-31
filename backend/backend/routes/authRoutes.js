import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Predefined admin
const ADMIN_EMAIL = 'admin@eventease.com';
const ADMIN_PASSWORD = 'Admin@123';

const signToken = payload =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

// register (user)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email & password required' });
    if (email === ADMIN_EMAIL)
      return res.status(400).json({ message: 'Admin email reserved' });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: 'Email already registered' });

    const user = new User({ name, email, password, role: 'user' });
    await user.save();
    const token = signToken({
      id: user._id,
      role: user.role,
      email: user.email,
    });
    res
      .status(201)
      .json({
        token,
        user: { id: user._id, email: user.email, role: user.role },
      });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// login (admin shortcut or DB user)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email & password required' });

    // admin shortcut
    if (email === ADMIN_EMAIL) {
      if (password !== ADMIN_PASSWORD)
        return res.status(400).json({ message: 'Invalid credentials' });
      const token = signToken({ email: ADMIN_EMAIL, role: 'admin' });
      return res.json({ token, user: { email: ADMIN_EMAIL, role: 'admin' } });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = signToken({
      id: user._id,
      role: user.role,
      email: user.email,
    });
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
