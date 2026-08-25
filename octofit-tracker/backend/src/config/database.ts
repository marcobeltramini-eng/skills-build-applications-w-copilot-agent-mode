import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async () => {
  await mongoose.connect(connectionString);
  console.log('Connected to octofit_db');
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
};

export default mongoose;
