const Sequelize = require('sequelize');

const sequelize = new Sequelize('sys', 'root', 'Realme123', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;