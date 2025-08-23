// backend/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new product
router.post("/", async (req, res) => {
  try {
    const { cropType, price, author, contact } = req.body;

    // Map cropType to images
    let image = "";
    if (cropType === "Corn") {
      image =
        "https://cdn.prod.website-files.com/5ec959f99359c2ff953a4353/649cd83a6d9e586490d25fec_market-corn.jpg";
    } else if (cropType === "Rice") {
      image =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zHT1yn42JQ_mQ0oSP7vXuDwvEAeZj_2-XQ&s";
    } else if (cropType === "Wheat") {
      image =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqCZ8I2DKIrzZtkFEJvNCUoob_AzgTbLKLiw&s";
    }

    const newProduct = new Product({ cropType, price, author, contact, image });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
