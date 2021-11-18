const express = require('express');
const router = express.Router();
const connection = require('../database');
const { isLoggedIn } = require('../lib/auth');
const helpers = require('../lib/helpers');


router.get('/add', [isLoggedIn], (req, res) => {
    res.render('number/add');
});


router.post('/add', [isLoggedIn], async(req, res) => {

    const { title, telefono } = req.body;
    const newContact = {
        title,
        number: telefono,
        user_id: req.user.id
    };

    await connection.query('INSERT INTO numberphone SET ?', [newContact]);

    req.flash('success', 'Contact saved successfully');
    res.redirect('/number');
});


router.get('/', [isLoggedIn], async(req, res) => {

    const contacts = await connection.query('SELECT * FROM numberphone WHERE user_id = ?', [req.user.id]);
    
    await helpers.encryptJwt(contacts);
    res.render('number/list', {contacts});
});


router.get('/delete/:id', [isLoggedIn], async(req, res) => {

    const { id } = req.params;
    const newId = await helpers.decryptJwt(id);

    if(!newId) {
        return res.render('unauthorized');
    }
    
    await connection.query('DELETE FROM numberphone WHERE ID = ?', [newId]);

    req.flash('success', 'Contact removed successfully');
    res.redirect('/number');
});


router.get('/edit/:id', [isLoggedIn], async(req, res) => {

    const { id } = req.params;
    const newId = await helpers.decryptJwt(id);

    if(!newId) {
        return res.render('unauthorized');
    }

    const contact = await connection.query('SELECT * FROM numberphone WHERE id = ?', [newId]);
    await helpers.encryptJwt(contact);
    res.render('number/edit', {contact: contact[0]});

});


router.post('/edit/:id', [isLoggedIn], async(req, res) => {

    const { id } = req.params;
    const newId = await helpers.decryptJwt(id);

    if(!newId) {
        return res.render('unauthorized');
    }

    const { title, telefono } = req.body;
    const newContact = {
        title,
        number: telefono
    };

    await connection.query('UPDATE numberphone set ? WHERE id = ?', [newContact, newId]);
    
    req.flash('success', 'Contact updated successfully');
    res.redirect('/number');

});


module.exports = router;