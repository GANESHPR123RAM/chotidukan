const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS
    }
});

// Verify connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('Error in transporter configuration:', error);
    } else {
        console.log('Transporter is ready to send emails:', success);
    }
});

const sendMail = async (email, subject, content) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            html: content
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error while sending mail:', error);
            } else {
                console.log('Mail sent:', info.messageId);
            }
        });
    } catch (error) {
        console.log('Error in sendMail function:', error.message);
    }
}

module.exports = {
    sendMail
}
