const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/profile', [isLoggedIn], (req, res) => {
    res.render('profile');
});

module.exports = router;