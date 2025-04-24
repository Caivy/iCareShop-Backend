const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// Get all products or search
router.get('/', async (req, res) => {
  try {
    const search = req.query.q;
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: new RegExp(search, 'i') },
          { category: new RegExp(search, 'i') },
          { subcategory: new RegExp(search, 'i') }
        ]
      };
    }
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;