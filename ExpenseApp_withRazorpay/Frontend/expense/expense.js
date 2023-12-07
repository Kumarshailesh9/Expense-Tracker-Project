function expense(e){
    e.preventDefault();
    const price = e.target.price.value;
    const des = e.target.des.value;
    const category = e.target.category.value;

    const expenseDetails = {
        price,
        des,
        category,
        ispremiumuser : false
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


document.getElementById('rzp-button1').onclick = async function (e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:3000/parchase/buyprmium', { headers: { Autherization: token}})
    console.log(res);
    const options = {
        "key" : res.data.key_id,
        "order_id" : res.data.order.id,
        "handler" : async function (res) {
            if(res.razorpay_payment_id){
                await axios.post('http://localhost:3000/parchase/updateprmium', {
                order_id : options.order_id,
                payment_id : res.razorpay_payment_id
                }, { headers: { Autherization: token}})
                alert('You are a primium user');
            } else {
                await axios.post('http://localhost:3000/parchase/updateorderstatus', {
                            order_id: options.order_id,
                            status: 'FAILED'
                        }, { headers: { Authorization: token }});
                        
                        alert('Transaction failed');
            }
           
        }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();

    
    rzp1.on('payment_failed', function (res) {
        console.log(res);
        alert('something went wrong');
    })
};


// document.getElementById('rzp-button1').onclick = async function (e) {
//     e.preventDefault();
    
//     try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:3000/parchase/buyprmium', { headers: { Autherization: token }})
//         console.log(res);

//         const options = {
//             key: res.data.key_id,
//             order_id: res.data.order.id,
//             handler: async function (res) {
//                 try {
//                     await axios.post('http://localhost:3000/parchase/updateprmium', {
//                         order_id: options.order_id,
//                         payment_id: res.razorpay_payment_id
//                     }, { headers: { Autherization: token }})
                    
//                     alert('You are a premium user');
//                 } catch (error) {
//                     console.error(error);
//                     alert('Something went wrong while updating premium status');
//                 }
//             }
//         };

//         const rzp1 = new Razorpay(options);
//         rzp1.open();
//     } catch (error) {
//         console.error(error);
//         alert('Something went wrong while processing the payment');
//     }
// };
