const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const reviewSchema = new mongoose.Schema(
 {
  review: {
   type: 'String',
   required: [true, 'Review must not be empty'],
  },
  createdAt: {
   type: Date,
   default: Date.now(),
  },
  service: {
   type: mongoose.Schema.ObjectId,
   ref: 'Service',
   required: [true, 'Review should be from the service'],
  },
  customer: {
   type: mongoose.Schema.ObjectId,
   ref: 'Customer',
   required: [true, 'Review must be from the customer'],
  },
 },
 {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
 }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
