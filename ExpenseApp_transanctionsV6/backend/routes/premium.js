const express = require('express');
const premiumController = require('../controller/premium');
const userAuthenticate = require('../middelware/auth');

const premiumRoute = express.Router();

premiumRoute.get('/premium/showleaderbord',userAuthenticate.authenticate, premiumController.getPremiums);


module.exports = premiumRoute;