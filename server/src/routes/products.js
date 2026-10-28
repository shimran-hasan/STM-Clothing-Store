import { Router } from 'express';
import Product from '../models/Product.js';
const router = Router();
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'All') filter.category = req.query.category;
    if (req.query.search) filter.name = { $regex: String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
    res.json(await Product.find(filter).sort({ createdAt: -1 }).limit(100));
  } catch { res.status(500).json({ message: 'Could not load products.' }); }
});
router.get('/categories', async (_req, res) => {
  try { res.json(await Product.distinct('category')); }
  catch { res.status(500).json({ message: 'Could not load categories.' }); }
});
export default router;
