const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
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
app.listen(port, '127.0.0.1', () => {
 console.log(`server started at port: ${port}...`);
});
