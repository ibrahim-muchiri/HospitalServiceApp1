// const catchAsync = require('./../utils/catchAsync');

// exports.getAllService = catchAsync(async (req, res, next) => {
//  const service = await SERVICE.find();

//  res.status(200).json({
//   status: 'success',
//   data: {
//    service,
//   },
//  });
// });

// exports.getService = catchAsync(async (req, res, next) => {
//  const service = await SERVICE.findById(req.params.id);

//  res.status(200).json({
//   status: 'success',
//   data: {
//    service,
//   },
//  });
// });

// exports.createService = catchAsync(async (req, res, next) => {
//  const service = await SERVICE.create(req.body);

//  res.status(201).json({
//   status: 'success',
//   data: {
//    service,
//   },
//  });
// });

// exports.updateService = catchAsync(async (req, res, next) => {
//  const service = await SERVICE.findByIdAndUpdate(req.params.id, req.body);

//  res.status(204).json({
//   status: 'success',
//   data: {
//    service,
//   },
//  });
// });

// exports.deleteService = catchAsync(async (req, res, next) => {
//  const service = await SERVICE.findByIdAndDelete(req.params.id);

//  res.status(200).json({
//   status: 'success',
//   message: 'deleted successfully!',
//  });
// });
