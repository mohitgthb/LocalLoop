const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  author: {
    type: String,
    default: 'Anonymous'
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Anonymous'
  },
  replies: [ReplySchema],
  upvotes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Thread', ThreadSchema);
