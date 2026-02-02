const User =  require("../models/users.js");


// API: Get signup form (not needed for React, but kept for API completeness)
module.exports.renderSignupForm = (req, res) => {
    res.json({ message: "Signup form endpoint. Use POST /signup to register." });
}

// SignUp
module.exports.signUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            // Success: return user info as JSON
            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: registerUser._id,
                    username: registerUser.username,
                    email: registerUser.email
                }
            });
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

// LogIn

// API: Get login form (not needed for React, but kept for API completeness)
module.exports.renderLoginForm = (req, res) => {
    res.json({ message: "Login form endpoint. Use POST /login to authenticate." });
}

module.exports.logIn = async (req, res) => {
    // On successful login, return user info as JSON
    res.json({
        message: "You are logged in",
        user: req.user ? {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email
        } : null
    });
}

// Logout
module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.json({ message: "Logged out successfully" });
    });
}