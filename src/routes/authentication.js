const express = require('express');
const router = express.Router();
const passport = require('passport');
const { check } = require('express-validator');
const { validarCampos } = require('../lib/validar-campos');
const { isLoggedIn, isNotLoggedIn, checkDuplicateUser, checkParamsPassword, confirmPassword } = require('../lib/auth');


router.get('/signup', [isNotLoggedIn], (req, res) => {
    res.render('auth/signup');
});


router.post('/signup', [
    isNotLoggedIn,
    checkDuplicateUser,
    checkParamsPassword,
    confirmPassword,
    check('password', 'The password must be alphanumeric.').isAlphanumeric(),
    check('username', 'The username must be alphanumeric').isAlphanumeric(),
    check('fullname', 'The fullname must contain only characters of the alphabet').isAlpha('en-US', {ignore: ' '}),
    validarCampos
    ], passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));


router.get('/signin', [isNotLoggedIn], (req, res) => {
    res.render('auth/signin');
});


router.post('/signin', [isNotLoggedIn], (req, res, next) => {

    passport.authenticate('local.signin', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});


router.get('/logout', [isLoggedIn], (req, res) => {
    req.logOut();
    res.redirect('/signin');
});


module.exports = router;