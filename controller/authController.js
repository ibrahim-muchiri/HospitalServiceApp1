const Customer = require('./../models/customermodel');

const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
 const newCustomer = await Customer.create(req.body);

 res.status(200).json({
  status: 'success',
  data: {
   customer: newCustomer,
  },
 });
});
