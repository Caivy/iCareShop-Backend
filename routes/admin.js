const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post('/upload', upload.single('img'), async (req, res) => {
  try {
    const { id, name, priceUsd, priceKhr, category, subcategory } = req.body;
    const product = new Product({
      id,
      name,
      priceUsd,
      priceKhr,
      category,
      subcategory,
      img: `/uploads/${req.file.filename}`
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;