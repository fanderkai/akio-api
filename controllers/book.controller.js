const Book = require('../models/book.model');

const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBook = async (req, res) => {
    try {
        const {id} = req.params;
        const books = await Book.findById(id);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const books = await Book.findByIdAndUpdate(id, req.body);
        if(!book) {
            return res.status(404).json({message: "Booking not found"});
        }
        const updatedBook = await getBook.findById(id);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const books = await Book.findByIdAndDelete(id, req.body);
        if(!book) {
            return res.status(404).json({message: "Booking not found"});
        }
        res.status(200).json({ message: "Booking deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}