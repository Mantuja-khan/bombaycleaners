require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');

const data = [
  // 1. Daily Wear
  { name: 'Cardigan H/s', category: 'Daily Wear', basePrice: 150 },
  { name: 'Pajami Bottom Emb.', category: 'Daily Wear', basePrice: 120 },
  { name: 'Shorts', category: 'Daily Wear', basePrice: 150 },
  { name: 'Skirt', category: 'Daily Wear', basePrice: 90 },
  { name: 'Skirt (Full Pleated)', category: 'Daily Wear', basePrice: 150 },
  { name: 'Top', category: 'Daily Wear', basePrice: 250 },
  { name: 'Ladies Trouser / Slacks', category: 'Daily Wear', basePrice: 120 },
  { name: 'Ladies T-Shirt', category: 'Daily Wear', basePrice: 130 },
  { name: 'Ladies Shirt', category: 'Daily Wear', basePrice: 550, priceRange: '₹550 to ₹1500' },
  { name: 'Baby Suit (2 Pcs.)', category: 'Daily Wear', basePrice: 250 },
  { name: 'Baby Suit (3 Pcs.)', category: 'Daily Wear', basePrice: 310 },
  { name: 'Baby Sweater', category: 'Daily Wear', basePrice: 120 },
  { name: 'Baby Jacket', category: 'Daily Wear', basePrice: 170 },
  { name: 'Baby Coat', category: 'Daily Wear', basePrice: 170 },

  // 2. Traditional Wear
  { name: 'Shawl', category: 'Traditional Wear', basePrice: 130 },
  { name: 'Shawl (Pashmina)', category: 'Traditional Wear', basePrice: 535 },
  { name: 'Saree Emb.', category: 'Traditional Wear', basePrice: 295, priceRange: '₹295 to ₹800' },
  { name: 'Saree Plain/Silk', category: 'Traditional Wear', basePrice: 220 },
  { name: 'Saree Zari', category: 'Traditional Wear', basePrice: 280, priceRange: '₹280 to ₹800' },
  { name: 'Ladies Suit Emb. (2 Pcs.)', category: 'Traditional Wear', basePrice: 280, priceRange: '₹280 to ₹500' },
  { name: 'Ladies Suit Emb. (3 Pcs.)', category: 'Traditional Wear', basePrice: 320, priceRange: '₹320 to ₹800' },
  { name: 'Ladies Suit Plain (2 Pcs.)', category: 'Traditional Wear', basePrice: 220 },
  { name: 'Ladies Suit Plain (3 Pcs.)', category: 'Traditional Wear', basePrice: 295 },
  { name: 'Lehanga Suit (2 Pcs.)', category: 'Traditional Wear', basePrice: 550, priceRange: '₹550 to ₹1500' },
  { name: 'Lehanga Suit (3 Pcs.)', category: 'Traditional Wear', basePrice: 650, priceRange: '₹650 to ₹1500' },
  { name: 'Baby Lehanga Suit (2 Pcs.)', category: 'Traditional Wear', basePrice: 320 },
  { name: 'Baby Lehanga Suit (3 Pcs.)', category: 'Traditional Wear', basePrice: 400 },
  { name: 'Dupatta Emb.', category: 'Traditional Wear', basePrice: 120 },
  { name: 'Dupatta Plain', category: 'Traditional Wear', basePrice: 90, priceRange: '₹90 to ₹220' },
  { name: 'Peti Coat', category: 'Traditional Wear', basePrice: 90 },

  // 3. Formal Wear
  { name: 'Ladies Western Suit (2 Pcs.)', category: 'Formal Wear', basePrice: 360 },
  { name: 'Dress (1 Pc.)', category: 'Formal Wear', basePrice: 300, priceRange: '₹300 to ₹800' },
  { name: 'Dress Silk/Emb.', category: 'Formal Wear', basePrice: 380, priceRange: '₹380 to ₹800' },
  { name: 'Blouse Emb.', category: 'Formal Wear', basePrice: 110 },
  { name: 'Blouse Plain', category: 'Formal Wear', basePrice: 95 },
  { name: 'Ladies Coat', category: 'Formal Wear', basePrice: 230 },
  { name: 'Ladies Coat Long', category: 'Formal Wear', basePrice: 360 },

  // 4. Home Items
  { name: 'Bed Sheet Double', category: 'Home Items', basePrice: 250 },
  { name: 'Bed Sheet Single', category: 'Home Items', basePrice: 210 },
  { name: 'Pillow Cover', category: 'Home Items', basePrice: 60 },
  { name: 'Blanket Double', category: 'Home Items', basePrice: 395 },
  { name: 'Baby Blanket', category: 'Home Items', basePrice: 210 },
  { name: 'Cushion Cover', category: 'Home Items', basePrice: 70 },
  { name: 'Quilt Double', category: 'Home Items', basePrice: 395 },
  { name: 'Quilt Single', category: 'Home Items', basePrice: 295 },
  { name: 'Table Cover Small', category: 'Home Items', basePrice: 120 },
  { name: 'Table Cover Long', category: 'Home Items', basePrice: 200 },
  { name: 'Table Napkin', category: 'Home Items', basePrice: 60 },
  { name: 'Towel Bath', category: 'Home Items', basePrice: 80 },
  { name: 'Towel Face', category: 'Home Items', basePrice: 40 },
  { name: 'Towel Hand', category: 'Home Items', basePrice: 30 },
  { name: 'Curtain', category: 'Home Items', basePrice: 250, priceRange: '₹250 to ₹400' },
  { name: 'Curtain Extra', category: 'Home Items', basePrice: 320, priceRange: '₹320 to ₹450' },
  { name: 'Sofa Seat', category: 'Home Items', basePrice: 30, priceRange: '₹30 to ₹450' },

  // 5. Accessories
  { name: 'Pant', category: 'Accessories', basePrice: 50 },
  { name: 'Shirt', category: 'Accessories', basePrice: 60 },
  { name: 'Sweater', category: 'Accessories', basePrice: 60 },
  { name: 'Shawl (Small/Light)', category: 'Accessories', basePrice: 70, priceRange: '₹70 to ₹100' },
  { name: 'Saree Charkh Plain', category: 'Accessories', basePrice: 80, priceRange: '₹80 to ₹120' },
  { name: 'Saree Charkh Emb.', category: 'Accessories', basePrice: 120 },
  { name: 'Ladies Suit (2 Pcs.)', category: 'Accessories', basePrice: 160 },
  { name: 'Ladies Suit (3 Pcs.)', category: 'Accessories', basePrice: 210 },
  { name: 'Ladies Suit Emb. (2 Pcs.)', category: 'Accessories', basePrice: 150 },
  { name: 'Lehanga Suit Plain (2 Pcs.)', category: 'Accessories', basePrice: 250 },
  { name: 'Lehanga Suit Emb. (2 Pcs.)', category: 'Accessories', basePrice: 300 },

  // 6. Steam Pressing
  { name: 'Gents Suits (2 Pcs.)', category: 'Steam Pressing', basePrice: 150 },
  { name: 'Gents Suits (3 Pcs.)', category: 'Steam Pressing', basePrice: 190 },
  { name: 'Coat', category: 'Steam Pressing', basePrice: 100 },
  { name: 'Pant (Press)', category: 'Steam Pressing', basePrice: 50 },
  { name: 'Shirt (Press)', category: 'Steam Pressing', basePrice: 60 },
  { name: 'Sweater (Press)', category: 'Steam Pressing', basePrice: 60 }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        await Item.deleteMany({});
        console.log('Cleared existing items');
        await Item.insertMany(data);
        console.log('Seeded data successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedDB();
