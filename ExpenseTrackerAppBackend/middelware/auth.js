const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const authenticate = (req, res, next) => {
    const token = req.header('Autherization'); 
    //console.log(token);
    try{
        const user = jwt.verify(token, `${process.env.LOGIN_SECRET_KEY}` );
        //console.log(user.userId);
        User.findByPk(user.userId).then(user => {
            req.user = user;
            next();
        }).catch(err => {
            throw new Error(err);
            
        })
    }
    catch (err){
        return res.status(401).json({success: false});
    }
    
}

module.exports = { authenticate };