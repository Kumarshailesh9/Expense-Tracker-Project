const express = require('express');
const premiumController = require('../controller/premium');
const userAuthenticate = require('../middelware/auth');

const premiumRoute = express.Router();

premiumRoute.get('/premium/showleaderbord',userAuthenticate.authenticate, premiumController.getPremium);


module.exports = premiumRoute;