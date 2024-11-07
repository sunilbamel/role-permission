const nodemailer = require("nodemailer");


// async..await is not allowed in global scope, must use a wrapper
const nodemail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "msmotusingh744@gmail.com",
            pass: "2qrykvVmTRU5NCdW",
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'msmotusingh744@gmail.com', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        // text: "Hello world?", // plain text body
        html: html // html body
    });

    console.log("Message sent: %", info.messageId);
}

module.exports = nodemail;