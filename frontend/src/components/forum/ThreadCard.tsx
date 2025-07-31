import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowUp, ArrowDown, Pin, Lock, Calendar, User } from 'lucide-react';
import { ForumThread } from '../../types';

interface ThreadCardProps {
  thread: ForumThread;
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
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
      return type === 'up' ? 'text-secondary-600' : 'text-red-600';
    }
    return 'text-gray-400 hover:text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
      <div className="flex items-start space-x-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center space-y-1 min-w-[3rem]">
          <button className={`p-1 rounded transition-colors ${getVoteColor(thread.userVote, 'up')}`}>
            <ArrowUp className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-gray-700">
            {thread.upvotes - thread.downvotes}
          </span>
          <button className={`p-1 rounded transition-colors ${getVoteColor(thread.userVote, 'down')}`}>
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            {thread.isPinned && (
              <Pin className="w-4 h-4 text-primary-600" />
            )}
            {thread.isLocked && (
              <Lock className="w-4 h-4 text-gray-500" />
            )}
            <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
              {thread.category}
            </span>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(thread.createdAt)}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            <Link to={`/forum/${thread._id}`} className="line-clamp-2">
              {thread.title}
            </Link>
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {thread.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img
                  src={thread.author.avatar}
                  alt={thread.author.name}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-sm text-gray-700">{thread.author.name}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <MessageSquare className="w-4 h-4 mr-1" />
                {thread.replyCount} replies
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {thread.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;