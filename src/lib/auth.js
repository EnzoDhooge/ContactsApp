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


module.exports = {
    isLoggedIn,
    isNotLoggedIn
};