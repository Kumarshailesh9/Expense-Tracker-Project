function expense(e){
    e.preventDefault();
    const price = e.target.price.value;
    const description = e.target.des.value;
    const option = e.target.product.value;

    const expenseData = {
        price,
        description,
        option
    };

    axios
        .post('http://localhost:3000/user/login/expense', expenseData)
        .then(res => {
            console.log(res.data);
            showExpense(res.data);
        })
        .catch(err => {
            console.log(err);
        })
};

addEventListener('DOMContentLoaded', () => {
    axios
        .get('http://localhost:3000/user/login/expense')
        .then(res => {
            console.log(res.data);
            for(let i=0; i<res.data.length; i++){
                showExpense(res.data[i]);
            }
        })
        .catch(err => {
            console.log(err);
        })
});

function showExpense(expense){
    const pNode = document.getElementById('items');
    const childNode = `<li id="${expense.id}">${expense.price} - ${expense.description} - ${expense.option}
                        <button onclick="deleteExpense('${expense.id}')" >Delete Expense</button>
                        </li>`

    pNode.innerHTML += childNode;
};

function deleteExpense(expenseId) {
    axios
        .delete(`http://localhost:3000/user/login/expense/${expenseId}`)
        .then(() => {
            removeFromScreen(expenseId);
        })
        .catch(err => {
            console.log(err);
        });
}

function removeFromScreen(expenseId) {
    const expenseElement = document.getElementById(expenseId);
    if (expenseElement) {
        expenseElement.remove();
    }
}