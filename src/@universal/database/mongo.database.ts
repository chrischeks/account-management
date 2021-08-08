import express from 'express';
import mongoose from 'mongoose';

const { MONGODB_URL } = process.env;

export const connectMongo = async () => {
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    keepAlive: true,
  });
};
const app = express();
const { connection } = mongoose;
connection.on('error', (error: any) => {
  console.log(`MongoDB database connection error: ${error}`);
  throw error;
});
