import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Phone, Globe, Clock, Star, Badge, ArrowLeft,
  Calendar, Heart, Share2, Bookmark
} from 'lucide-react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
//import { mockBusinesses } from '../data/mockData';
import RatingStars from '../components/common/RatingStars';
import { useAuth } from '../context/AuthContext';

interface Review {
  userName: string;
  text: string;
  rating: number;
  createdAt?: string;
}

interface Business {
  _id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  priceRange: string;
  location: {
    address: string;
    city: string;
    coordinates: [number, number];
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  hours: Record<string, string>;
  featured: boolean;
  badges: string[];
  discounts: {
    title: string;
    description: string;
    code: string;
    validUntil: string;
  }[];
  reviews: Review[];
}

const BusinessDetail: React.FC = () => {
  const { user } = useAuth();
  const { _id } = useParams<{ _id: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  //
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);


  console.log('Business ID:', _id);


  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/businesses/${_id}`);

        if (!res.ok) {
          throw new Error('Business not found');
        }
        const data = await res.json();
        setBusiness(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load business');
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [_id]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error('Geolocation error:', error);
      }
    );
  }, []);


  const handleSubmitReview = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!business) return;

  console.log("Current user:", user);

  const newReview = {
    text: reviewText,
    rating: rating,
  };

  try {
    const res = await fetch(`http://localhost:5000/api/businesses/${business._id}/reviews`, {
      method: 'POST',
      credentials: 'include', // ✅ send cookies!
      headers: {
        'Content-Type': 'application/json',
        // ✅ If using JWT, send it:
       // 'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      },
      body: JSON.stringify(newReview),
    });

    if (!res.ok) {
      throw new Error('Failed to submit review');
    }

    const updatedBusiness = await res.json();

    console.log('Review saved!', updatedBusiness);

    setBusiness(updatedBusiness);
    setReviewText('');
    setRating(0);
    setShowReviewForm(false);
  } catch (error) {
    console.error('Error submitting review:', error);
  }
};




  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error || !business) {
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
                <button
                  onClick={() => {
                    if (!userPosition) {
                      alert('Location not found. Please enable location services.');
                      return;
                    }
                    const [lat1, lon1] = userPosition;
                    const [lat2, lon2] = business.location.coordinates;

                    window.open(
                      `https://www.google.com/maps/dir/${lat1},${lon1}/${lat2},${lon2}`,
                      '_blank'
                    );
                  }}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  Get Directions
                </button>
                <button className="w-full bg-secondary-600 text-white py-3 rounded-lg hover:bg-secondary-700 transition-colors font-medium">
                  Call Now
                </button>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Write a Review
                </button>
              </div>
            </div>

            {showReviewForm && (
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center ${rating >= star ? 'bg-yellow-400 text-white' : 'bg-white'
                            }`}
                        >
                          {star}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={4}
                      required
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Share your experience..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>

              {business.reviews.length === 0 && (
                <p className="text-gray-600">No reviews yet. Be the first to write one!</p>
              )}

              <ul className="space-y-4">
                {business.reviews.map((review, index) => (
                  <li key={index} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-800">{review.userName}</span>
                      <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                    {review.createdAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
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