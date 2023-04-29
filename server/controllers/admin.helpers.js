
const nodemailer = require("nodemailer");
const { mail } = require("../config/mail.config");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hubspot_jwt";
const getJWTAccessToken = async (payload) =>{
      const token = jwt.sign(payload, JWT_SECRET, {expiresIn:3600})
      return token;
}


const sentForgotPasswordLink = async (name, email, randomString) => {
    try {
        var transporter = nodemailer.createTransport({
            host: mail.HOST,
            port: mail.PORT,
            pool: true,
            auth: {
                user: mail.AUTH.email,
                pass: mail.AUTH.password
            },
            tls: { rejectUnauthorized: false },
        });

        var mailOptions = {
            from: mail.AUTH.email,
            to: email,
            subject: "reset password",
            html: '<p> Hii ' + name + ', Please copy the link and <a href="http://localhost:3000/reset-password?randomString=' + randomString + '&email=' + email + '"> reset your password</a>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log("error in sendMail function while sending the mail.", error);
            }
            console.log("sentForgotPasswordLink ->", info.response);
        })


    }
    catch (error) {
        throw error;
    }
}

module.exports = { sentForgotPasswordLink , getJWTAccessToken }



