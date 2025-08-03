import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Heart, Share2, MessageSquare } from 'lucide-react';
import { mockBlogPosts } from '../data/mockData';
import { useAuth } from '../context/AuthContext';


interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  heroImage: string;
  category: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
  publishedAt: string;
  readTime: number;
  likes: number;
  comments: Array<{
    _id: string;
    content: string;
    author: {
      name: string;
      avatar: string;
    };
    createdAt: string;
    likes: number;
  }>;
}


const BlogPost: React.FC = () => {
  const { user } = useAuth();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);


  //const post = mockBlogPosts.find(p => p.slug === slug);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${slug}`);
        if (!res.ok) throw new Error('Post not found');
        const data = await res.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${slug}/comments`, {
        method: 'POST',
        credentials: 'include',//
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          content: newComment,
          authorAvatar: 'https://placehold.co/40x40',
        }),
      });

      if (!res.ok) throw new Error('Failed to post comment');
      const updatedPost = await res.json();
      setPost(updatedPost); // update state with new comment
      setNewComment(''); // clear form
    } catch (err) {
      console.error(err);
      alert('Could not post comment.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleLike = async () => {
  if (hasLiked) {
    // If already liked → dislike
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${slug}/dislike`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });

      if (!res.ok) throw new Error('Failed to dislike post');
      const updatedPost = await res.json();
      setPost(updatedPost);
      setHasLiked(false);
    } catch (err) {
      console.error(err);
      alert('Could not dislike post.');
    }
  } else {
    // If not liked → like
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${slug}/like`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });

      if (!res.ok) throw new Error('Failed to like post');
      const updatedPost = await res.json();
      setPost(updatedPost);
      setHasLiked(true);
    } catch (err) {
      console.error(err);
      alert('Could not like post.');
    }
  }
};




  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
          <Link to="/blog" className="text-primary-600 hover:text-primary-700">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={post.heroImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg -mt-16 relative z-10 p-8">
          {/* Post Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime} min read
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {post.excerpt}
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
              <div className="flex items-center">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{post.author.name}</h3>
                  <p className="text-gray-600 text-sm">{post.author.bio}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-600">
                  <button onClick={handleToggleLike} className="flex items-center space-x-1">
                    <Heart
                      className={`w-6 h-6 ${hasLiked ? 'text-red-500' : 'text-gray-500'}`}
                      fill={hasLiked ? 'red' : 'none'}
                    />
                    {post.likes}
                  </button>


                </div>
                <div className="flex items-center text-gray-600">
                  <MessageSquare className="w-5 h-5 mr-1" />
                  {post.comments.length}
                </div>
                <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              } else if (paragraph.startsWith('# ')) {
                return (
                  <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                    {paragraph.replace('# ', '')}
                  </h1>
                );
              } else if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n').filter(line => line.startsWith('- '));
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 my-4">
                    {listItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-700">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              } else {
                return (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              }
            })}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-primary-100 hover:text-primary-600 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Social Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button  onClick={handleToggleLike} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Heart className="w-4 h-4 mr-2" />
                Like ({post.likes})
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-lg mt-8 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({post.comments.length})
          </h3>

          {post.comments.length > 0 ? (
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <div key={comment._id} className="flex space-x-4">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{comment.author.name}</h4>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-4">
                      <button className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                        Like ({comment.likes})
                      </button>
                      <button className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No comments yet. Be the first to comment!</p>
          )}

          {/* Comment Form */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Leave a Comment</h4>
            <form className="space-y-4" onSubmit={handleSubmitComment}>
              <textarea
                rows={4}
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;