const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport( {
    service:  'Mailgun',
    auth: {
        user: process.env.MAIL_SERVICE_AUTH_USER,
        pass: process.env.MAIL_SERVICE_AUTH_PASS,
    }
});

module.exports = {

    sendSignUpVerification: async (token, email) => {
        try{
            var message = {
                from: process.env.MAIL_SERVICE_FROM,
                to: email,
                subject: "[Old Phone Deals] Verify and Activate Your Account",
                html: `<h1>Old Phone Deals</h1>
                        <p>Please use the following link to verify and activate your account.</p>
                        <a>http://localhost:3000/email_verify?token=${token}</a>`
              };
            transporter.sendMail(message);
        }catch{
        }
        
    },

    sendPasswordResetVerification: async (token, email) => {
        try{
            var message = {
                from: process.env.MAIL_SERVICE_FROM,
                to: email,
                subject: "[Old Phone Deals] Password Reset",
                html: `<h1>Old Phone Deals</h1>
                        <p>Please use the following link to reset your password.</p>
                        <a>http://localhost:3000/reset_password?token=${token}</a>`
              };
            transporter.sendMail(message);
        }catch{

        }
        
    },

    sendPasswordResetVerificationUserProfile: async (email) => {
        try{
            var message = {
                from: process.env.MAIL_SERVICE_FROM,
                to: email,
                subject: "[Old Phone Deals] Password Reset",
                html: `<h1>Old Phone Deals</h1>
                        <p>Your password has been changed!</p>`
              };
            transporter.sendMail(message);
        }catch (ignore){

        }
        
    }

}