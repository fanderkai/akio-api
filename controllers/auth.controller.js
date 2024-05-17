const bcrypt = require('bcrypt');
const Account = require('../models/account.model');

// Take username and password as login request and check the account, send error message if there's an unexpected error
const logIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const account = await Account.findOne({ username });

        // If account doesn't exist, send "invalid username or password" message
        if (!account) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Check if password is valid
        const isPasswordValid = await bcrypt.compare(password, account.password);

        // If password isn't valid, send "invalid username or password" message
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        res.render("Admin Page");

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//  Take username and password as sign up request
const signUp = async (req, res) => {

    // Pass username and hasehed password as account object, then redirect to admin page
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const account = {
            username: req.body.username,
            password: hashedPassword
        }
        await Account.insertMany([account])
        res.render("Admin Page");
    
    // Send error message if there's an unexpected error
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Check if the account's role is admin, if not send "unauthorized access" message
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    next();
};

// Export account controllers
module.exports = {
    logIn,
    signUp,
    isAdmin
}