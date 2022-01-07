const express = require('express');
const customerController = require('./../controller/customerController');
const authController = require('./../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router
 .route('/')
 .get(customerController.getAllCustomers)
 .post(customerController.createCustomer);

router
 .route('/:id')
 .get(customerController.getCustomer)
 .patch(customerController.updateCustomer)
 .delete(customerController.deleteCustomer);

module.exports = router;
