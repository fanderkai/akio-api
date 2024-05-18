const mongoose = require('mongoose');

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
    const startHour = (startTime.getHours() < 10 ? '0' : '') + startTime.getHours();
    const endHour = (endTime.getHours() < 10 ? '0' : '') + endTime.getHours();    

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
        start_time: {
            type: String,
            required: true,
            default: 0
        },
        end_time: {
            type: String,
            required: true,
            default: 0
        },
        letter: {
            
            type: String,
            required: true,
            default: 0
        },
        status: {
            type: String,
            required: true,
            default: 0
        }
    }
);

// Export book models
const Book = mongoose.model("Book", BookSchema);
module.exports = Book;