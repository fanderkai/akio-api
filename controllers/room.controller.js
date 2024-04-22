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
        const rooms = await Room.findById({id});
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const rooms = await Room.findByIdAndUpdate(id, req.body);
        if(!room) {
            return res.status(404).json({message: "Room not found"});
        }
        const updatedRoom = await getRoom.findById(id);
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const rooms = await Room.findByIdAndDelete(id, req.body);
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