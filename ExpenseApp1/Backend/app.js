const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./model/signup');
const signupRoute = require('./route/signup');
const loginroute = require('./route/login');
const Expense = require('./model/expense');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(signupRoute);

app.use(loginroute);

app.get('/user/login/expense', async (req, res) => {
    const expense = await Expense.findAll();
    res.json(expense);
})

app.post('/user/login/expense', async (req, res) => {
    const { price, description, option } = req.body;

    const expense = await Expense.create({
        price,
        description,
        option
    });

    res.json(expense);
});

app.delete('/user/login/expense/:id', async (req, res) => {
    const id = req.params.id;

    const expense = await Expense.destroy({ where: {id: id}});

    res.json(expense);
})

User
    //.sync({force: true})
    .sync()
    .then(res => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
