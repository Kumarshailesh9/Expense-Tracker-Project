function resetPassword(e){
    e.preventDefault();
    const to = e.target.email.value;
    
    const resetDetails = {
        to
    };
   console.log(resetDetails);
    axios
        .post('http://52.36.97.102:3000/forgotpassword', resetDetails)
        .then(res => {
            console.log('form submitted for sending mail');
            alert('Please Check Your Email');
        })
        .catch(err => {
            console.log(err);
        })
}