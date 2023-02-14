import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'

let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD
    }
}
let transporter = nodemailer.createTransport(nodeConfig);
let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/"
    }
})

export const registerMail = async (req, res) => {
    const {username, userEmail, text, subject} = req.body;
    var email = {
        body: {
            name: username,
            intro: text || "Welcome to Daily tution! We're very excted to have you on board",
            outro: "Need help, or have questions? Just reply to this email, We'd love to help!"
        }
    }
    var emailBody = MailGenerator.generate(email)
    let message = {
        from:"ozodbeksoftwaredev@gmail.com",
        to: userEmail,
        subject ,
        html:emailBody
    }

    //send email
    transporter.sendMail(message)
        .then(()=>{
            return res.status(200).send({msg:"Yout should receive an email from us."})
        })
        .catch(error=> res.status(500).send({error:"Message not send" + error?.message}))
}