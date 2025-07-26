import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Heart } from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (featured) {
    return (
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden group">
        <div className="h-64 lg:h-80 overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center space-x-4 mb-3">
            <span className="bg-accent-500 px-3 py-1 rounded-full text-xs font-medium">
              {post.category}
            </span>
            <div className="flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(post.publishedAt)}
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-300 transition-colors">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="text-gray-200 text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <p className="text-sm font-medium">{post.author.name}</p>
                <div className="flex items-center text-xs text-gray-300">
                  <Clock className="w-3 h-3 mr-1" />
                  {post.readTime} min read
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <Heart className="w-4 h-4 mr-1" />
              {post.likes}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="h-48 overflow-hidden">
        <img
          src={post.heroImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
            {post.category}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(post.publishedAt)}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          <Link to={`/blog/${post.slug}`} className="line-clamp-2">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                {post.readTime} min read
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Heart className="w-4 h-4 mr-1" />
            {post.likes}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.slice(0, 3).map((tag, index) => (
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
  );
};

export default BlogCard;