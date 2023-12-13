function expense(e){
    e.preventDefault();
    const price = e.target.price.value;
    const des = e.target.des.value;
    const category = e.target.category.value;

    const expenseDetails = {
        price,
        des,
        category,
    };
    const token = localStorage.getItem('token');
    axios
        .post('http://localhost:3000/expense/add-expense', expenseDetails, {headers : { Autherization : token}})
        .then(res => {
            showOnScr(res.data.expense);
        })
        .catch(err => {
            console.log(err);
        })
};

function showIspremiumUser(){
    document.getElementById('rzp-button1').style.visibility = 'hidden';
    document.getElementById('message').innerHTML = 'You are a Premium User';
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const  isAdmin = parseJwt(token);
    if(isAdmin.ispremiumuser){
             showIspremiumUser();  
             showleaderbord();
    }
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

 function  showleaderbord(){
        const inputEle = document.createElement('input')
        inputEle.type = 'button'
        inputEle.value = 'Show Leaderboard'
        inputEle.onclick = async() => {
            const token = localStorage.getItem('token');
            const userLeaderboardArray = await axios.get('http://localhost:3000/premium/showleaderbord', { headers: { Autherization: token}});
            console.log(userLeaderboardArray);
    
            const leaderboardEle = document.getElementById('leaderboard-list');
            leaderboardEle.innerHTML += '<h1>Leader Board</h1>';
            userLeaderboardArray.data.forEach((userDetails) => {
                leaderboardEle.innerHTML += `<li> Name - ${userDetails.name} Total Expense - ${userDetails.totalExpense} </li>`;
            })

        }
        document.getElementById('message').appendChild(inputEle);
        
    
}

document.getElementById('rzp-button1').onclick = async function (e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:3000/parchase/buyprmium', { headers: { Autherization: token}})
    console.log(res);
    const options = {
        "key" : res.data.key_id,
        "order_id" : res.data.order.id,
        "handler" : async function (res) {
            const response = await axios.post('http://localhost:3000/parchase/updateprmium', {
                order_id : options.order_id,
                payment_id : res.razorpay_payment_id
                }, { headers: { Autherization: token}})
                alert('You are a primium user');
                showIspremiumUser();
                showleaderbord();
                localStorage.setItem('token', response.data.token);
            } 
          
           
        }
    const rzp1 = new Razorpay(options);
    rzp1.open();

    
    rzp1.on('payment_failed', function (res) {
        console.log(res);
        alert('something went wrong');
    })
};

