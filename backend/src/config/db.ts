
import mongoose from 'mongoose';
import logger from '../utils/logger';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
