const Book = require('../models/book.model');

// Take GET bookings request and response with bookings list
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Take GET booking id request and response with booking details
const getBook = async (req, res) => {
    try {
        const {id} = req.params;
        const books = await Book.findById(id);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Take POST book object request and response with "booking created" message
const createBook = async (req, res) => {
    try {
        const letter = req.file ? req.file.filename : null;
        const data = {...req.body, letter};
        const book = await Book.create(data);
        res.status(200).json({ message: 'Booking created.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Take UPDATE book object request and response with "booking updated" message, and "booking not found" message if it does not exist
const updateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const letter = req.file ? req.file.filename : null;
        const data = {...req.body, letter};
        const book = await Book.findByIdAndUpdate(id, data, { new: true });
        if(!book) {
            return res.status(404).json({message: "Booking not found"});
        }
        const updatedBook = await Book.findById(id);
        res.status(200).json({ message: 'Booking updated.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Take DELETE book object request and response with "booking deleted" message, and "booking not found" message if it does not exist
const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id, req.body);
        if(!book) {
            return res.status(404).json({message: "Booking not found"});
        }
        res.status(200).json({ message: 'Booking deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Export booking controllers
module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}