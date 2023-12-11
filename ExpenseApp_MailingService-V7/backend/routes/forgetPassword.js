const express = require('express');
const { postMail } = require('../controller/password');


const passwordRoute = express.Router();

passwordRoute.post('/password/forgotpassword' , postMail);

module.exports = passwordRoute;