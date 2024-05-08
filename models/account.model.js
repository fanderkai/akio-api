const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    }
);

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;