const AppError = require('./../utils/appError');

module.exports = (err, req, res, next) => {
 //   console.log(err.stack);

 err.statusCode = err.statusCode || 500;
 err.status = err.status || 'Error';

 if (process.env.NODE_ENV === 'development') {
  res.status(err.statusCode).json({
   status: err.status,
   error: err,
   message: err.message,
   stack: err.stack,
  });
 }
 if (process.env.NODE_ENV === 'development') {
  res.status(err.statusCode).json({
   status: err.status,
   message: err.message,
  });
 }
};
