function login(e){
    e.preventDefault();
    const email =  e.target.email.value;
    const password = e.target.password.value;

    const loginDetails = {
        email,
        password
    };

   axios
    .post('http://52.36.97.102:3000/user/login', loginDetails)
    .then(res => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        alert('User Login SuccessFully')
        window.location.href = '../expense/expense.html';
    })
    .catch(err => {
        console.log(err);
    })
}