const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: "yashrajsharma1910@gmail.com", // your email
    pass: "skdj zswr tkzz glmu", // your email password
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "yashrajsharma1910@gmail.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


module.exports = sendEmail;