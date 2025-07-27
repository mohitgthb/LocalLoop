const Thread = require('../models/Thread');

// Get all threads
exports.getThreads = async (req, res) => {
  try {
    const threads = await Thread.find().sort({ createdAt: -1 });
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single thread
exports.getThreadById = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: 'Thread not found' });
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new thread
exports.createThread = async (req, res) => {
  try {
    const newThread = new Thread(req.body);
    await newThread.save();
    res.status(201).json(newThread);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add a reply
exports.addReply = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: 'Thread not found' });

    thread.replies.push(req.body);
    await thread.save();
    res.status(201).json(thread);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Upvote thread
exports.upvoteThread = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: 'Thread not found' });

    thread.upvotes += 1;
    await thread.save();
    res.json(thread);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
