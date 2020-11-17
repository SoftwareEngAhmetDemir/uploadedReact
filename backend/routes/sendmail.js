const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const nodemailer = require("nodemailer");

// get all items

router.post("/adminsmail", (req, res) => {
    console.log(req.body)
    const { username, title, text } = req.body
    var mails = []
    User.find({ 'role.mailing': true }, { username: 1 })
        .then((data) => {
            for (const i in data) {

                const transporter = nodemailer.createTransport({
                    host: `${process.env.MAIL_HOST || "mail.bigfil.com.tr"}`,
                    port: 587,
                    secure: false,
                    tls: { rejectUnauthorized: false },
                    auth: {
                        user: `${process.env.MAIL_NAME || "merhan@bigfil.com.tr"}`,
                        pass: `${process.env.MAIL_PASS || "6pW@Y6nH"}`,
                    },
                });
                const mailOptions = {
                    from: `${process.env.MAIL_NAME || "merhan@bigfil.com.tr"}`,
                    to: `${data[i].username}`,
                    subject: title,
                    html: text,
                };

                console.log("sending mail");

                transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.error("there was an error: ", err);
                    } else {
                        // console.log("here is the res: ", response);
                        res.status(200).json("success");
                    }
                });
            }

        })
        .catch((err) =>
            res.json({
                messagge: 'Error: ' + err,
                variant: 'error',
            })
        );



});


module.exports = router;
