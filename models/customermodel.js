const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
 name: {
  type: String,
  required: [true, 'Please, this field is being required!'],
 },
 email: {
  type: String,
  required: [true, 'email address ids being required here'],
 },
 password: {
  type: String,
  required: [true, 'Password is required here'],
 },
 confirmPassword: {
  type: String,
  required: [true, 'Please, confirm your password'],
 },
});
const Service = mongoose.model('Service', customerSchema);

module.exports = Service;
