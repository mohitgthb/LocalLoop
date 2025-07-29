import React, { useState, useMemo, useEffect } from 'react';
import { Filter } from 'lucide-react';
import SearchBar from '../components/common/SearchBar';
import FilterSidebar from '../components/discovery/FilterSidebar';
import BusinessCard from '../components/discovery/BusinessCard';
//import { mockBusinesses } from '../data/mockData';

const Discover: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [filters, setFilters] = useState({
    category: 'All Categories',
    rating: 0,
    priceRange: [] as string[],
    featuredOnly: false,
  });
  const [businesses, setBusinesses] = useState<any[]>([]);


  useEffect(() => {
  const fetchBusinesses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/businesses'); // <-- your API route
      const data = await res.json();
      setBusinesses(data);
    } catch (err) {
      console.error('Failed to fetch businesses:', err);
    }
  };

  fetchBusinesses();
}, []);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      // Search query filter
      if (searchQuery && !business.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !business.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !business.category.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Location filter
      if (searchLocation && !business.location.address.toLowerCase().includes(searchLocation.toLowerCase()) &&
          !business.location.city.toLowerCase().includes(searchLocation.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category !== 'All Categories' && business.category !== filters.category) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && business.rating < filters.rating) {
        return false;
      }

      // Price range filter
      if (filters.priceRange.length > 0 && !filters.priceRange.includes(business.priceRange)) {
        return false;
      }

      // Featured only filter
      if (filters.featuredOnly && !business.featured) {
        return false;
      }

      return true;
    });
  }, [businesses, searchQuery, searchLocation, filters]);

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Discover Local Businesses</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Find the best cafés, restaurants, shops, and services near your campus with exclusive student deals
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex lg:space-x-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              isOpen={true}
              onClose={() => {}}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Mobile Filter Sidebar */}
          {/* <FilterSidebar
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            onFilterChange={handleFilterChange}
          /> */}

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredBusinesses.length} businesses found
                </h2>
                {(searchQuery || searchLocation) && (
                  <p className="text-gray-600 mt-1">
                    {searchQuery && `Results for "${searchQuery}"`}
                    {searchQuery && searchLocation && ' in '}
                    {searchLocation && `"${searchLocation}"`}
                  </p>
                )}
              </div>
              
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>

            {filteredBusinesses.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or browse all categories
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business._id} business={business} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;