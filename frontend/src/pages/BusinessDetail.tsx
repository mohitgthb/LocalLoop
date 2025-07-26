import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Phone, Globe, Clock, Star, Badge, ArrowLeft, 
  Calendar, Heart, Share2, Bookmark 
} from 'lucide-react';
import { mockBusinesses } from '../data/mockData';
import RatingStars from '../components/common/RatingStars';

const BusinessDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const business = mockBusinesses.find(b => b.id === id);

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Business not found</h2>
          <Link to="/discover" className="text-primary-600 hover:text-primary-700">
            Back to Discover
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/discover"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Discover
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 md:h-96 relative">
                <img
                  src={business.images[0]}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                {business.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all">
                    <Bookmark className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {business.images.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-4 overflow-x-auto">
                    {business.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${business.name} ${index + 2}`}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-75 transition-opacity"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Business Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {business.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{business.priceRange}</div>
                  <RatingStars
                    rating={business.rating}
                    reviewCount={business.reviewCount}
                    size="lg"
                  />
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {business.description}
              </p>

              {/* Badges */}
              {business.badges.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {business.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800"
                      >
                        <Badge className="w-4 h-4 mr-2" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Discounts */}
              {business.discounts && business.discounts.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Offers</h3>
                  <div className="space-y-3">
                    {business.discounts.map((discount, index) => (
                      <div key={index} className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-accent-800">{discount.title}</h4>
                            <p className="text-accent-700 text-sm mt-1">{discount.description}</p>
                            {discount.code && (
                              <div className="mt-2">
                                <span className="bg-accent-200 text-accent-800 px-2 py-1 rounded text-xs font-mono">
                                  Code: {discount.code}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-xs text-accent-600">
                              <Calendar className="w-3 h-3 mr-1" />
                              Valid until {new Date(discount.validUntil).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hours */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(business.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between py-1">
                      <span className="font-medium text-gray-700">{day}</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900 font-medium">{business.location.address}</p>
                    <p className="text-gray-600">{business.location.city}</p>
                  </div>
                </div>
                
                {business.contact.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                    <a 
                      href={`tel:${business.contact.phone}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {business.contact.phone}
                    </a>
                  </div>
                )}
                
                {business.contact.website && (
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                    <a 
                      href={business.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  Get Directions
                </button>
                <button className="w-full bg-secondary-600 text-white py-3 rounded-lg hover:bg-secondary-700 transition-colors font-medium">
                  Call Now
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Write a Review
                </button>
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this Business</h3>
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Facebook
                </button>
                <button className="flex-1 bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium">
                  Twitter
                </button>
                <button className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;