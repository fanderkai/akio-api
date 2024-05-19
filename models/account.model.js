const mongoose = require('mongoose');

// Create model for account objects
const AccountSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

// Export room models
const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;