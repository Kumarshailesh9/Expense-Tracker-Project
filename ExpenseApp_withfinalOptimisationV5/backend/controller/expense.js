const Expense = require("../models/expense");
const User = require("../models/user");

exports.getExpense = async (req, res) => {
    const expense = await Expense.findAll({where : {userId: req.user.id}});

    res.json(expense);
};

exports.postExpense = async (req, res) => {
    try {
        const { price, des, category } = req.body;

        const expense = await req.user.createExpense({
            price,
            des,
            category,
        });

        const totalExpense = Number(req.user.totalExpense) + Number(price);
        await User.update({ totalExpense }, { where: { id: req.user.id } });

        res.status(200).json({ success: true, expense });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


exports.deleteExpense = async (req, res) => {
    const id = req.params.id;

    await Expense.destroy({ where: { id : id , userId:  req.user.id  }});

    res.json({messase: 'Expense deleted Successfully!'});

}