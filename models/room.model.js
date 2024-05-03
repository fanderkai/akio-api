const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required:true
        },
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

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;