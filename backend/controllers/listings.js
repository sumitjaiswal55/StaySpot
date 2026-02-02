const Listing =  require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapToken});


// Listing Route

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.json({ listings: allListings });
}


// New Route
// API: Get new listing form (not needed for React, but kept for API completeness)
module.exports.renderNewFrom = (req, res) => {
  res.json({ message: "New listing form endpoint. Use POST /listings to create." });
}

// Create Route
module.exports.createRoute = async (req, res, next) => {
  try {
    let coordinate = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
      .send();

    let url = req.file?.path;
    let filename = req.file?.filename;

    const newListings = new Listing(req.body.listing);
    newListings.owner = req.user._id;
    if (url && filename) {
      newListings.image = { url, filename };
    }
    // Map
    newListings.geometry = coordinate.body.features[0].geometry;

    let savedListing = await newListings.save();
    res.status(201).json({
      message: "New listing added",
      listing: savedListing
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// Edit Route
module.exports.editRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }
  let originalImageUrl = listing.image?.url?.replace("upload", "/upload/h_250,w_250");
  res.json({ listing, originalImageUrl });
}


// Update Route
module.exports.updateRoute = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }
  if (typeof req.file !== "undefined") {
    let filename = req.file.filename;
    let url = req.file.path;
    listing.image = { url, filename };
    await listing.save();
  }
  res.json({ message: "Listing updated", listing });
}

// Delete Route
module.exports.deleteRoute = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    return res.status(404).json({ error: "Listing not found" });
  }
  res.json({ message: "Listing deleted", listing: deletedListing });
}


// Show Route
module.exports.showRoute = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");
    if (!listing) {
        return res.status(404).json({ error: "Sorry! Your requested listing does not exist..." });
    }
    let response = await geocodingClient.forwardGeocode({
        query: listing.location,
        limit: 1
    }).send();
    listing.geometry = response.body.features[0].geometry;
    res.json({ listing });
}