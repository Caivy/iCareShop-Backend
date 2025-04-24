const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  priceUsd: Number,
  priceKhr: Number,
  category: String,
  subcategory: String,
  img: String
});

module.exports = mongoose.model('Product', productSchema);