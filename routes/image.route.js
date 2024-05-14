const express = require('express');
const imageController = require('../controllers/image.controller.js');
const imageRouter = express.Router();
const multer = require('multer');
const fs = require('fs');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path ='./images'
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
        if (file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPG and PNG files are allowed.'), false);
        }
}});

imageRouter.route('/download').get((req, res) => {
    fs.readdir('./images', (err, files) => {
        if (err) {
            res.status(500).send({ status: 'error', message: 'Failed to read images directory' });
        } else {
            res.send({ status: 'success', files: files });
        }
    });
});

imageRouter.route('/download/:filename').get((req, res) => {
    const filename = req.params.filename;
    res.download(`./images/${filename}`);
});

imageRouter.route('/upload/:filename').put((req, res) => {
    const filename = req.params.filename;
    const newFilename = req.body.newFilename;
    fs.rename(`./images/${filename}`, `./images/${newFilename}`, (err) => {
        if (err) {
            res.status(500).send({ status: 'error', message: 'Failed to update image' });
        } else {
            res.send({ status: 'success', message: 'Image updated' });
        }
    });
});


imageRouter.route('/download/:filename').delete((req, res) => {
    const filename = req.params.filename;
    fs.unlink(`./images/${filename}`, (err) => {
        if (err) {
            res.status(500).send({ status: 'error', message: 'Failed to delete image' });
        } else {
            res.send({ status: 'success', message: 'Image deleted' });
        }
    });
});

imageRouter.route('/upload').post(upload.single('image'), imageController.imageUpload);
module.exports = imageRouter;