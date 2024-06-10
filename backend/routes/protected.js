const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/dashboard', auth, (req, res) => {
    res.json({ message: 'Welcome to the dashboard!' });
});

module.exports = router;