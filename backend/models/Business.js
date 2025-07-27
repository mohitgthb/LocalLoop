const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    category: String,
    images: [String],
    isFeatured: {type: Boolean, default: false},
    contact: String,
    rating: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Business", businessSchema);