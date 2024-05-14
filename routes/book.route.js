const express = require('express');
const Book = require("../models/book.model.js");
const router = express.Router();
const {getBooks, getBook, createBook, updateBook, deleteBook} = require('../controllers/book.controller.js');
const upload = require('../config/multer.config.js');


router.get('/', getBooks);
router.get('/:id', getBook);
router.post("/", upload.single('letter'), createBook);
router.put("/:id", upload.single('letter'), updateBook);
router.delete("/:id", deleteBook);

module.exports = router;