import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const productSchema = new Schema({
  user_id: String,
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
   type: String,
   required: true
  },
  images: [String],
  price: {
    type: Number,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  description: String,
  tags: Array,
  brand: String,
  edition: String,
  size: String
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

export default Product;
