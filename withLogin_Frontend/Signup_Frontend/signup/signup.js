
async function expense(e){
    try {
        e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const signUp = {
        name,
        email,
        password
    };
    console.log(signUp.password);
    const response = await axios .post('http://localhost:3000/user/signup', signUp)
    if(response.status === 200){
        window.location.href = ""
    } else {
        throw new Error('Failed to Login');
    }
    
    
    }
     catch (err){
        document.body.innerHTML += `<div style="color:red">${err}</div>`
     }
        
};



