import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, ArrowUp, ArrowDown, MessageSquare, Pin, Lock, 
  Calendar, User, Heart, Flag, MoreHorizontal 
} from 'lucide-react';
import { mockForumThreads } from '../data/mockData';

const ForumThread: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const thread = mockForumThreads.find(t => t.id === threadId);
  const [replyContent, setReplyContent] = useState('');

  if (!thread) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thread not found</h2>
          <Link to="/forum" className="text-primary-600 hover:text-primary-700">
            Back to Forum
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getVoteColor = (vote: 'up' | 'down' | undefined, type: 'up' | 'down') => {
    if (vote === type) {
      return type === 'up' ? 'text-secondary-600 bg-secondary-50' : 'text-red-600 bg-red-50';
    }
    return 'text-gray-400 hover:text-gray-600 hover:bg-gray-50';
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reply submission
    console.log('Submitting reply:', replyContent);
    setReplyContent('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/forum"
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Forum
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Thread */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            {/* Vote Section */}
            <div className="flex flex-col items-center space-y-2 min-w-[3rem]">
              <button className={`p-2 rounded-lg transition-all ${getVoteColor(thread.userVote, 'up')}`}>
                <ArrowUp className="w-6 h-6" />
              </button>
              <span className="text-lg font-bold text-gray-700">
                {thread.upvotes - thread.downvotes}
              </span>
              <button className={`p-2 rounded-lg transition-all ${getVoteColor(thread.userVote, 'down')}`}>
                <ArrowDown className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-4">
                {thread.isPinned && (
                  <Pin className="w-5 h-5 text-primary-600" />
                )}
                {thread.isLocked && (
                  <Lock className="w-5 h-5 text-gray-500" />
                )}
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  {thread.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(thread.createdAt)}
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {thread.title}
              </h1>

              <div className="prose prose-gray max-w-none mb-6">
                {thread.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-3">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <img
                      src={thread.author.avatar}
                      alt={thread.author.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span className="text-sm font-medium text-gray-900">{thread.author.name}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {thread.replyCount} replies
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex flex-wrap gap-1">
                    {thread.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">
            Replies ({thread.replies.length})
          </h2>

          {thread.replies.map((reply) => (
            <div key={reply.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start space-x-4">
                {/* Vote Section */}
                <div className="flex flex-col items-center space-y-1 min-w-[2.5rem]">
                  <button className={`p-1 rounded transition-all ${getVoteColor(reply.userVote, 'up')}`}>
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium text-gray-700">
                    {reply.upvotes - reply.downvotes}
                  </span>
                  <button className={`p-1 rounded transition-all ${getVoteColor(reply.userVote, 'down')}`}>
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900">{reply.author.name}</span>
                        <div className="text-xs text-gray-500">
                          {formatDate(reply.createdAt)}
                        </div>
                      </div>
                    </div>
                    
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="prose prose-gray max-w-none mb-4">
                    {reply.content.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-2">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 text-sm">
                    <button className="text-gray-500 hover:text-primary-600 transition-colors">
                      Reply
                    </button>
                    <button className="text-gray-500 hover:text-red-600 transition-colors flex items-center">
                      <Flag className="w-3 h-3 mr-1" />
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        {!thread.isLocked && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add a Reply</h3>
            <form onSubmit={handleSubmitReply}>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={4}
                placeholder="Write your reply..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                required
              />
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">
                  Be respectful and constructive in your responses
                </p>
                <button
                  type="submit"
                  disabled={!replyContent.trim()}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post Reply
                </button>
              </div>
            </form>
          </div>
        )}

        {thread.isLocked && (
          <div className="bg-gray-100 rounded-xl p-6 mt-8 text-center">
            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">This thread is locked</h3>
            <p className="text-gray-500">No new replies can be added to this discussion.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumThread;