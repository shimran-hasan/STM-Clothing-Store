
import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './src/models/Product.js';

const products = [
  {
    name: 'Classic White T-Shirt',
    description: 'Comfortable everyday cotton T-shirt.',
    category: 'T-Shirts',
    price: 850,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    stock: 25,
    featured: true
  },
  {
    name: 'Premium Black Shirt',
    description: 'Smart and stylish black shirt.',
    category: 'Shirts',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
    stock: 20,
    featured: true
  },
  {
    name: 'Casual Blue Jeans',
    description: 'Modern fit denim jeans for everyday wear.',
    category: 'Jeans',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
    stock: 15,
    featured: false
  },
  {
    name: 'Essential Hoodie',
    description: 'Soft casual hoodie for a relaxed look.',
    category: 'Hoodies',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    stock: 12,
    featured: true
  },
  {
    name: 'Women’s Casual Outfit',
    description: 'Elegant everyday fashion outfit.',
    category: 'Women',
    price: 1950,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    stock: 18,
    featured: false
  }
];

async function seedProducts() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from server/.env');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    // Existing products are kept; matching names are updated.
    for (const product of products) {
      await Product.updateOne(
        { name: product.name },
        { $set: product },
        { upsert: true, runValidators: true }
      );
    }

    console.log('Successfully added or updated 5 demo products.');
  } catch (error) {
    console.error('Product seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();
