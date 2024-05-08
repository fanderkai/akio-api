const express = require('express');
const { body, validationResult } = require('express-validator');
const Account = require('../models/account.model.js');
const router = express.Router();
const {logIn, signUp, isAdmin} = require('../controllers/auth.controller.js');

router.get('/login', logIn);
router.post('/signup', [
    body('username').trim().escape(),
    body('password').trim().escape(),
], signUp);
router.get('/admin-panel', isAdmin, (req, res) => {
    res.render('Admin Panel');
});

module.exports = router;