const Expense = require("../moduls/expense");
const User = require("../moduls/user");
const sequelize = require("../util/database");


exports.getPremiums = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes : [ 'id', 'name', [sequelize.fn('sum', sequelize.col('expenses.price') , total_cost)]],
            include : [
                {
                    model : Expense,
                    attributes : []
                }
            ],
            group : ['user.id'],
            order : ['total_cost', 'DESC']
        });
        
        res.status(200).json(users);
    }
    catch (err){
        console.log(err);
    }
}