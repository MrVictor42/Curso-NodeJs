const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

const adminRouter = require('./routes/admin');

app.use(session({ 
    secret: 'class_node',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
//Middleware
app.use((req, res, next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
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
    console.log('Hey, im a middleware');
    next();
});

app.use('/admin', adminRouter);

const PORT = 8081;
app.listen(PORT, () => {
    console.log('Server Rodando! http://localhost:8081');
});