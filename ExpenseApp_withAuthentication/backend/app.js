const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const userRoute = require('./routes/user');
const cors = require('cors');
const expenseRoute = require('./routes/expense');
const Expense = require('./moduls/expense');
const User = require('./moduls/user');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(userRoute);

app.use(expenseRoute);


Expense.belongsTo(User);
User.hasMany(Expense);

sequelize
    //.sync({force: true})
    .sync()
    .then(res => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })