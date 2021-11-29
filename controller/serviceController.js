const catchAsync = require('./../utils/catchAsync');
const Service = require('./../models/serviceModel');

exports.getAllService = catchAsync(async (req, res, next) => {
 const service = await Service.find();

 res.status(200).json({
  status: 'success',
  data: {
   service,
  },
 });
});

exports.getService = catchAsync(async (req, res, next) => {
 const service = await Service.findById(req.params.id);

 res.status(200).json({
  status: 'success',
  data: {
   service,
  },
 });
});

exports.createService = catchAsync(async (req, res, next) => {
 const service = await Service.create(req.body);

 res.status(201).json({
  status: 'success',
  data: {
   service,
  },
 });
});

exports.updateService = catchAsync(async (req, res, next) => {
 const service = await Service.findByIdAndUpdate(req.params.id, req.body);

 res.status(204).json({
  status: 'success',
  data: {
   service,
  },
 });
});

exports.deleteService = catchAsync(async (req, res, next) => {
 const service = await Service.findByIdAndDelete(req.params.id);

 res.status(200).json({
  status: 'success',
  message: 'deleted successfully!',
 });
});
