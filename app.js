const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('Hey');
});

app.get('/about', function(req, res){
    res.send('About page');
});

app.get('/blog', function(req, res){
    res.send('Welcome to my blog');
});

app.get('/hey/:name/:color', function(req, res){
    res.send('<h1> Hey ' + req.params.name + '</h2>' + 
    '<h2> Your favorite color is: ' + req.params.color + '!</h2>');
});

app.listen(8081, function(){
    console.log('Server running in: http://localhost:8081/')
});