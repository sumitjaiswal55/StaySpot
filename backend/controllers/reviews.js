const Reviews = require("../models/reviews.js");
const Listing = require("../models/listing.js");

module.exports.reviewCreate = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Reviews(req.body.review);
    
    newReview.author = req.user._id; // Iske liye ek 'auth' middleware banana hoga jo token verify kare
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.status(201).json({ message: "Review added", review: newReview });
}

module.exports.reviewDelete = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Reviews.findByIdAndDelete(reviewId);
    
    res.json({ message: "Review deleted successfully" });
}