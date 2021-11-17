const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/signup', (req, res) => {
    res.render('auth/signup');
});


router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));


router.get('/signin', (req, res) => {
    res.render('auth/signin');
});


router.post('/signin', (req, res, next) => {

    passport.authenticate('local.signin', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});


router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});


module.exports = router;