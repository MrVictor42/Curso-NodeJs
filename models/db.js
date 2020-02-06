const Sequelize = require('sequelize');

const sequelize = new Sequelize('postapp', 'root', 'bgatahkei42', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};