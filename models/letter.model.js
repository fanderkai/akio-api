const mongoose = require('mongoose');

const letterSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    }
});

const Letter = mongoose.model('Letter', letterSchema);
module.exports = Letter;