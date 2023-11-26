const User = require('../model/signup');

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

    const user = await User.create({
        name,
        email,
        password
    });

    res.json(user);
};