const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./model/signup');
const signupRoute = require('./route/signup');
const loginroute = require('./route/login');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(signupRoute);

app.use(loginroute);

User
    //.sync({force: true})
    .sync()
    .then(res => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
