import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  country: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }}, { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User;
