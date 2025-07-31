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

    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const review = {
      userName: req.user.name || "Anonymous",
      text: req.body.text,
      rating: Number(req.body.rating), // ensure number
      createdAt: new Date()
    };

    if (isNaN(review.rating)) {
      return res.status(400).json({ message: "Invalid rating" });
    }

    business.reviews.push(review);
    business.reviewCount += 1;
    business.rating =
      (business.rating * (business.reviewCount - 1) + review.rating) /
      business.reviewCount;

    await business.save();

    res.status(200).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};


// exports.showReviews = async (req, res) => {
//     try {
//         const business = await Business.findById(req.params.id);
//         if (!business) {
//             return res.status(404).json({ message: "Business not found" });
//         }
//         res.status(200).json(business.reviews);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching reviews", error });
//     }
// }