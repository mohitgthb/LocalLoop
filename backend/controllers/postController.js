const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
};

// exports.getPostById = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post) {
//             return res.status(404).json({message: "Post not found"});
//         }
//         res.status(200).json(post);
//     } catch (error) {
//         res.status(500).json({message: "Error fetching post", error});
//     }
// };

exports.getPostByslug = async (req, res) => {
     try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error });
    }
}

exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) { 
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(updatedPost);
    } catch (error) {   
        res.status(500).json({ message: "Error updating post", error });
    }   
}

exports.addComment = async (req, res) => {
    const { slug } = req.params;
    const { content, authorName, authorAvatar } = req.body;

  try {
    const post = await Post.findOne({ slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const newComment = {
      content,
      author: {
        name: req.user.name || 'Anonymous',
        avatar: authorAvatar || 'https://placehold.co/40x40',
      },
      createdAt: new Date(),
      likes: 0,
    };

    post.comments.push(newComment);
    await post.save();

    res.json(post); // return updated post
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding comment' });
  }
};

exports.like = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) return res.status(404).send('Post not found');

  post.likes += 1;
  await post.save();

  res.json(post);
}

exports.dislike = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) return res.status(404).send('Post not found'); 
  if (post.likes > 0) {
    post.likes -= 1;
  }
  await post.save();
  res.json(post);
};