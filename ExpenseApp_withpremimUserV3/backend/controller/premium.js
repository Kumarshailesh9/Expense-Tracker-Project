const Expense = require("../moduls/expense");
const User = require("../moduls/user");


exports.getPremium = async (req, res) => {
    try {
        const users = await User.findAll();
        const expenses = await Expense.findAll();
        const userExpenses = {}
        expenses.forEach((expense) => {
            if(userExpenses[expense.userId]){
                userExpenses[expense.userId] += expense.price;
            } else {
                userExpenses[expense.userId] = expense.price;
            }
        })

        const userLeaderBoardDetails = []
        users.forEach((user) => {
            userLeaderBoardDetails.push({ name : user.name, total_cost: userExpenses[user.id] ?? 0});
        })
        console.log(userLeaderBoardDetails);
        userLeaderBoardDetails.sort((a,b) => b.total_cost - a.total_cost);
        res.status(200).json(userLeaderBoardDetails);
    }
    catch (err){
        console.log(err);
    }
}