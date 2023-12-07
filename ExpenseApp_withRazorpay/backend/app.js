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


