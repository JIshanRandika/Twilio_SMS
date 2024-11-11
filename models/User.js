// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone_number: { type: String, required: true, unique: true },
  key: String,
  value: String,
  last_updated: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
