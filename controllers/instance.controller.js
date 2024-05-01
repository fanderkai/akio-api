const Instance = require('../models/instance.model');

const getInstances = async (req, res) => {
    try {
        const instances = await Instance.find({});
        res.status(200).json(instances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getInstance = async (req, res) => {
    try {
        const {id} = req.params;
        const instance = await instance.findById(id);
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createInstance = async (req, res) => {
    try {
        const instance = await Instance.create(req.body);
        res.status(200).json({ message: "Instance created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateInstance = async (req, res) => {
    try {
        const {id} = req.params;
        const instance = await Instance.findByIdAndUpdate(id, req.body);
        if(!instance) {
            return res.status(404).json({message: "Instance not found"});
        }
        const updatedRoom = await Room.findById(id);
        res.status(200).json({ message: "Room updated." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteInstance = async (req, res) => {
    try {
        const {id} = req.params;
        const instance = await Instance.findByIdAndDelete(id, req.body);
        if(!instance) {
            return res.status(404).json({message: "Instance not found"});
        }
        res.status(200).json({ message: "Room deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getInstances,
    getInstance,
    createInstance,
    updateInstance,
    deleteInstance
}