
 async function login(e){
     try {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

    const loginDetails = {
        email,
        password
    };
    

    const response = await axios .post('http://localhost:3000/user/login', loginDetails);
    if(response.status === 200){
        alert(response.data.message);
    } else {
        throw new Error('Failed to Login');
    }
    
    
    }
     catch (err){
        document.body.innerHTML += `<div style="color:red">${err}</div>`
     }
        
};



