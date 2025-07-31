import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

interface BusinessFormData {
  name: string;
  description: string;
  category: string;
  images: string[];
  priceRange: string;
  address: string;
  city: string;
  lat: string;
  lon: string;
  phone: string;
  email: string;
  website: string;
}

const Admin: React.FC = () => {
  const [formData, setFormData] = useState<BusinessFormData>({
    name: '',
    description: '',
    category: '',
    images: [],
    priceRange: '$',
    address: '',
    city: '',
    lat: '',
    lon: '',
    phone: '',
    email: '',
    website: '',
  });

  const [imageInput, setImageInput] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setFormData(prev => ({ ...prev, images: [...prev.images, imageInput.trim()] }));
      setImageInput('');
    }
  };

  const handleGeocode = async () => {
    const query = encodeURIComponent(`${formData.address}, ${formData.city}`);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        setFormData(prev => ({
          ...prev,
          lat: lat,
          lon: lon,
        }));
        alert(`Coordinates found: ${lat}, ${lon}`);
      } else {
        alert('No results found. Check your address.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to fetch coordinates.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBusiness = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      images: formData.images,
      priceRange: formData.priceRange,
      location: {
        address: formData.address,
        city: formData.city,
        coordinates: [
          parseFloat(formData.lat),
          parseFloat(formData.lon)
        ],
      },
      contact: {
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
      },
    };

    try {
      const res = await fetch('http://localhost:5000/api/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBusiness),
      });

      if (!res.ok) {
        throw new Error('Failed to add business');
      }

      alert('Business added successfully!');
      setFormData({
        name: '',
        description: '',
        category: '',
        images: [],
        priceRange: '$',
        address: '',
        city: '',
        lat: '',
        lon: '',
        phone: '',
        email: '',
        website: '',
      });
    } catch (error) {
      console.error(error);
      alert('Error adding business.');
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setFormData(prev => ({
          ...prev,
          lat: e.latlng.lat.toFixed(6),
          lon: e.latlng.lng.toFixed(6),
        }));
      },
    });

    return formData.lat && formData.lon ? (
      <Marker position={[parseFloat(formData.lat), parseFloat(formData.lon)]}></Marker>
    ) : null;
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <h2 className="text-xl font-semibold mb-4">Add New Business</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        {/* SAME FIELDS AS BEFORE */}

        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <button
          type="button"
          onClick={handleGeocode}
          className="px-4 py-2 bg-secondary-600 text-white rounded hover:bg-secondary-700"
        >
          Get Coordinates from Address
        </button>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Latitude</label>
            <input
              type="text"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Longitude</label>
            <input
              type="text"
              name="lon"
              value={formData.lon}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Pick Location on Map</label>
          <MapContainer
            center={[20.5937, 78.9629]} // India center
            zoom={4}
            style={{ height: '300px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
          <p className="text-sm text-gray-500 mt-2">Click on the map to set coordinates</p>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Save Business
        </button>
      </form>
    </div>
  );
};

export default Admin;
