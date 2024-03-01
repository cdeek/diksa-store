import mongoose from 'mongoose';
import express from 'express';
import SavedItem  from './models/saved_items_model.js';
import useAuth from './authentication.js';

const router = express.Router();

//require auth for all users
router.use(useAuth);


router.post('/', async (req, res) => {
  const user_id = req.user._id;
  const cartItem = new SavedItem({
   user_id,
   product_id: req.body.product_id,
   product_name: req.body.name
  });
  await cartItem.save();
  res.status(200).json({message: "saved"})
});


router.get('/', async (req, res) => {
  const user_id = req.user._id;
  const cartItems = await SavedItem.find({user_id});
  res.status(200).json(cartItems);
}); 


router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Not found'})
  }
  const cartItem = await SavedItem.findOneAndDelete({product_id: id});
  res.status(200).json({message: "removed"})
}); 

export default router;