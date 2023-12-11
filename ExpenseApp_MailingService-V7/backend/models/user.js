const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull:  false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ispremiumuser: Sequelize.BOOLEAN,
    totalExpense: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

module.exports = User;