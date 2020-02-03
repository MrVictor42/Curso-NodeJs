const Sequelize = require('sequelize');
const sequelize = new Sequelize('sistemaDeCadastro', 'root', 'bgatahkei42', {
    host: 'localhost',
    dialect: 'mysql'
});

const Post = sequelize.define('posts', {
    title: {
        type: Sequelize.STRING 
    },
    content: {
        type: Sequelize.TEXT
    }
});

// Post.create({
//     title: 'One Title',
//     content: 'Another content'
// });

const User = sequelize.define('users', {
    name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
});

User.create({
    name: 'Victor',
    last_name: 'Mota',
    age: 24,
    email: 'victor@gmail.com'
})

// User.sync({ force: true })