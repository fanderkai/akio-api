const bcrypt = require('bcrypt');
const Account = require('../models/account.model');

// Take GET accounts request and response with instances list
const getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({});
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAccount = async (req, res) => {
    try {
        const {id} = req.params;
        const account = await Account.findById(id);
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAccount = async (req, res) => {
    try {
        const {id} = req.params;
        const account = await Account.findByIdAndUpdate(id, req.body);
        if(!account) {
            return res.status(404).json({message: "Account not found"});
        }
        const updatedAccount = await Account.findById(id);
        res.status(200).json({ updatedAccount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAccount = async (req, res) => {
    try {
        const {id} = req.params;
        const account = await Account.findByIdAndDelete(id, req.body);
        if(!account) {
            return res.status(404).json({message: "Account not found"});
        }
        res.status(200).json({ message: "Account deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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

        res.status(200).json({message: 'Log In Successful. Welcome to Admin Panel'})

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//  Take username and password as sign up request
const signUp = async (req, res) => {

    // Pass username and hashed password as account object
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const account = new Account({
            'username': username,
            'password': hashedPassword
        })
        await account.save();

        // Send a success response
        res.status(201).json({ message: "Account created successfully" });
    
    // Send error message if there's an unexpected error
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Export account controllers
module.exports = {
    getAccounts,
    getAccount,
    updateAccount,
    deleteAccount,
    logIn,
    signUp
}