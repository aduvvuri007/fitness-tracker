const express = require('express');

// controller functions
const { login, register } = require('../controllers/userController');

const router = express.Router();

//login
router.post('/login', login);

//register
router.post('/register', register);

module.exports = router;