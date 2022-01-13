const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAll = (Model) =>
 catchAsync(async (req, res, next) => {
  const doc = await Model.find();

  res.status(200).json({
   status: 'success',
   result: doc.length,
   data: {
    doc,
   },
  });
 });

exports.getOne = (Model) =>
 catchAsync(async (req, res, next) => {
  const doc = await Model.findById(req.params.id);

  res.status(200).json({
   status: 'success',
   data: {
    doc,
   },
  });
 });

exports.createOne = (Model) =>
 catchAsync(async (req, res, next) => {
  const doc = await Model.create(req.body);

  res.status(200).json({
   status: 'success',
   data: {
    doc,
   },
  });
 });

exports.updateOne = (Model) =>
 catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
   status: 'success',
   data: {
    doc,
   },
  });
 });
exports.deleteOne = (Model) =>
 catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
   return next(new AppError('Please, there is no document with that id', 404));
  }

  res.status(200).json({
   status: 'success',
   data: {
    doc: 'null',
   },
  });
 });
