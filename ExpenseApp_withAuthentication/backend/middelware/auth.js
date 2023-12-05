const jwt = require('jsonwebtoken');
const User = require('../moduls/user');

const authenticate = (req, res, next) => {
    const token = req.header('Autherization'); 
    console.log(token);
    const user = jwt.verify(token, 'secretKey' );
    console.log(user.userId);
    User.findByPk(user.userId).then(user => {
        req.user = user;
        next();
    }).catch(err => {
        throw new Error(err);
    })
}

module.exports = { authenticate };