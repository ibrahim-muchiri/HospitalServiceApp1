const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Customer = require('./../models/customermodel');
const AppError = require('./../utils/appError');

const catchAsync = require('./../utils/catchAsync');
const { userInfo } = require('os');

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

exports.protect = catchAsync(async (req, res, next) => {
 //1) Get the token and check if its there
 let token;
 if (
  req.headers.authorization &&
  req.headers.authorization.startsWith('Bearer')
 ) {
  token = req.headers.authorization.split(' ')[1];
 }
 console.log(token);

 if (!token) {
  //   console.log(token);
  next(new AppError('Please, Log in first for you to get access', 401));
 }

 //2) Verification of the token
 const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
 console.log(decoded);
 //3.) Check if the user still exist
 const freshCustomer = await Customer.findById(decoded.id);
 if (!freshCustomer) {
  return next(
   new AppError('The user belonging to this id nolonger exist', 401)
  );
  //console.log(freshUser);
 }
 //4.) Check if the user changed the password after the token was issued
 if (freshCustomer.changedPasswordAfter(decoded.iat)) {
  return next(
   new AppError('User recently changed the password!, please log in again', 401)
  );
 }

 //GRANT ACCESS TO THE PROTECTED ROUTE
 req.customer = freshCustomer;
 next();
});

exports.restrictTo = (...roles) => {
 return (req, res, next) => {
  if (!roles.includes(req.customer.role)) {
   return next(
    new AppError('You do not have a permission to perform this action', 403)
   );
  }
  next();
 };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
 //1.) Get user based on POsted email
 const customer = await Customer.findOne({ email: req.body.email });
 if (!customer) {
  return next(new AppError('There is no user with that email address!', 404));
 }
 //2.) Genetrate the random reset token
 const resetToken = customer.createPasswordResetToken();
 await customer.save({ validateBeforeSave: false });

 //3.) Send it to the user's email
 const resetURL = `${req.protocol}://${req.get(
  'host'
 )}/api/v1/customers/resetPassword/${resetToken}`;

 const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nif you didn't forget your password, please ignore this email `;

 try {
  await sendEmail({
   email: customer.email,
   subject: 'Your password reset token (valid for 10 min)',
   message,
  });

  res.status(200).json({
   status: 'success',
   message: 'Token sent to email',
  });
 } catch (err) {
  customer.passwordResetToken = undefined;
  customer.passwordResetExpires = undefined;
  await customer.save({ validateBeforeSave: false });

  return next(
   new AppError(
    'There was an error sending the email, please try again later!'
   ),
   500
  );
 }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
 //1.Get user based on the token
 const hashedPassword = crypto
  .createHash(sha256)
  .update(req.params.token)
  .diget('Hex');

 const customer = await Customer.findOne({
  passwordResetToken: hashedPassword,
  passwordResetExpires: { $gt: Date.now() },
 });

 //2. If token has not expired, there is a new user, send a new password
 if (!customer) {
  return next(new AppError('token is invalid or has expired', 401));
 }
 const password = req.body.password;
 const confirmPassword = req.body.confirmPassword;
 const passwordResetExpires = undefined;
 const passwordResetToken = undefined;
 await customer.save();

 //3.

 //4. Log a customer in, send JWT
 const token = signToken(user._id);
 res.status(200).json({
  status: 'success',
  token,
 });
});
