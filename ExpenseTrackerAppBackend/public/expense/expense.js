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
        .post('http://52.36.97.102:3000/expense/add-expense', expenseDetails, {headers : { Autherization : token}})
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

//////************ Pagination ******************/

// addEventListener('DOMContentLoaded', () => {


//     const page = 1;
//     const pageSize = 7;

//     const token = localStorage.getItem('token');
//     const  isAdmin = parseJwt(token);
//     if(isAdmin.ispremiumuser){
//              showIspremiumUser();  
//              showleaderbord();
//     }
//     axios
//         .get(`http://52.36.97.102:3000/expense/add-expense?page=${page}&?pageSize=${pageSize}`, { headers : { Autherization: token}})
//         .then(res => {
//            // console.log(res.data);
//             for(let i=0; i<res.data.expenses.length; i++){
//                 showOnScr(res.data.expenses[i]);
//             }  
//             showPagination(res.data);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// });


// function showPagination({
//     currentPage,
//     hasNextPage,   
//     nextPage,
//     hasPreviosPage,
//     previosPage,
//     lastPage
// }){

//     pagination.innerHTML = '';

//     if(previosPage){
//         const btn2 = document.createElement('button');
//         btn2.innerHTML = previosPage;
//         btn2.addEventListener('click', () => getProducts(previosPage))
//         pagination.appendChild(btn2);

//     }
//     const btn1 = document.createElement('button');
//     btn1.innerHTML = `<h3>${currentPage}</h3>`;
//     btn1.addEventListener('click', () => getProducts(currentPage))
//     pagination.appendChild(btn1);

//     if(hasNextPage){
//         const btn3 = document.createElement('button');
//         btn3.innerHTML = nextPage;
//         btn3.addEventListener('click', () => getProducts(nextPage))
//         pagination.appendChild(btn3);
//     }

// }

/////*************Dianamic Pagination **********/
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const isAdmin = parseJwt(token);
    const preferredPageSize = +localStorage.getItem('preferredPageSize') || 10;

    if (isAdmin.ispremiumuser) {
        showIspremiumUser();
        showleaderbord();
    }

    const page = 1;

    axios
        .get(`http://52.36.97.102:3000/expense/add-expense?page=${page}&pageSize=${preferredPageSize}`, {
            headers: { Autherization: token }
        })
        .then(res => {
            for (let i = 0; i < res.data.expenses.length; i++) {
                showOnScr(res.data.expenses[i]);
            }
            //showPagination(res.data);
        })
        .catch(err => {
            console.log(err);
        });

    
    const handlePageSizeChange = () => {
        const pageSizeSelect = document.getElementById('pageSizeSelect');
        const newPageSize = parseInt(pageSizeSelect.value);
        localStorage.setItem('preferredPageSize', newPageSize);

        location.reload();
    };

    
    const pageSizeSelect = document.createElement('select');
    pageSizeSelect.id = 'pageSizeSelect';
    pageSizeSelect.addEventListener('change', handlePageSizeChange);

   
    const pageSizeOptions = [5, 10, 20, 30, 40];
    for (const option of pageSizeOptions) {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        pageSizeSelect.appendChild(optionElement);
    }

    
    pageSizeSelect.value = preferredPageSize;

   
    document.body.appendChild(pageSizeSelect);
});




function getProducts(page){
     const token = localStorage.getItem('token');
     const itemsContainer = document.getElementById('items');
    axios
        .get(`http://52.36.97.102:3000/expense/add-expense?page=${page}&?${pageSize}`,{ headers : { Autherization: token}})
        .then(res => {
            itemsContainer.innerHTML = '';
            for(let i=0; i<res.data.expenses.length; i++){
                showOnScr(res.data.expenses[i]);
            } 
            showPagination(res.data);
             
        })
        .catch(err => {
            console.log(err);
        })
}


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
        .delete(`http://52.36.97.102:3000/expense/add-expense/${expenseId}`, { headers: { Autherization: token}})
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

        const downloadFile = document.createElement('input')
        downloadFile.type ='button';
        downloadFile.value ='Download'
        downloadFile.onclick = download;

        inputEle.onclick = async() => {
            const token = localStorage.getItem('token');
            const userLeaderboardArray = await axios.get('http://52.36.97.102:3000/premium/showleaderbord', { headers: { Autherization: token}});
            console.log(userLeaderboardArray);
    
            const leaderboardEle = document.getElementById('leaderboard-list');
            leaderboardEle.innerHTML += '<h1>Leader Board</h1>';
            userLeaderboardArray.data.forEach((userDetails) => {
                leaderboardEle.innerHTML += `<li> Name - ${userDetails.name} Total Expense - ${userDetails.totalExpense} </li>`;
            })

        }
        document.getElementById('message').appendChild(inputEle);
        document.getElementById('message').appendChild(downloadFile);
        
    
}

document.getElementById('rzp-button1').onclick = async function (e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await axios.get('http://52.36.97.102:3000/parchase/buyprmium', { headers: { Autherization: token}})
    console.log(res);
    const options = {
        "key" : res.data.key_id,
        "order_id" : res.data.order.id,
        "handler" : async function (res) {
            const response = await axios.post('http://52.36.97.102:3000/parchase/updateprmium', {
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


function download(){
    const token = localStorage.getItem('token');
    axios
        .get('http://52.36.97.102:3000/user/download', { headers : { Autherization: token }})
        .then((res) => {
            if(res.status === 200){
                var a = document.createElement("a");
                a.href = res.data.fileURL;
                a.download = 'myepense.csv';
                a.click();
            } else {
                throw new Error(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
        })

}


function numberDownloaded(){
    const fulldate = document.getElementById('dateInput').value;
    const desiredDate = fulldate.split(' ')[0];
    console.log(desiredDate);
    console.log(typeof(desiredDate));
    const dateDetails = {
        desiredDate
    }
    const token = localStorage.getItem('token');
    axios
    .post('http://52.36.97.102:3000/user/timesdownload',  dateDetails , { headers : { Autherization: token }})
    .then(res => {
        console.log(res.data.length);
    })
    .catch(err => {
        console.log(err);
    })

}
