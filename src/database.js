import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const whitelistSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  ipv4: {
    type: String,
    required: true
  },
  ipv6: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Whitelist = mongoose.model('Whitelist', whitelistSchema);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};