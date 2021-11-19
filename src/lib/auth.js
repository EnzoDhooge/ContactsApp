const connection = require('../database');


// Verificar si esta autenticado
const isLoggedIn = ( req, res, next ) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/signin');
    }
};


// Verificar si no esta autenticado
const isNotLoggedIn = ( req, res, next ) => {
    if(!req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/');
    }
};


// Verificar si ya existe un username 
const checkDuplicateUser = async( req, res, next ) => {
    const { username } = req.body;

    const user = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    if (user.length > 0) {
        req.flash('message', 'This username already exists');
        return res.redirect('/signup');
    } else {
        return next();
    }

};


// Verificar contraseña (entre 8 y 16 caracteres, al 
// menos un digito, una minuscula y una mayuscula)
const checkParamsPassword = (req, res, next) => {
    
    const { password } = req.body;
    let regexpass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    const pass = regexpass.test(password);

    if(pass) {
        return next();
    } else {
        req.flash('message', 'The password must be alphanumeric, without spaces. Contain between 8 and 16 characters, at least one uppercase, lowercase, and a number.');
        return res.redirect('/signup');
    }
};


// Verificar que las contraseñas coincidan
const confirmPassword = (req, res, next) => {

    const {password, confirmPassword} = req.body;
    if(confirmPassword === password) {
        return next();
    } else {
        req.flash('message', 'Passwords do not match');
        return res.redirect('/signup');
    }
};


module.exports = {
    isLoggedIn,
    isNotLoggedIn,
    checkDuplicateUser,
    checkParamsPassword,
    confirmPassword
};