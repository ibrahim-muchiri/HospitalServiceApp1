const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');

// process.on('UncaughtException', (err) => {
//  console.log('UNCAUGHT EXCEPTION! 😁 Shuttingdown😢...');
//  console.log(err.name, err.message);

//  process.exit(1);
// });

const Service = require('./models/customermodel');

dotEnv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
 '<PASSWORD>',
 process.env.DATABASE_PASSWORD
);

mongoose
 .connect(DB, {
  useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true,
  //userFindAndModify: false,
 })
 .then(() => console.log('Database connected successfully!'));

const port = process.env.PORT || 7000;
const server = app.listen(port, '127.0.0.1', () => {
 console.log(`server started at port: ${port}...`);
});

process.on('unhandledRejection', (err) => {
 console.log('UnhandledError😁 Shuttingdown😢...');
 console.log(err.name, err.message);
 server.close(() => {
  process.exit(1);
 });
});
