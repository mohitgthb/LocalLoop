import React, { useState } from 'react';
import { Filter, X, Star, DollarSign } from 'lucide-react';
import { categories } from '../../data/mockData';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const priceRanges = ['$', '$$', '$$$'];

  const handlePriceRangeChange = (range: string) => {
    const newRanges = selectedPriceRange.includes(range)
      ? selectedPriceRange.filter(r => r !== range)
      : [...selectedPriceRange, range];
    setSelectedPriceRange(newRanges);
    updateFilters({ priceRange: newRanges });
  };

  const updateFilters = (newFilter: any) => {
    const filters = {
      category: selectedCategory,
      rating: selectedRating,
      priceRange: selectedPriceRange,
      featuredOnly: showFeaturedOnly,
      ...newFilter,
    };
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedRating(0);
    setSelectedPriceRange([]);
    setShowFeaturedOnly(false);
    onFilterChange({
      category: 'All Categories',
      rating: 0,
      priceRange: [],
      featuredOnly: false,
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 bg-white shadow-lg lg:shadow-none z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:block
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Filter className="w-5 h-5 mr-2 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
              >
                Clear All
              </button>
              <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Featured Only */}
          <div className="mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => {
                  setShowFeaturedOnly(e.target.checked);
                  updateFilters({ featuredOnly: e.target.checked });
                }}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured Only</span>
            </label>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Category</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      updateFilters({ category: e.target.value });
                    }}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Minimum Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={selectedRating === rating}
                    onChange={(e) => {
                      const newRating = parseInt(e.target.value);
                      setSelectedRating(newRating);
                      updateFilters({ rating: newRating });
                    }}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-700">& up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h4>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPriceRange.includes(range)}
                    onChange={() => handlePriceRangeChange(range)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{range}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;