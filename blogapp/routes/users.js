const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users');
const bcrypt = require('bcryptjs');

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

    if(req.body.password !== req.body.password2) {
        errors.push({text: 'Passwords is differents! Please put same passoword in both fields!'});
    }

    if(errors.length > 0) {
        res.render('users/register', {errors: errors});
    } else {
        User.findOne({email: req.body.email}).then((user) => {
            if(user) {
                req.flash('warning_msg','Already exist one account with this email in our system!');
                res.redirect('/users/register');
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password 
                });

                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if(error) {
                            req.flash('error_msg', 'Had a error during the save of user');
                            res.redirect('/');
                        }
                        newUser.password = hash
                        newUser.save().then(() => {
                            req.flash('success_msg', 'User save with success!');
                            res.redirect('/');
                        }).catch((error) => {
                            req.flash('error_msg', 'Had a error in create account, try again!');
                            res.redirect('/users/register');
                        });
                    });
                });
            }
        }).catch((error) => {
            req.flash('error_msg', 'Had a intern error: ' + error);
            res.redirect('/');
        });
    }
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

module.exports = router;