const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// 1. Index Route (Saare listings dikhane ke liye)
module.exports.index = async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.json(allListings); 
    } catch (err) {
        res.status(500).json({ error: "Could not fetch listings" });
    }
};

// 2. Create Route (Naya listing banane ke liye)
module.exports.createRoute = async (req, res) => {
    try {
        let response = await geocodingClient
            .forwardGeocode({
                query: req.body.location, // React se data req.body mein aayega
                limit: 1
            })
            .send();

        const newListing = new Listing(req.body);
        newListing.owner = req.user.id; // JWT middleware se user id milegi
        
        if (req.file) {
            newListing.image = { url: req.file.path, filename: req.file.filename };
        }

        newListing.geometry = response.body.features[0].geometry;
        const savedListing = await newListing.save();
        
        res.status(201).json({ message: "Listing created!", listing: savedListing });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// 3. Show Route (Single listing details)
module.exports.showRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author", select: "name email" } // Sirf zaroori fields populate karein
        })
        .populate("owner", "name email");

    if (!listing) {
        return res.status(404).json({ error: "Listing not found!" });
    }
    res.json(listing);
};

// 4. Update Route
module.exports.updateRoute = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body }, { new: true });

    if (req.file) {
        listing.image = { url: req.file.path, filename: req.file.filename };
        await listing.save();
    }
    res.json({ message: "Listing updated!", listing });
};

// 5. Delete Route
module.exports.deleteRoute = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.json({ message: "Listing deleted successfully!" });
};