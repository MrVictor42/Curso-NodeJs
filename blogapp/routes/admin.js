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
    Category.find().sort({ date: 'DESC' }).then((categories) => {
        res.render('admin/categories', { categories: categories });
    }).catch((error) => {
        req.flash('error_msg', 'Had a error to list the categories: ' + error);
        res.redirect('/admin');
    });
});

router.get('/categories/edit/:id', (req, res) => {
    
    Category.findOne({_id:req.params.id}).then((category) => {
        res.render('admin/editCategory', {category: category});
    }).catch((error) => {
        req.flash('error_msg', 'This category not exist!');
        res.redirect('/admin/categories');
    })
});

router.post('/categories/edit', (req, res) => {
    
    Category.findOne({_id: req.body.id}).then((category) => {
        category.name = req.body.name;
        category.slug = req.body.slug;
        category.save().then(() => {
            req.flash('success_msg', 'Category edited with success!');
            res.redirect('/admin/categories');
        }).catch((error) => {
            req.flash('error_msg', 'Had one intern error to save! ' + error);
            res.redirect('/admin/categories');
        });
    }).catch((error) => {
        req.flash('error_msg', 'Had a error in edit category: ' + error);
        res.redirect('/admin/categories');
    });
});

router.post('/categories/delete', (req, res) => {
    Category.remove({_id: req.body.id}).then(() => {
        req.flash('success_msg', 'Category deleted with success!');
        res.redirect('/admin/categories');
    }).catch((error) => {
        req.flash('error_msg', 'Had a error in delete category: ' + error);
        res.redirect('/admin/categories');
    });
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