const express = require('express');
const signupController = require('../Controller/signup');


const signupRoute = express.Router();

signupRoute.get('/user/signup', signupController.getSignup);

signupRoute.post('/user/signup', signupController.postSignup);

module.exports = signupRoute;