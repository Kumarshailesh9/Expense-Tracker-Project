const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const userRoute = require('./routes/user');
const cors = require('cors');
const expenseRoute = require('./routes/expense');
const Expense = require('./moduls/expense');
const User = require('./moduls/user');
const Razorpay = require('razorpay');
const Order = require('./moduls/order');
const orderRoute = require('./routes/order');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(userRoute);

app.use(expenseRoute);

app.use('/parchase', orderRoute);

app.get('/premium/showleaderbord', async (req, res) => {
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
})



Expense.belongsTo(User);
User.hasMany(Expense);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
    //.sync({force: true})
    .sync()
    .then(res => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })


