const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('Welcome to my app');
});

app.get('/about', function(req, res){
    res.send('About page');
});

app.get('/blog', function(req, res){
    res.send('Welcome to my blog');
});

app.listen(8081, function(){
    console.log('Server running in: http://localhost:8081/')
});