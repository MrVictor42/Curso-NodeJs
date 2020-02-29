const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', (req, res) => {
    var errors = [];

    if(!req.body.name || typeof req.body.name === undefined || req.body.name === null) {
        errors.push({text: 'Invalid name!'});
    }

    if(!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
        errors.push({text: 'Invalid email!'});
    }

    if(!req.body.password || typeof req.body.password === undefined || req.body.password === null) {
        errors.push({text: 'Invalid password!'});
    }

    if(req.body.password.length < 4) {
        errors.push({text: 'Insert a password bigger than 4 letters!'})
    }

    if(req.body.password !== !req.body.password2) {
        errors.push({text: 'Passwords is differents! Please put same passoword in both fields!'});
    }

    if(errors.length > 0) {
        res.render('users/register', {errors: errors});
    } else {
        
    }
});

module.exports = router;