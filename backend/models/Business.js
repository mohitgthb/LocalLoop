const mongoose = require("mongoose");

// const businessSchema = new mongoose.Schema({
//     name: String,
//     description: String,
//     location: {
//         type: {
//             type: String,
//             enum: ['Point'], // 'location.type' must be 'Point'
//             required: true
//         },
//         coordinates: {
//             type: [Number], // [longitude, latitude]
//             required: true
//         }
//     },
//     category: String,
//     images: [String],
//     isFeatured: {type: Boolean, default: false},
//     contact: String,
//     rating: {type: Number, default: 0},
//     createdAt: {type: Date, default: Date.now}
// });

const discountSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  code: String,
  validUntil: Date
}, { _id: false });

const hoursSchema = new mongoose.Schema({
  Monday: String,
  Tuesday: String,
  Wednesday: String,
  Thursday: String,
  Friday: String,
  Saturday: String,
  Sunday: String
}, { _id: false });

const locationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  coordinates: {
    type: [Number], // [latitude, longitude]
    required: true
  }
}, { _id: false });

const contactSchema = new mongoose.Schema({
  phone: String,
  email: String,
  website: String
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  images: [String],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  priceRange: String,
  location: locationSchema,
  contact: contactSchema,
  hours: hoursSchema,
  featured: { type: Boolean, default: false },
  badges: [String],
  discounts: [discountSchema],
  reviews: [reviewSchema],
}, { timestamps: true });

module.exports = mongoose.model("Business", businessSchema);