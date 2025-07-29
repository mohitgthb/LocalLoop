import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Star, Badge } from 'lucide-react';
import { Business } from '../../types';
import RatingStars from '../common/RatingStars';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {

  console.log('BusinessCard rendered for:', business._id);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={business.images[0]}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {business.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-gray-900 bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
            {business.priceRange}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            <Link to={`/listing/${business._id}`}>{business.name}</Link>
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {business.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {business.description}
        </p>

        <div className="space-y-2 mb-3">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{business.location.address}</span>
          </div>
          {business.contact.phone && (
            <div className="flex items-center text-gray-500 text-sm">
              <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{business.contact.phone}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <RatingStars
            rating={business.rating}
            reviewCount={business.reviewCount}
            size="sm"
          />
        </div>

        {/* Badges */}
        {business.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {business.badges.slice(0, 3).map((badge, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800"
              >
                <Badge className="w-3 h-3 mr-1" />
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Discount */}
        {business.discounts && business.discounts.length > 0 && (
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-2 mb-3">
            <p className="text-accent-800 text-sm font-medium">
              {business.discounts[0].title}
            </p>
            <p className="text-accent-600 text-xs">
              {business.discounts[0].description}
            </p>
          </div>
        )}

        <Link
          to={`/listing/${business._id}`}
          className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BusinessCard;