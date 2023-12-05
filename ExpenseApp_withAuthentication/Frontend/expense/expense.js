function expense(e){
    e.preventDefault();
    const price = e.target.price.value;
    const des = e.target.des.value;
    const category = e.target.category.value;

    const expenseDetails = {
        price,
        des,
        category
    };

    const token = localStorage.getItem('token');
    axios
        .post('http://localhost:3000/expense/add-expense', expenseDetails, {headers : { Autherization : token}})
        .then(res => {
            showOnScr(res.data);
        })
        .catch(err => {
            console.log(err);
        })
};

addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    axios
        .get('http://localhost:3000/expense/add-expense', { headers : { Autherization: token}})
        .then(res => {
            for(let i=0; i<res.data.length; i++){
                showOnScr(res.data[i]);
            }  
        })
        .catch(err => {
            console.log(err);
        })
});


function showOnScr(expense){
    const pn = document.getElementById('items');
    const cn = `<li id="${expense.id}">${expense.price}--${expense.des}--${expense.category}
                <button onclick="deleteExpense('${expense.id}')">Delete</button>
                </li>`;

    pn.innerHTML += cn;
}

function deleteExpense(expenseId){
    const token = localStorage.getItem('token');
    axios
        .delete(`http://localhost:3000/expense/add-expense/${expenseId}`, { headers: { Autherization: token}})
        .then(res => {
            removeExpense(expenseId);
        })
        .catch(err => {
            console.log(err);
        })
};

function removeExpense(expenseId){
    const parentList = document.getElementById('items');
    const expensetoDelete = document.getElementById(expenseId);
    if(expensetoDelete){
        parentList.removeChild(expensetoDelete);
    }
};