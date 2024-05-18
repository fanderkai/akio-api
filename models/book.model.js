const mongoose = require('mongoose');

function generateUniqueId(name, startDate, startTime, endTime) {
    // Ambil tiga huruf pertama dari nama pengaju (jika nama lebih pendek dari 3 karakter, gunakan nama lengkap)
    const initials = name.substring(0, 3).toUpperCase();

    // Ubah format tanggal menjadi MMDDYY
    const formattedDate = startDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }).replace(/\//g, '');

    // Ambil dua digit pertama dari jam mulai dan jam berakhir
    const startHour = (startTime.getHours() < 10 ? '0' : '') + startTime.getHours();
    const endHour = (endTime.getHours() < 10 ? '0' : '') + endTime.getHours();    

    // Gabungkan semua komponen untuk membentuk ID
    const id = `${initials}-${formattedDate}-${startHour}${endHour}`;
    
    return id;
}

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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Instance',
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
            default: 0
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

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;