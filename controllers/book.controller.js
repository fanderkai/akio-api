const Book = require('../models/book.model');

const getBooks = async (req, res) => {
    try {
        const book = await Book.find({});
        book.forEach(book =>{
            if(book.letter){
                book.letterUrl = `${req.protocol}://${req.get('host')}/uploads/letters/${book.letter}`;
            }
        });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        book.forEach(book =>{
            if(book && book.letter){
                book.letterUrl = `${req.protocol}://${req.get('host')}/uploads/letters/${book.letter}`;
            }
        });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBook = async (req, res) => {
    try {
        const letter = req.file ? req.file.filename : null;
        const data = {...req.body, letter};
        const book = await Book.create(data);
        res.status(200).json({ message: 'Book created.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
        res.status(200).json({ message: 'Book updated.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id, req.body);
        if(!book) {
            return res.status(404).json({message: "Booking not found"});
        }
        res.status(200).json({ message: 'Book deleted.' });
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