function resetPassword(e){
    e.preventDefault();
    const mail = e.target.email.value;
    
    const resetDetails = {
        mail
    };

    axios
        .post('http://localhost:3000/password/forgotpassword', resetDetails)
        .then(res => {
            console.log('form submitted for sending mail');
            alert('Please Check Your Email');
        })
        .catch(err => {
            console.log(err);
        })
}