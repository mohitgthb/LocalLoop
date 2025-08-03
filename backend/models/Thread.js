const mongoose = require('mongoose');
const { Schema } = mongoose;

const replySchema = new Schema({
  content: String,
  author: {
    name: String,
    avatar: String,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
});

const threadSchema = new Schema({
  title: String,
  content: String,
  category: String,
  tags: [String],
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  replyCount: {
    type: Number,
    default: 0,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
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
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  replies: [replySchema],
});

module.exports = mongoose.model('Thread', threadSchema);
