const nodeMailer = require("nodemailer");

const sendEmail = async (receivedOptions) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const emailOptions = {
    from: process.env.SMTP_MAIL,
    to: receivedOptions.email,
    subject: receivedOptions.subject,
    text: receivedOptions.message,
  };

  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
