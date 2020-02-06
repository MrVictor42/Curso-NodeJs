const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize');

/*
    Config template engine
*/
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
const sequelize = new Sequelize('sistemaDeCadastro', 'root', 'bgatahkei42', {
    host: 'localhost',
    dialect: 'mysql'
});

app.get('/register', function(req, res){
    res.render('form');
});

app.post('/add', function(req, res){
    res.send('Receive form');
})

app.listen(8081, function(){
    console.log('Server running in: http://localhost:8081/')
});