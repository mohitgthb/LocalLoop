import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import BlogCard from '../components/blog/BlogCard';
import { mockBlogPosts, blogCategories } from '../data/mockData';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return mockBlogPosts.filter((post) => {
      // Category filter
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery && 
          !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Student Life Blog</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
            Tips, trends, and stories from the student community to help you make the most of your college experience
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:ring-opacity-50 outline-none"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredPosts.length} articles found
          </h2>
          {searchQuery && (
            <p className="text-gray-600 mt-1">Results for "{searchQuery}"</p>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all categories
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Featured Articles</h3>
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <BlogCard post={featuredPosts[0]} featured />
                  </div>
                  <div className="space-y-6">
                    {featuredPosts.slice(1, 3).map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Regular Posts */}
            {regularPosts.length > 0 && (
              <div>
                {featuredPosts.length > 0 && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">More Articles</h3>
                )}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;