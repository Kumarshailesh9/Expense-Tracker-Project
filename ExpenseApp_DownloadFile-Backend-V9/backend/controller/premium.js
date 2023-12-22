

const Download = require("../models/download");
const Expense = require("../models/expense");
const User = require("../models/user");
const { uploadToS3 } = require("../services/s3services");
const sequelize = require("../util/database");



exports.downloadExpenses = async (req, res) => {
    const expenses = await req.user.getExpenses();

    const stringifyExpense = JSON.stringify(expenses);
    const id = req.user.id;

    try {
        const filename = `Expense ${id}/${new Date()}.txt`;
        const fileURL = await uploadToS3(stringifyExpense, filename);
        Download.create({ fileURL , userId: id });
        res.status(200).json({fileURL, success: true});
    }
    catch(err)  {
        console.log(err);
        res.status(500).json({fileURL : '', success: false})
    }
    
}

exports.timesDownload = async (req, res) => {
    try{
        const { date } = req.body;
        const id = req.user.id;
        const numOfdownloaded = await Download.findAll({ where: { createdAt : date, userId: id }})

        return res.status(200).json(numOfdownloaded);
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, message: 'Internal server problem'});
    }
}




exports.getPremiums = async (req, res) => {
    try {
        const users = await User.findAll({
            order: [['totalExpense', 'DESC']]
        });

        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

