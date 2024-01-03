function signup(e){
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const signupDetails = {
        name,
        email,
        password
    };

    console.log(signupDetails);

    axios
        .post('http://localhost:3000/user/signup', signupDetails)
        .then(res => {
            //showOnScr(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}

addEventListener('DOMContentLoaded', () => {
    axios
        .get('http://localhost:3000/user/signup')
        .then(res => {
            for(let i=0; i<res.data.length; i++){
                //showOnScr(res.data[i]);
                console.log('you signup successfully');
            }
        })
        .catch(err => {
            console.log(err);
        })
});

function showOnScr(user){
    const pn = document.getElementById('items');
    const cn = `<li>${user.name}--${user.email}</li>`;

    pn.innerHTML += cn;
}