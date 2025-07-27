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