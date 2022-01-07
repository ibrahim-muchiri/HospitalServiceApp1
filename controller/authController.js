const jwt = require('jsonwebtoken');
const Customer = require('./../models/customermodel');
const AppError = require('./../utils/appError');

const catchAsync = require('./../utils/catchAsync');

const signToken = (id) => {
 return jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN,
 });
};

exports.signup = catchAsync(async (req, res, next) => {
 const newCustomer = await Customer.create(req.body);

 const token = signToken(newCustomer._id);

 res.status(200).json({
  status: 'success',
  token,
  data: {
   customer: newCustomer,
  },
 });
});

exports.login = catchAsync(async (req, res, next) => {
 //email $ password!
 const { email, password } = req.body;

 //1).check if the email $ password exist
 if (!email || !password) {
  return next(new AppError('Please, provide email and password!', 400));
 }
 //2). check if the user exist $ password is correct
 const customer = await Customer.findOne({ email }).select('+password');

 if (
  !customer ||
  !(await customer.protectPassword(password, customer.password))
 ) {
  return next(new AppError('Incorrect password or email!', 401));
 }

 //  console.log(customer);
 //3). Send the response to the user
 const token = signToken(customer._id);
 res.status(200).json({
  status: 'success',
  token,
 });
});
