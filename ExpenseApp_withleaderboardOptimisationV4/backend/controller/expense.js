const Expense = require("../moduls/expense");

exports.getExpense = async (req, res) => {
    const expense = await Expense.findAll({where : {userId: req.user.id}});

    res.json(expense);
};

exports.postExpense = async (req, res) => {
    const { price, des, category } = req.body;
   const expense = await
   req.user.createExpense({
        price,
        des,
        category,
    });

    res.json(expense);
};

exports.deleteExpense = async (req, res) => {
    const id = req.params.id;

    await Expense.destroy({ where: { id : id , userId:  req.user.id  }});

    res.json({messase: 'Expense deleted Successfully!'});

}