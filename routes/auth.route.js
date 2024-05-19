const express = require('express');
const { body, validationResult } = require('express-validator');
const Account = require('../models/account.model.js');
const router = express.Router();
const {logIn, signUp} = require('../controllers/auth.controller.js');

router.post('/login', [
    body('username').trim().escape(),
    body('password').trim().escape(),
], logIn);
router.post('/signup', [
    body('username').trim().escape(),
    body('password').trim().escape(),
], signUp);
router.get('/admin-panel', (req, res) => {
    res.render('Admin Panel View File');
});

module.exports = router;