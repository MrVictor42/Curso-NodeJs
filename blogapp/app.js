const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
require('./models/Posts');
const Post = mongoose.model('posts');
require('./models/Category');
const Category = mongoose.model('categories');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const passport = require('passport');
require('./config/auth')(passport);

app.use(session({ 
    secret: 'class_node',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Middleware
app.use((req, res, next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.warning_msg = req.flash('warning_msg');
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogapp').then(() => {
    console.log('Connected to Mongodb!');
}).catch((error) => {
    console.log('Failed in connect to mongodb: ' + error);
});
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    next();
});

app.get('/', (req, res) => {
    Post.find().populate('category').sort({data: 'DESC'}).then((posts) => {
        res.render('index', {posts: posts});
    }).catch((error) => {
        req.flash('error_msg', 'Had a intern error: ' + error);
        res.redirect('/404');
    });
});

app.get('/post/:slug', (req, res) => {
    Post.findOne({slug: req.params.slug}).then((post) => {
        if(post) {
            res.render('post/index', {post: post});
        } else {
            req.flash('error_msg', 'This post not exists!');
            res.redirect('/');
        }
    }).catch((error) => {
        req.flash('error_msg', 'Had a intern error: ' + error);
        res.redirect('/');
    });
});

app.get('/404', (req, res) => {
    res.send('Error 404');
});

app.get('/categories', (req, res) => {
    Category.find().sort({name: 'ASC'}).then((categories) => {
        res.render('category/index', {categories: categories});
    }).catch((error) => {
        req.flash('error_msg', 'Had a intern error in list categories: ' + error);
        res.redirect('/');
    });
});

app.get('/categories/:slug', (req, res) => {
    Category.findOne({slug: req.params.slug}).then((category) => {
        if(category) {

            Post.find({category: category._id}).then((posts) => {
                res.render('category/posts', {posts: posts, category: category});
            }).catch((error) => {
                req.flash('error_msg', 'Had a error in list posts: ' + error);
                res.redirect('/');
            });

        } else {
            req.flash('error_msg', 'This category not exists!');
            res.redirect('/');
        }
    }).catch((error) => {
        req.flash('error_msg', 'Had a intern error in load page of this category: ' + error);
        res.redirect('/');
    });
});

app.use('/admin', adminRouter);
app.use('/users', usersRouter);

const PORT = 8081;
app.listen(PORT, () => {
    console.log('Server Rodando! http://localhost:8081');
});