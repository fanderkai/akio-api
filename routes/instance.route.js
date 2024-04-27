const express = require('express');
const Instance = require("../models/instance.model.js");
const router = express.Router();
const {getInstances, getInstance, createInstance, updateInstance, deleteInstance} = require('../controllers/instance.controller.js');

router.get('/', getInstances);
router.get('/:id', getInstance);
router.post("/", createInstance);
router.put("/:id", updateInstance);
router.delete(":/id", deleteInstance);

module.exports = router;