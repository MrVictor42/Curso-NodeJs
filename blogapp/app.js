const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const adminRouter = require('./routes/admin');

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

app.use('/admin', adminRouter);

const PORT = 8081;
app.listen(PORT, () => {
    console.log('Server Rodando! http://localhost:8081');
});