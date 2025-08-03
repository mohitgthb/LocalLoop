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
    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    const reply = {
      content: req.body.content,
      author: {
        name: req.user.name, // from JWT
        avatar: req.user.avatar || '',
      },
      authorId: req.user._id,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
    };

    thread.replies.push(reply);
    thread.replyCount += 1;

    await thread.save();

    //Socket.io, send notification:
    const io = req.app.get('io');
    io.to(thread.authorId.toString()).emit('newNotification', {
      type: 'reply',
      message: `${req.user.name} replied to your thread.`,
      threadId: thread._id,
    });
     res.status(200).json(thread);
  } catch (error) {
    res.status(500).json({ message: "Error adding reply", error });
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
