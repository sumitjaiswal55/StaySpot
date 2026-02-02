const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const jwt = require("jsonwebtoken");

// 1. JWT verification middleware (Passport's isAuthenticated ka replacement)
module.exports.isLoggedIn = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Isme user ki ID hogi (e.g., req.user.id)
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

// 2. Owner check middleware (React API compatible)
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    
    // req.user.id humne JWT verify karte waqt set kiya tha
    if (!listing.owner.equals(req.user.id)) {
        return res.status(403).json({ error: "You don't have permission to perform this action" });
    }
    next();
};

// 3. Review Author check middleware
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    
    if (!review.author.equals(req.user.id)) {
        return res.status(403).json({ error: "You are not the author of this review" });
    }
    next();
};

// 4. Listing Joi validation (JSON response)
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        return next(new ExpressError(400, errMsg));
    }
    next();
};

// 5. Review Joi validation (JSON response)
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        return next(new ExpressError(400, errMsg));
    }
    next();
};