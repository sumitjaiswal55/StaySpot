const User = require("../models/users.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// SignUp Logic
module.exports.signUp = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email already registered" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        });
    } catch (e) {
    console.error("Signup Error Details:", e); // Ye terminal par asli wajah batayega
    res.status(500).json({ error: e.message });
}
};

// LogIn Logic
module.exports.logIn = async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({
            message: "Welcome back!",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// LogOut Logic
module.exports.logOut = (req, res) => {
    res.json({ message: "Logged out successfully" });
};