const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String, // e.g., 'reply', 'like'
    required: true,
  },
  message: String, // e.g., 'John replied to your thread'
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
