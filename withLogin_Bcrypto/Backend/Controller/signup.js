const User = require('../model/signup');
const bcrypt = require('bcrypt');

exports.getSignup = async (req,res) => {
    const user = await User.findAll();
    res.json(user);
};


exports.postSignup = async (req, res) => {
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashPassword
    });

    res.json(user);
};