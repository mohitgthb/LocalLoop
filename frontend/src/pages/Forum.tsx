import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Search, Filter, TrendingUp } from 'lucide-react';
import ThreadCard from '../components/forum/ThreadCard';
import { mockForumThreads, forumCategories } from '../data/mockData';

interface Thread {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  replyCount: number;
  updatedAt: string;
  isPinned: boolean;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  replies: Array<{
    _id: string;
    content: string;
    author: {
      name: string;
      avatar: string;
    };
    createdAt: string;
  }>;
  isLocked: boolean;
}

const Forum: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/threads');
        const data = await res.json();
        setThreads(data);
      } catch (error) {
        console.error('Failed to fetch threads:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchThreads();
  }, []);



  const filteredThreads = useMemo(() => {
    let result = threads.filter((thread) => {
      // Category filter
      if (selectedCategory !== 'All' && thread.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery && 
          !thread.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !thread.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }

      return true;
    });

    // Sort threads
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        break;
      case 'replies':
        result.sort((a, b) => b.replyCount - a.replyCount);
        break;
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
    }

    // Pin pinned threads to top
    return result.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
  }, [threads, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Student Community Forum</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Connect with fellow students, ask questions, share experiences, and help each other succeed
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search discussions..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:ring-opacity-50 outline-none"
              />
            </div>
            
            <button className="bg-accent-500 text-white px-6 py-3 rounded-lg hover:bg-accent-600 transition-colors font-medium flex items-center justify-center">
              <Plus className="w-5 h-5 mr-2" />
              New Thread
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {forumCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="replies">Most Replies</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredThreads.length} discussions found
          </h2>
          {searchQuery && (
            <p className="text-gray-600 mt-1">Results for "{searchQuery}"</p>
          )}
        </div>

        {filteredThreads.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or browse all categories
            </p>
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium">
              Start a New Discussion
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredThreads.map((thread) => (
              <ThreadCard key={thread._id} thread={thread} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;