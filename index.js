const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

/*
    Config template engine
*/
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/register', function(req, res){
    res.render('form');
});

app.post('/add', function(req, res){
    res.send('Titulo: ' + req.body.title + ' Descrição: ' + req.body.content);
})

app.listen(8081, function(){
    console.log('Server running in: http://localhost:8081/')
});