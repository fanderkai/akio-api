const express = require('express');
const letterController = require('../controllers/letter.controller.js');
const letterRouter = express.Router();
const multer = require('multer');
const fs = require('fs');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path ='./uploads'
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: (req, file, cb) => {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
    }
});


const upload = multer({ 
    storage: storage,
    limits : {fileSize : 2000000},
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'pdf') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF/jpeg files are allowed.'), false);
        }
    }
});

letterRouter.route('/download').get((req, res) => {
    fs.readdir('./uploads', (err, files) => {
        if (err) {
            res.status(500).send({ status: 'error', message: 'Failed to read uploads directory' });
        } else {
            res.send({ status: 'success', files: files });
        }
    });
});

letterRouter.route('/download/:filename').get((req, res) => {
    const filename = req.params.filename;
    res.download(`./uploads/${filename}`);
});

letterRouter.route('/upload').post(upload.single('file'), letterController.letterUpload);
module.exports = letterRouter;