const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner } = require("../middlewares.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

// API Routes for Listings
router
    .route("/")
    .get(wrapAsync(listingController.index)) 
    .post(
        isLoggedIn, 
        upload.single('image'), // Frontend se 'image' field aayegi
        wrapAsync(listingController.createRoute)
    );

router
    .route("/:id")
    .get(wrapAsync(listingController.showRoute)) 
    .put(
        isLoggedIn, 
        isOwner, 
        upload.single('image'), 
        wrapAsync(listingController.updateRoute)
    )
    .delete(
        isLoggedIn, 
        isOwner, 
        wrapAsync(listingController.deleteRoute)
    );

module.exports = router;