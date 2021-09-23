const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  {
    // include timestamps when created/updated
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
