const Sequelize = require('sequelize');

const sequelize = new Sequelize('kumar', 'root', 'Realme123', {
    dialect:  'mysql',
    host:  'localhost'
});

module.exports = sequelize;