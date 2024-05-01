const mongoose = require('mongoose');

const InstanceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
);

const Instance = mongoose.model("Instance", InstanceSchema);
module.exports = Instance;