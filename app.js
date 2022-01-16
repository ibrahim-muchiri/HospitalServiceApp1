const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const customerRouter = require('./routes/customerRoute');
const serviceRouter = require('./routes/serviceRoute');
const reviewRouter = require('./routes/reviewRoute');

const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');

const app = express();
//MiddleWares
if (process.env.NODE_ENV === 'development') {
 app.use(morgan('dev'));
}
app.use(express.json());

//Implement cors
app.use(cors());

app.options('*', cors());

app.use((req, res, next) => {
 req.requestTime = new Date().toISOString();
 console.log(req.headers);
 next();
});

//customer route

//service Controller

//customer controller

app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
 next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
