const express = require('express');
const Room = require("../models/room.model.js");
const router = express.Router();
const {getRooms, getRoom, createRoom, updateRoom, deleteRoom} = require('../controllers/room.controller.js');
const upload = require('../config/multer.config.js');

router.get('/', getRooms);
router.get('/:id', getRoom);
router.post("/", upload.single('image'), createRoom);
router.put("/:id", upload.single('image'), updateRoom);
router.delete("/:id", deleteRoom);

module.exports = router;