const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('../models/Category');
const Category = mongoose.model('categories');

router.get('/', (req, res) => {
    res.render('admin/index');
});

router.get('/posts', (req, res) => {
    res.send('Page posts');
});

router.get('/categories', (req, res) => {
    res.render('admin/categories');
});

router.get('/categories/add', (req, res) => {
    res.render('admin/addCategories');
});

router.post('/categories/new', (req, res) => {

    var errors = [];
    if (!req.body.name || typeof req.body.name === undefined || req.body.name === null) {
        errors.push({ text: 'Invalid Name!' })
    }

    if(!req.body.slug || typeof req.body.slug === undefined || req.body.slug === null) {
        errors.push({ text: 'Invalid Slug!' })
    }

    if(req.body.name.length < 2) {
        errors.push({ text: 'Name of Category is Very Small!' });
    }

    if(errors.length > 0) {
        res.render('admin/addCategories', { errors: errors });
    } else {

        const new_category = {
            name: req.body.name,
            slug: req.body.slug
        };
    
        new Category(new_category).save().then(() => {
            req.flash('success_msg', 'Created Category With Success!');
            res.redirect('/admin/categories');
        }).catch((error) => {
            req.flash('error_msg', 'Error to Add Category! Try Again!');
            res.redirect('/admin');
        });
    }
});

module.exports = router; 