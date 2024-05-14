// config/multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath;
        if (file.fieldname === 'image') {
            uploadPath = './uploads/images/';
        } else if (file.fieldname === 'letter') {
            uploadPath = './uploads/letters/';
        }

        // Ensure the directory exists
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },  // limit file size to 1MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    const imageFiletypes = /jpeg|jpg|png/;
    const letterFiletypes = /pdf|jpeg|jpg/;
    const extname = imageFiletypes.test(path.extname(file.originalname).toLowerCase()) ||
                    letterFiletypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = imageFiletypes.test(file.mimetype) || letterFiletypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Invalid file type!');
    }
}

module.exports = upload;
