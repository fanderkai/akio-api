const mongoose = require('mongoose');
const moment = require('moment')

function generateUniqueId(name, startDate, startTime, endTime) {
    // Take the first three characters of the name and convert them to upper case
    const initials = name.substring(0, 3).toUpperCase();

    // Change date format to DDMMYY and remove the non-numeric characters
    const formattedDate = startDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }).replace(/\//g, '');

    // Take the hour digits of start hour and end hour
    const startHour = moment(startTime, 'HH:mm').format('HH');
    const endHour = moment(endTime, 'HH:mm').format('HH')

    if (!startDate.isValid() || !moment(startTime, 'HH:mm').isValid() || !moment(endTime, 'HH:mm').isValid()) {
        throw new Error('Invalid date or time format');
    }
    // Combine all with dashes
    const id = `${initials}-${formattedDate}-${startHour}${endHour}`;
    
    return id;
}

// Create model for booking objects
const BookSchema = mongoose.Schema(
    {
        id: {
            type: String,
            default: function() {
                return generateUniqueId(this.name, this.date, this.start_time, this.end_time);
            }
        },
        name: {
            type: String,
            required: true
        },
        instance: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Instance',
        },
        activity: {
            type: String,
            required: true
        },
        conference_type: {
            type: String,
            required: true,
            enum: ['Offline', 'Online', 'Hybrid'],
            default: 'Offline'
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        start_time: {
            type: String,
            required: true,
        },
        end_time: {
            type: String,
            required: true,
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            default: 0
        },
        letter: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['Disetujui', 'Dibatalkan/Ditolak', 'Diproses'],
            default: 'Diproses'
        }
    }
);

// Export book models
const Book = mongoose.model("Book", BookSchema);
module.exports = Book;