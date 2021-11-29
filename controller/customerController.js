const Customer = require('./../models/customermodel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllCustomers = catchAsync(async (req, res, next) => {
 const customer = await Customer.find();

 res.status(200).json({
  status: 'success',
  data: {
   customer,
  },
 });
});

exports.getCustomer = catchAsync(async (req, res, next) => {
 const customer = await Customer.findById(req.params.id);

 res.status(200).json({
  status: 'success',
  data: {
   customer,
  },
 });
});

exports.createCustomer = catchAsync(async (req, res, next) => {
 const customer = await Customer.create(req.body);

 res.status(201).json({
  status: 'success',
  data: {
   customer,
  },
 });
});

exports.updateCustomer = catchAsync(async (req, res, next) => {
 const customer = await Customer.findByIdAndUpdate(req.params.id, req.body);

 res.status(204).json({
  status: 'success',
  data: {
   customer,
  },
 });
});

exports.deleteCustomer = catchAsync(async (req, res, next) => {
 const customer = await Customer.findByIdAndDelete(req.params.id);

 res.status(200).json({
  status: 'success',
  message: 'deleted successfully!',
 });
});
