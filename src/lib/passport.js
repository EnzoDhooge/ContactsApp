const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('../database');
const helpers = require('../lib/helpers');


// SignIn Controller
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {

    const rows = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    
    if (rows.length > 0) {

        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        console.log(validPassword);
        if (validPassword) {
            done(null, user, req.flash('success', `Welcome ${user.fullname}`));
        } else {
            done(null, false, req.flash('message','Incorrect password'));
        }

    } else {
        return done(null, false, req.flash('message', 'The Username does not exists'));
    }
    
}));


// SignUp Controller
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {

    // Create user model
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };

    console.log(newUser);
    // Encrypt password
    newUser.password = await helpers.encryptPassword(password);
    
    // Save to DB
    const result = await connection.query('INSERT INTO users SET ?', [newUser]);
    console.log(result);
    newUser.id = result.insertId;
    return done(null, newUser, req.flash('success', `Welcome to Contacts`));

}));


// User serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});


// User deserialization
passport.deserializeUser( async(id, done) => {
    const rows = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});