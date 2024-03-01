import mongoose from 'mongoose';

const savedItemSchema = new mongoose.Schema({
  user_id: String,
  product_id: String,
  product_name: String
});

const SavedItem = mongoose.model('SavedItem', savedItemSchema);

export default SavedItem;