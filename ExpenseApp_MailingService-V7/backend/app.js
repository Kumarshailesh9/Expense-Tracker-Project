const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const userRoute = require('./routes/user');
const cors = require('cors');
const expenseRoute = require('./routes/expense');
const Expense = require('./models/expense');
const User = require('./models/user');
const Razorpay = require('razorpay');
const Order = require('./models/order');
const orderRoute = require('./routes/order');
const premiumRoute = require('./routes/premium');
const passwordRoute = require('./routes/forgetPassword');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(userRoute);

app.use(expenseRoute);

app.use('/parchase', orderRoute);
app.use(premiumRoute);

app.use(passwordRoute);


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


