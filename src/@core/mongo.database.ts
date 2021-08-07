import express from 'express';
import mongoose from 'mongoose';

const { MONGODB_URL } = process.env;
console.log(MONGODB_URL);

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

connection.once('open', function () {
  app.locals.db = connection.db.collection('agendaJobs');

  console.log('MongoDB database connection opened successfully.');
});
