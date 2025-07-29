const Business = require("../models/Business");

exports.getBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find();
        res.status(200).json(businesses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching businesses", error });
    }
};

exports.createBusiness = async (req, res) => {
    try {
        const newBusiness = new Business(req.body);
        await newBusiness.save();
        res.status(201).json(newBusiness);
    } catch (error) {
        res.status(500).json({ message: "Error creating business", error });
    }
};

exports.getBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }
        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: "Error fetching business", error });
    }
}

exports.addReview = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }
        const review = req.body;
        business.reviews.push(review);
        business.reviewCount += 1;
        business.rating = (business.rating * (business.reviewCount - 1) + review.rating) / business.reviewCount;
        await business.save();
        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error });
    }
}