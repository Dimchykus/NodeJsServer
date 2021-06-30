const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://dima123:dima123@cluster0-shard-00-00.jjkro.mongodb.net:27017,cluster0-shard-00-01.jjkro.mongodb.net:27017,cluster0-shard-00-02.jjkro.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-a4w5u3-shard-0&authSource=admin&retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
};
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, options);
    console.log('Connected to db');
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectDB;
