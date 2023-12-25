const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const userRoute = require('./routes/user');
const cors = require('cors');
const expenseRoute = require('./routes/expense');
const Expense = require('./models/expense');
const User = require('./models/user');
const Order = require('./models/order');
const orderRoute = require('./routes/order');
const premiumRoute = require('./routes/premium');
const passwordRoute = require('./routes/resetPassword');
const ForgotPassword = require('./models/resetPassword');
const Download = require('./models/download');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use(cors());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(helmet());
app.use(morgan('combined', { stream : accessLogStream}));

app.use(userRoute);

app.use(expenseRoute);

app.use('/parchase', orderRoute);

// Show leaderboard and download file is in premiumRoute
app.use(premiumRoute);

app.use(passwordRoute);


Expense.belongsTo(User);
User.hasMany(Expense);

User.hasMany(Order);
Order.belongsTo(User);


User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);


User.hasMany(Download);
Download.belongsTo(User);



sequelize
    //.sync({force: true})
    .sync()
    .then(res => {
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.log(err);
    })
