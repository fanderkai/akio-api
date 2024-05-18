const Room = require('../models/room.model');

// Take GET rooms request and response with rooms list
const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({});
        rooms.forEach(room=> {
            if (room.image){
                room.imageUrl = `${req.protocol}://${req.get('host')}/uploads/images/${room.image}`;
            }
            
        });
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Take GET room id request and response with room details
const getRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const room = await Room.findById(id);
        rooms.forEach(room=> {
            if (room && room.image){
                room.imageUrl = `${req.protocol}://${req.get('host')}/uploads/images/${room.image}`;
            }
            
        });
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Take POST room object request and response with "room created" message
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

// Take UPDATE room object request and response with "room updated" message, and "room not found" message if it does not exist
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

// Take DELETE room object request and response with "room deleted" message, and "room not found" message if it does not exist
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

// Export room controllers
module.exports = {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
}