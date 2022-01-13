const express = require('express');
const serviceController = require('./../controller/serviceController');
const router = express.Router();
const authController = require('./../controller/authController');

router
 .route('/')
 .get(authController.protect, serviceController.getAllService)
 .post(serviceController.createService);

router
 .route('/:id')
 .get(serviceController.getService)
 .patch(serviceController.updateService)
 .delete(
  authController.protect,
  authController.restrictTo('Admin', 'Doctor'),
  serviceController.deleteService
 );

module.exports = router;
