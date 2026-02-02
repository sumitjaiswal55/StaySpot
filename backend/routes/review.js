const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const { isLoggedIn, isReviewAuthor } = require("../middlewares.js");
const ExpressError = require("../utils/ExpressError.js");
const reviewController = require("../controllers/reviews.js");

// Validation Middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        return next(new ExpressError(400, errMsg));
    }
    next();
};

// Post Review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.reviewCreate));

// Delete Review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.reviewDelete));

module.exports = router;