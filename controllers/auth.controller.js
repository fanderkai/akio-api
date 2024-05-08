const bcrypt = require('bcrypt');
const Account = require('../models/account.model');

const logIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const account = await Account.findOne({ username });

        if (!account) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, account.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        res.render("Admin Page");
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const signUp = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const account = {
            username: req.body.username,
            password: hashedPassword
        }
        await Account.insertMany([account])
        res.render("Admin Page");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    next();
};

module.exports = {
    logIn,
    signUp,
    isAdmin
}