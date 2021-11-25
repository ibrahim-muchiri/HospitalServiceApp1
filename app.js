const express = require('express');
const morgan = require('morgan');

const customerRouter = require('./routes/customerRoute');
//const serviceRouter = require('./routes/serviceRoute');

const app = express();
if (process.env.NODE_ENV === 'development') {
 app.use(morgan('dev'));
}
app.use(express.json());

//service route

//customer route

//service Controller

//customer controller
app.use('/api/v1/customer', customerRouter);
//app.use('/api/v1/service', serviceRouter);
//app.use('/api/v1/users', userRouter);

module.exports = app;