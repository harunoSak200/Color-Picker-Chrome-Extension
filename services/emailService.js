const nodemailer = require('nodemailer');

async function sendMail({ from, to, subject, text}) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT, 10), // Ensure port is a number
            secure: process.env.SMTP_PORT == "465", // Secure is true only for port 465
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });
        
        console.log(typeof text) ; 
        console.log(typeof html) ; 

        let info = await transporter.sendMail({
            from: `inShare <${from}>`, // Setting sender properly
            to: to,
            subject: subject,
            text: text
        });

        console.log(`message sent to ${to} successfully! from ${from}`);
        return info; 
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Throw error for handling in the calling function
    }
}

module.exports = { sendMail };
