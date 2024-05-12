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

const upload = multer({ storage: storage });

letterRouter.route('/upload').post(upload.single('file'), letterController.letterUpload);
module.exports = letterRouter;