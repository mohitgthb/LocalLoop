import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Users, MapPin, MessageSquare, BookOpen, ArrowRight, Star } from 'lucide-react';
import SearchBar from '../components/common/SearchBar';
import BusinessCard from '../components/discovery/BusinessCard';
import BlogCard from '../components/blog/BlogCard';
import { mockBusinesses, mockBlogPosts } from '../data/mockData';

const Home: React.FC = () => {
  const featuredBusinesses = mockBusinesses.filter(business => business.featured);
  const featuredPosts = mockBlogPosts.filter(post => post.featured);

  const handleSearch = (query: string, location: string) => {
    console.log('Searching for:', query, 'in', location);
    // Navigate to discover page with search params
  };

  const stats = [
    { icon: Users, label: 'Active Students', value: '10,000+' },
    { icon: MapPin, label: 'Local Businesses', value: '500+' },
    { icon: MessageSquare, label: 'Forum Posts', value: '5,000+' },
    { icon: BookOpen, label: 'Blog Articles', value: '200+' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Discover Local Businesses',
      description: 'Find the best cafés, restaurants, shops, and services near your campus with student discounts and reviews.',
    },
    {
      icon: BookOpen,
      title: 'Read & Share Stories',
      description: 'Stay updated with the latest student life tips, campus trends, and lifestyle content from fellow students.',
    },
    {
      icon: MessageSquare,
      title: 'Connect with Community',
      description: 'Join discussions, ask questions, and share experiences in our vibrant student community forum.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Your Campus <span className="text-accent-300">Community</span> Hub
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Discover local businesses, connect with fellow students, and stay updated with the latest campus life
            </p>
            <div className="max-w-4xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map(({ icon: Icon, label, value }, index) => (
              <div key={index} className="text-center animate-bounce-subtle" style={{ animationDelay: `${index * 0.1}s` }}>
                <Icon className="w-8 h-8 mx-auto mb-2 text-accent-300" />
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-sm text-primary-200">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              StudentHub brings together local discovery, community discussions, and valuable content to enhance your campus experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 group">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Businesses</h2>
              <p className="text-gray-600">Discover popular spots with exclusive student deals</p>
            </div>
            <Link 
              to="/discover" 
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium group"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest from the Blog</h2>
              <p className="text-gray-600">Tips, trends, and stories from the student community</p>
            </div>
            <Link 
              to="/blog" 
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium group"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {featuredPosts[0] && <BlogCard post={featuredPosts[0]} featured />}
            </div>
            <div className="space-y-6">
              {featuredPosts.slice(1, 3).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the Community?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Connect with thousands of students, discover amazing local businesses, and stay updated with campus life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign Up Free
            </Link>
            <Link
              to="/discover"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;