const express = require('express');
const app = express();
const handlebars = require('handlebars');
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

app.listen(8081, function(){
    console.log('Server running in: http://localhost:8081/')
});