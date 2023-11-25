
async function expense(e){
    try {
        e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const pass = e.target.password.value;

    const signUp = {
        name,
        email,
        pass
    };

    const response = await axios .post('http://localhost:3000/user/signup', signUp)
    if(response.status === 201){
        window.location.href = "../Login/login.html"
    } else {
        throw new Error('Failed to Login');
    }
    
    }
     catch (err){
        document.body.innerHTML += `<div style="color:red">${err}</div>`
     }
        
};


///////////////// //////////////////////////////////////////////////////// //////////////////


// function expense(e){
//     try {
//         e.preventDefault();
//     const name = e.target.name.value;
//     const email = e.target.email.value;
//     const pass = e.target.password.value;

//     const signUp = {
//         name,
//         email,
//         pass
//     };

//     axios
//         .post('http://localhost:3000/user/signup', signUp)
//         then(res => {
//             window.location.href = "../Login/login.html";
//         }) 
//         .catch (err => {
//             console.log(err);
//         })
//     } 
//     catch (err){
//         document.body.innerHTML = `<div style="color:red">${err}</div>`
//     }

// };
