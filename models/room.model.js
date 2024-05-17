const mongoose = require('mongoose');

// Create model for room objects
const RoomSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        table: {
            type: Number,
            required: true,
            default: 0
        },
        air_conditioner: {
            type: Number,
            required: true,
            default: 0
        },
        chair: {
            type: Number,
            required: true,
            default: 0
        },
        screen: {
            type: Number,
            required: true,
            default: 0
        },
        projector: {
            type: Number,
            required: true,
            default: 0
        },
        audio: {
            type: Number,
            required: true,
            default: 0
        }
    }
);

// Export room models
const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;