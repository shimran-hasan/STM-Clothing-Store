import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password || password.length < 8)
      return res.status(400).json({ message: 'Name, email and password (8+ characters) are required.' });
    if (await User.findOne({ email })) return res.status(409).json({ message: 'Email is already registered.' });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch { res.status(500).json({ message: 'Could not register account.' }); }
});
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: String(req.body.email || '').toLowerCase() });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.passwordHash)))
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch { res.status(500).json({ message: 'Could not log in.' }); }
});
router.get('/me', protect, (req, res) => res.json({ user: req.user }));
export default router;
