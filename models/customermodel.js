const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
 name: {
  type: String,
  minLength: 5,
  maxlength: 20,
  required: [true, 'Please, this field is being required!'],
 },
 email: {
  type: String,
  required: [true, 'email address ids being required here'],
  unique: [true, 'please, the email has been taken, select another email!'],
  lowercase: true,
  validate: [validator.isEmail, 'please provide a valid email'],
  index: true,
 },
 password: {
  type: String,
  required: [true, 'Password is required here'],
  select: false,
 },
 confirmPassword: {
  type: String,
  required: [true, 'Please, confirm your password'],
  select: true,
  validate: {
   validator: function(el) {
    return el === this.password;
   },
   message: 'Password must be the same',
  },
 },
});
customerSchema.pre('save', async function(next) {
 //Only run this if the password is modified
 if (!this.isModified('password')) return next();

 //Hash the password with the cost of 12
 this.password = await bcrypt.hash(this.password, 12);

 //Delete the confirmPassword in the db
 this.confirmPassword = undefined;
});
customerSchema.plugin(uniqueValidator);

//Login
customerSchema.methods.protectPassword = async function(
 candidatePassword,
 customerPassword
) {
 return await bcrypt.compare(candidatePassword, customerPassword);
};

const Customer = mongoose.model('Customer', customerSchema);

//Export to customerController n authController
module.exports = Customer;
