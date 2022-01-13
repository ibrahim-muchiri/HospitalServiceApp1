const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
//const parse = require('nodemon/lib/cli/parse');

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
 role: {
  type: String,
  enum: ['Customer', 'Doctor', 'Nurse', 'Clinical-Officer', 'Admin'],
  default: 'Customer',
  //required: [true, 'Please, this field is required'],
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
 passwordChangedAt: {
  type: Date,
 },
 passwordResetToken: String,
 passwordResetExpires: Date,
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
customerSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
 if (this.passwordChangedAt) {
  const changedTimestamp = parseInt(
   this.passwordChangedAt.getTime() / 1000,
   10
  );
  console.log(this.passwordChangedAt, JWTTimestamp);
  return JWTTimestamp < changedTimestamp;
 }
 //FALSE means not changed
 return false;
};
customerSchema.methods.createPasswordResetToken = function() {
 const resetToken = crypto.randomBytes(32).toString('hex');
 this.passwordResetToken = crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex');

 console.log({ resetToken }, this.passwordResetToken);

 this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

 return resetToken;
};

const Customer = mongoose.model('Customer', customerSchema);

//Export to customerController n authController
module.exports = Customer;
