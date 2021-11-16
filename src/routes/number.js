const express = require('express');
const router = express.Router();
const connection = require('../database');


router.get('/add', (req, res) => {
    res.render('number/add');
});


router.post('/add', async(req, res) => {

    const { title, telefono } = req.body;
    const newContact = {
        title,
        number: telefono
    };

    await connection.query('INSERT INTO numberphone SET ?', [newContact]);

    req.flash('success', 'Contact saved successfully');
    res.redirect('/number');
});


router.get('/', async(req, res) => {

    const contacts = await connection.query('SELECT * FROM numberphone');

    res.render('number/list', {contacts});
});


router.get('/delete/:id', async(req, res) => {

    const { id } = req.params;

    await connection.query('DELETE FROM numberphone WHERE ID = ?', [id]);

    req.flash('success', 'Contact removed successfully');
    res.redirect('/number');
});


router.get('/edit/:id', async(req, res) => {

    const { id } = req.params;
    const contact = await connection.query('SELECT * FROM numberphone WHERE id = ?', [id]);
    res.render('number/edit', {contact: contact[0]});

});


router.post('/edit/:id', async(req, res) => {

    const { id } = req.params;
    const { title, telefono } = req.body;
    const newContact = {
        title,
        number: telefono
    };

    await connection.query('UPDATE numberphone set ? WHERE id = ?', [newContact, id]);
    
    req.flash('success', 'Contact updated successfully');
    res.redirect('/number');

});


module.exports = router;