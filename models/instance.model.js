const mongoose = require('mongoose');

// Create model for instance objects
const InstanceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
);

// Export instance models
const Instance = mongoose.model("Instance", InstanceSchema);
module.exports = Instance;