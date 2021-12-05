const jwt = require('jsonwebtoken');
const Customer = require('./../models/customermodel');

const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
 const newCustomer = await Customer.create(req.body);

 const token = jwt.sign({ id: newCustomer._id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN,
 });

 res.status(200).json({
  status: 'success',
  token,
  data: {
   customer: newCustomer,
  },
 });
});
