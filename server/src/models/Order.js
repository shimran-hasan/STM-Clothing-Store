import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, name: String, price: Number, quantity: Number }],
  shipping: { name: String, phone: String, address: String, city: String },
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cod', 'bkash', 'nagad'], default: 'cod' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
}, { timestamps: true });
export default mongoose.model('Order', schema);
