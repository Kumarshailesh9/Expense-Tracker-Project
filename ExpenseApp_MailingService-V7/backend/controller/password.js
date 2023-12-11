const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

exports.postMail = async (req, res) => {
    const { mail } = req.body;

    const msg = {
        to : mail,
        from: 'theshaileshkumar9@gmail.com', // Replace with your sender email
        subject: 'Reset Password Test Mail!',
        text : 'this mail form daily expenseApp for Reset Password'
      };
    
      // Send email
      sgMail
        .send(msg)
        .then(() => {
          res.status(200).send('Email sent successfully');
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error sending email');
        });


};