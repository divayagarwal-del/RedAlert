import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js'; // make sure this is exported correctly

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`✅ MongoDB connected successfully to database: ${DB_NAME}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDb;
