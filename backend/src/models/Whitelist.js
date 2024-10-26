import mongoose from 'mongoose';

const whitelistSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  ipv4: {
    type: String,
    required: true
  },
  ipv6: {
    type: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export const Whitelist = mongoose.model('Whitelist', whitelistSchema);