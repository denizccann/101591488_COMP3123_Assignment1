const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', [
    body('username').notEmpty().withMessage('Username is required.'),
    body('email').isEmail().withMessage('A valid email is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], userController.signup);

router.post('/login', [
    body('password').notEmpty().withMessage('Password is required.')
], userController.login);

module.exports = router;