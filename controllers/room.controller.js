const Room = require('../models/room.model');

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const room = await Room.findById(id);
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createRoom = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : null;
        const data = {...req.body, image};
        const room = await Room.create(data);
        res.status(200).json({ message: "Room created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const image = req.file ? req.file.filename : null;
        const data = {...req.body, image};
        const room = await Room.findByIdAndUpdate(id, data, { new: true });
        if(!room) {
            return res.status(404).json({message: "Room not found"});
        }
        const updatedRoom = await Room.findById(id);
        res.status(200).json({ message: "Room updated." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const room = await Room.findByIdAndDelete(id, req.body);
        if(!room) {
            return res.status(404).json({message: "Room not found"});
        }
        res.status(200).json({ message: "Room deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
}