const catchAsync = require('./../utils/catchAsync');
const Service = require('./../models/serviceModel');
const factory = require('./handlerFactory');

exports.getAllService = factory.getAll(Service);

exports.getService = factory.getOne(Service);
exports.createService = factory.createOne(Service);
exports.updateService = factory.updateOne(Service);

exports.deleteService = factory.deleteOne();
