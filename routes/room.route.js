const express = require('express');
const Room = require("../models/room.model.js");
const router = express.Router();
const {getRooms, getRoom, createRoom, updateRoom, deleteRoom} = require('../controllers/room.controller.js');

router.get('/', getRooms);
router.get('/:id', getRoom);
router.post("/", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

module.exports = router;