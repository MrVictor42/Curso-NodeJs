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
    const new_category = {
        name: req.body.name,
        slug: req.body.slug
    };

    new Category(new_category).save().then(() => {
        console.log('Category save with success!');
    }).catch((error) => {
        console.log('Error to save category!');
    });
});

module.exports = router; 