# STM Clothing Store — React Full-Stack Project

STM হলো React + Vite frontend এবং Node.js + Express + MongoDB backend দিয়ে তৈরি clothing e-commerce starter project। JSX ও CSS আলাদা ফাইলে রাখা হয়েছে।

## Features
- Responsive STM clothing storefront
- Dress, T-shirt, shirts, jeans, hoodies ও accessories-এর demo product images
- Product search এবং category filter
- Shopping cart ও checkout interface
- Customer register/login with bcrypt password hashing + JWT
- MongoDB Product, User এবং Order models
- Admin product/order API
- Cash on Delivery flow
- bKash/Nagad ও email/SMS integration-এর জন্য প্রাথমিক configuration notes/placeholders

## প্রয়োজন
- Node.js 20 বা নতুন ভার্সন
- MongoDB local server অথবা MongoDB Atlas database
- VS Code

## 1. Backend চালু করো
VS Code-এ project folder open করে terminal-এ চালাও:

```bash
cd server
copy .env.example .env
npm install
npm run dev
```

তারপর `server/.env` ফাইল খুলে `MONGODB_URI` এবং শক্তিশালী `JWT_SECRET` বসাও। MongoDB চালু থাকতে হবে।

## 2. Frontend চালু করো
আরেকটি VS Code terminal খুলে project root থেকে চালাও:

```bash
cd client
copy .env.example .env
npm install
npm run dev
```

Vite terminal-এ যে URL দেখাবে সেটি browser-এ খোলো; সাধারণত `http://localhost:5173`। Frontend এবং backend আলাদা terminal-এ চালু রাখতে হবে।

## JSX ও CSS কোথায়?
- `client/src/App.jsx` — React components, products, cart, login/checkout UI
- `client/src/styles.css` — সব styling, colors, layout ও responsive CSS
- `client/src/main.jsx` — React entry point; এখানে `styles.css` import করা আছে

নিজের পোশাকের ছবি দিতে `App.jsx`-এর product `image` URL পরিবর্তন করো। Backend চালু না থাকলেও demo products দিয়ে storefront preview করা যাবে; demo products দিয়ে real order তৈরি হবে না।

## Admin access
প্রথমে normal account register করো। এরপর MongoDB-তে সেই user document-এর `role` field `admin` করো। Public registration-এ admin role কখনো allow করবে না।

## Payments, email এবং SMS
Cash on Delivery basic order flow-এ আছে। bKash/Nagad এখন configuration placeholder—বাস্তব payment চালু করতে official merchant API, server-side verification/callback এবং merchant credentials প্রয়োজন। Email/SMS-ও valid SMTP/provider credentials ও provider-specific implementation ছাড়া পাঠাবে না। `.env.example`-এ sample configuration দেখো; real secrets public GitHub-এ push করো না।

## গুরুত্বপূর্ণ
এটি শেখা ও customization-এর starter project, production-audited store নয়। Live করার আগে validation, rate limiting, secure payment verification, stock concurrency handling, logging, backups ও security testing যোগ করো।
