const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    option: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
Expense.sync();
    
module.exports = Expense;