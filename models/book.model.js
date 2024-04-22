const mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        instance: {
            type: String,
            required: true
        },
        activity: {
            type: String,
            required: true,
            default: 0
        },
        conference_type: {
            type: String,
            required: true,
            default: 0
        },
        date: {
            type: Date,
            required: true,
            default: 0
        },
        time: {
            type: TimeRanges,
            required: true,
            default: 0
        },
        letter: {
            type: String,
            required: true,
            default: 0
        }
    }
);

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;