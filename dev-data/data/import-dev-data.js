const fs = require('fs');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const Service = require('./../../models/serviceModel');

dotEnv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
 '<PASSWORD>',
 process.env.DATABASE_PASSWORD
);

mongoose
 .connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  //userFindAndModify: false
 })
 .then(() => console.log('Database connected successfully!'));

//Reading JSON file
const services = JSON.parse(
 fs.readFileSync(`${__dirname}/service.json`, 'utf-8')
);

//import data to DB
const importData = async () => {
 try {
  await Service.create(services);
  console.log('Data loaded successfully!');
 } catch (err) {
  console.log(err);
 }
 process.exit();
};

//delete data in db
const deleteData = async () => {
 try {
  await Service.deleteMany();
  console.log('Data deleted successfully!');
 } catch (err) {
  console.log(err);
 }
 process.exit();
};

if (process.argv[2] === '--import') {
 importData();
} else if (process.argv[2] === '--delete') {
 deleteData();
}
