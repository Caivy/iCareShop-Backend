const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new category with subcategories
router.post('/', async (req, res) => {
    try {
      const { name, subcategories } = req.body;
      const category = new Category({ name, subcategories });
      await category.save();
      res.status(201).json(category);
    } catch (err) {
      res.status(500).json({ error: 'Creation failed' });
    }
  });
  
  // Delete a category
  router.delete('/:id', async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: 'Category deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Deletion failed' });
    }
  });
  
  module.exports = router;