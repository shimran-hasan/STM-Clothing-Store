import { Router } from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = Router();
router.use(protect, adminOnly);
router.get('/orders', async (_req, res) => {
  try { res.json(await Order.find().populate('customer', 'name email').sort({ createdAt: -1 })); }
  catch { res.status(500).json({ message: 'Could not load orders.' }); }
});
router.patch('/orders/:id', async (req, res) => {
  try {
    const allowed = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid order status.' });
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch { res.status(500).json({ message: 'Could not update order.' }); }
});
router.post('/products', async (req, res) => {
  try { res.status(201).json(await Product.create(req.body)); }
  catch { res.status(400).json({ message: 'Product details are invalid.' }); }
});
router.patch('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch { res.status(400).json({ message: 'Could not update product.' }); }
});
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Product deleted.' });
  } catch { res.status(500).json({ message: 'Could not delete product.' }); }
});
export default router;
