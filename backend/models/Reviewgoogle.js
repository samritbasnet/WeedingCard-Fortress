// ReviewModel.js

const mongoose = require('mongoose');

const reviewSchemaGoogle = new mongoose.Schema({
  user: {
    type: String, 
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const ReviewGoogle = mongoose.model('ReviewGoogle', reviewSchemaGoogle);

module.exports = ReviewGoogle;