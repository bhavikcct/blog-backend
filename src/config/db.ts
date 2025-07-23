import mongoose from 'mongoose';

declare global {
  var mongooseConnection: Promise<typeof mongoose> | undefined;
}

export const connectDB = async () => {
  global.mongooseConnection ??= mongoose.connect(process.env.MONGO_URI!, {});

  try {
    await global.mongooseConnection;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
