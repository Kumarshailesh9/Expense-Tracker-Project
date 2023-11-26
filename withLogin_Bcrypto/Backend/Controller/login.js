const User = require('../model/signup');
const bcrypt = require('bcrypt');

exports.postLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({where: { email }});

        if(!user){
           return res.status(404).json({ message: 'User not found!'});
        } 
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch) {
            return res.status(200).json({ message: 'User login sucessful'});
        } else {
            return res.status(401).json({ message: 'User not authorized!'});
        }
    } catch (err) {
        res.status(500).json({ message: 'internal Server error!'});
    }
};