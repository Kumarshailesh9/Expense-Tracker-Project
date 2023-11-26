const express = require('express');
const loginController = require('../Controller/login');

const loginroute = express.Router();

loginroute.post('/user/login' , loginController.postLogin);


module.exports = loginroute;