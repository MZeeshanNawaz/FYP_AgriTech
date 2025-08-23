import Product from '../models/Product.js';

// exact image links you provided
const IMAGES = {
  corn: 'https://cdn.prod.website-files.com/5ec959f99359c2ff953a4353/649cd83a6d9e586490d25fec_market-corn.jpg',
  rice: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zHT1yn42JQ_mQ0oSP7vXuDwvEAeZj_2-XQ&s',
  wheat: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqCZ8I2DKIrzZtkFEJvNCUoob_AzgTbLKLiw&s'
};

function imageForCropType(cropType = '') {
  const k = String(cropType || '').toLowerCase();
  return IMAGES[k] || 'https://via.placeholder.com/1000x600?text=Crop';
}

export const getProducts = async (_req, res) => {
  try {
    const items = await Product.find().sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, price, author, contactNumber, cropType } = req.body;
    if (!title || !price || !author || !contactNumber || !cropType) {
      return res.status(400).json({ error: 'All fields (including cropType) are required.' });
    }
    const image = imageForCropType(cropType);
    const created = await Product.create({ title, price, author, contactNumber, cropType, image });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await Product.findById(id);
    if (!found) return res.status(404).json({ error: 'Not found' });
    await found.deleteOne();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
