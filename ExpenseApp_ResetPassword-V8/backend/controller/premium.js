

const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");

exports.getPremiums = async (req, res) => {
    try {
        const users = await User.findAll({
            order: [['totalExpense', 'DESC']]
        });

        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
