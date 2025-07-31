const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
 
    content: String,
    author: {
      name: String,
      avatar: String,
    },
    createdAt: Date,
    upvotes: Number,
    downvotes: Number,
  
});

const threadSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  tags: [String],
  upvotes: Number,
  downvotes: Number,
  replyCount: Number,
  isPinned: Boolean,
  isLocked: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    name: String,
    avatar: String,
  },
  replies: [replySchema],
});

module.exports = mongoose.model('Thread', threadSchema);
