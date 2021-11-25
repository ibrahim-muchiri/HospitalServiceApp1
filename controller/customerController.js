const Service = require('./../models/customermodel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllCustomers = catchAsync(async (req, res, next) => {
 const service = await Service.find();

 res.status(200).json({
  status: 'success',
  data: {
   service,
  },
 });
});

exports.getCustomer = catchAsync(async (req, res, next) => {
 const service = await Service.findById(req.params.id);

 res.status(200).json({
  status: 'success',
  data: {
   service,
  },
 });
});

exports.createCustomer = catchAsync(async (req, res, next) => {
 const service = await Service.create(req.body);

 res.status(201).json({
  status: 'success',
  data: {
   service,
  },
 });
});

exports.updateCustomer = catchAsync(async (req, res, next) => {
 const service = await Service.findByIdAndUpdate(req.params.id, req.body);

 res.status(204).json({
  status: 'success',
  data: {
   service,
  },
 });
});

exports.deleteCustomer = catchAsync(async (req, res, next) => {
 const service = await Service.findByIdAndDelete(req.params.id);

 res.status(200).json({
  status: 'success',
  message: 'deleted successfully!',
 });
});
