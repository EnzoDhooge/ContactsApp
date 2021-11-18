const { validationResult } = require("express-validator");

const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        req.flash('message', errors.errors[0].msg);
        return res.redirect('/signup');
    }
    next();

};


module.exports = {
    validarCampos
}