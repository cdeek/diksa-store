import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { Readable } from 'stream';
import Product  from './models/products_model.js';
import Video  from './models/product_video.js';
import useAuth from './authentication.js';

const router = express.Router();

// product categories
router.get('/category/:name', async (req, res) => {
 const { name } = req.params;
 products = await Product.find({ category: name }).sort({createdat:-1});
 res.status(200).json(products)
})

// search suggestion
router.get('/search/suggest', async (req, res) => {
  const searchQuery = req.query.search.toLowerCase();

  try {
   //const resultss = await Product.find({ product_name: { $regex: query, $options: 'i' } }).limit(5);
    const results = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [query] } },
        { edition: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } }
      ],
    }).limit(5);
    console.log(results)
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// search for products
router.get('/search', async (req, res) => {
 try {
  const searchQuery = req.query.search.toLowerCase();
  
  const products = await Product.find({});
  
  const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
        product.description.toLowerCase().includes(searchQuery) ||
        product.brand.toLowerCase().includes(searchQuery)
    );
    res.json(filteredProducts);
 } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get all products
router.get('/', async (req, res) => {
 const page = parseInt(req.query.page) || 1;
 const limit = parseInt(req.query.limit) || 20;

 const skip = (page - 1) * limit;
 const totalProductsCount = await Product.countDocuments({});
 const totalPages = Math.ceil(totalProductsCount / limit);
  const products = await Product.find({})
    .sort({createdat:-1})
    .skip(skip)
    .limit(limit);
  res.status(200).json(products)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such product'})
  }
    const product = await Product.findOne({_id: id})
    if(!product){
      return res.status(404).json({error: 'No such product'})
    }
    res.status(200).json(product);
});
    
router.get('/video/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findOne({ video_id: id });
    if (!video) {
      return res.status(404).send('Video not found');
    }
    const range = req.headers.range;
    const fileSize = video.size;

    if (range) {
      const parts = range.replace('bytes=', '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = (end - start) + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': video.content_type,
      });

      const buffer = video.data.slice(start, end + 1);
      const readable = Readable.from(buffer);
      readable.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': video.content_type,
        });
        res.end(video.data);
      }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ error: err.message });
  }
});

////////////////////////////////////////////////////

//require auth for all users
router.use(useAuth);

//get all user products
router.get('/auth', async (req, res) => {
const user_id = req.user._id;
const products = await Product.find({ user_id }).sort({createdat:-1})
res.status(200).json(products)
})

// get single product
router.get('/auth/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such product'})
  }
  const { id } = req.params;
  const product = await Product.findById(id);
  if(!product){
    return res.status(404).json({error: 'No such product'})
  }
  res.json(product)
})

//post product
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/auth', upload.fields([
  { name: 'image', maxCount: 1},
  { name: 'images', maxCount: 5},
  { name: 'video', maxCount: 1 },
]), async (req, res) => {
 
  // Empty fields validation
  const { 
    name,
    category,  
    price, 
    description, 
    tags,
    brand, 
    edition,
    size, 
    availability,
  } = req.body;
  const imageFile = req.files['image'] ? req.files['image'][0] : null;
  const imageFiles = req.files['images'] ? req.files['images'].map(i => i.buffer.toString('base64')) : null;
  const videoFile = req.files['video'] ? req.files['video'][0] : null;
   
  const emptyFields = [];
  if (!name) emptyFields.push('product name');
  if (!availability) emptyFields.push('availability');
  if (!category) emptyFields.push('category');
  if (!price) emptyFields.push('price');
  if (!imageFile) emptyFields.push('upload an image');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in the fields below: ', emptyFields });
  }

  // Save to MongoDB
  try {
    const user_id = req.user._id;
    const tagsArray = tags ? tags.split(',') : [];

    const product = await Product.create({
      user_id,
      name,
      category,
      size,
      price,
      edition,
      description,
      tags: tagsArray,
      brand,
      availability,
      image: imageFile.buffer.toString('base64'),
      images: imageFiles,
    });
    if (videoFile) {
      const video = await Video.create({
       video_id: product._id,
       data: videoFile?.buffer,
       size: videoFile?.size,
       content_type: videoFile?.mimetype
       });
    }
    res.status(200).json({ success: 'Data uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
////////////////////////////////////////////////////////////////

// delete product
 router.delete('/auth/:id', async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such product'})
  }
  const product = await Product.findOneAndDelete({_id: id})
  if(!product){
    return res.status(404).json({error: 'No such product'})
  }
  res.status(200).json(product)
})

//update product
router.patch('/auth/:id', async (req, res) =>{
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such product'})
  }

  const product = await Product.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!product) {
    return res.status(400).json({error: 'No such product'})
  }

  res.status(200).json(product)
})

export default router;