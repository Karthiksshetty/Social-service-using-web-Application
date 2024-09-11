const express = require("express");
const contactUs = express.Router();
const nodemailer = require("nodemailer");

contactUs.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (
      name == undefined ||
      email == undefined ||
      subject == undefined ||
      message == undefined
    ) {
      return res
        .status(210)
        .json({ code: 210, message: "All field are required" });
    }
    // mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: subject,
      text: message,
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        console.log(error.message);
        return res
          .status(210)
          .json({ code: 210, message: "Fail to send mail, Try again later" });
      } else {
        console.log("Mail sent");
        return res
          .status(200)
          .json({ code: 200, message: "Mail sent successfully" });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = contactUs;
