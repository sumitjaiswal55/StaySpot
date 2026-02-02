if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const ExpressError = require("./utils/ExpressError.js");

// Routes Import
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// MongoDB Connection
async function main() {
    try {
        await mongoose.connect(process.env.ATLAS_DB);
        console.log("MongoDB connected successfully.");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
    }
}
main();

// --- Middlewares ---
app.use(cors()); // React frontend (port 3000) ko allow karne ke liye
app.use(express.json()); // JSON data handle karne ke liye (req.body)
app.use(express.urlencoded({ extended: true })); // Agar koi form-data bhej rahe ho

// --- API Routes ---
app.use("/api/listings", listingsRouter);
app.use("/api/listings/:id/reviews", reviewsRouter);
app.use("/api/users", userRouter);

// Test Route
app.get("/", (req, res) => {
    res.send("Welcome to Wonderlust API!");
});


// Global Error Handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).json({ error: message });
});

const port = 8080; 
app.listen(port, () => {
    console.log(`Backend Server is listening on port ${port}`);
});