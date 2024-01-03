function resetPassword(e){
    e.preventDefault();
    const to = e.target.email.value;
    
    const resetDetails = {
        to
    };
   console.log(resetDetails);
    axios
        .post('http://localhost:3000/forgotpassword', resetDetails)
        .then(res => {
            console.log('form submitted for sending mail');
            alert('Please Check Your Email');
        })
        .catch(err => {
            console.log(err);
        })
}