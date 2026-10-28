import { Router } from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.post('/', protect, async (req, res) => {
  try {
    const { items, shipping, paymentMethod = 'cod' } = req.body;
    if (!Array.isArray(items) || !items.length || !shipping?.name || !shipping?.phone || !shipping?.address)
      return res.status(400).json({ message: 'Cart and complete shipping details are required.' });
    if (!['cod', 'bkash', 'nagad'].includes(paymentMethod)) return res.status(400).json({ message: 'Unsupported payment method.' });
    const orderItems = []; let total = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      const quantity = Number(item.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ message: 'Invalid product or quantity.' });
      if (product.stock < quantity) return res.status(409).json({ message: `Not enough stock for ${product.name}.` });
      orderItems.push({ product: product._id, name: product.name, price: product.price, quantity });
      total += product.price * quantity;
    }
    // Online payment methods remain pending until official server-side verification is implemented.
    const order = await Order.create({ customer: req.user._id, items: orderItems, shipping, total, paymentMethod });
    for (const item of orderItems) await Product.updateOne({ _id: item.product }, { $inc: { stock: -item.quantity } });
    res.status(201).json({ message: 'Order placed successfully.', order });
  } catch { res.status(500).json({ message: 'Could not place order.' }); }
});
router.get('/mine', protect, async (req, res) => {
  try { res.json(await Order.find({ customer: req.user._id }).sort({ createdAt: -1 })); }
  catch { res.status(500).json({ message: 'Could not load orders.' }); }
});
export default router;
