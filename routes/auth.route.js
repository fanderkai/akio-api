const express = require('express');
const { body, validationResult } = require('express-validator');
const Account = require('../models/account.model.js');
const router = express.Router();
const {logIn, signUp, getAccounts, getAccount, updateAccount, deleteAccount} = require('../controllers/auth.controller.js');

router.get('/', getAccounts);
router.get('/:id', getAccount);
router.put("/:id", [
    body('username').trim().escape(),
    body('password').trim().escape(),
], updateAccount);
router.delete("/:id", deleteAccount);

router.post('/login', [
    body('username').trim().escape(),
    body('password').trim().escape(),
], logIn);

router.post('/signup', [
    body('username').trim().escape(),
    body('password').trim().escape(),
], signUp);

module.exports = router;