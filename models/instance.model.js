const mongoose = require('mongoose');

const InstanceSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }
);

const Instance = mongoose.model("Instance", InstanceSchema);
module.exports = Instance;