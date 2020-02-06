const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

/*
    Config template engine
*/
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.render('home');
});

app.get('/register', function(req, res){
    res.render('form');
});

app.post('/add', function(req, res){
    Post.create({
        title: req.body.title,
        content: req.body.content
    }).then(function(){
        res.redirect('/');
    }).catch(function(error){
        res.send('Error: ' + error)
    });
});

app.listen(8081, function(){
    console.log('Server running in: http://localhost:8081/')
});