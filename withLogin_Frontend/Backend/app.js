const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./model/signup');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/user/signup', async (req,res) => {
    const user = await User.findAll();
    res.json(user);
});

app.post('/user/signup', async (req, res) => {
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({
        name,
        email,
        password
    });

    res.json(user);
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
