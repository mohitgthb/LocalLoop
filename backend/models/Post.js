const mongoose = require('mongoose');

// Comment subdocument schema
const CommentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: {
    type: String,
    required: true,
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

// Post schema
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    name: {
      type: String,
      required: true,
      default: 'Anonymous',
    },
    avatar: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  heroImage: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  readTime: {
    type: Number,
    default: 5, // or calculate this when saving
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [CommentSchema],
});

module.exports = mongoose.model('Post', PostSchema);
