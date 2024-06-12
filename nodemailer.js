const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = (formulario) => {
  var transporter = nodemailer.createTransport({
    host: 'smtp.sapo.pt',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: `"${formulario.name} 👕" <${process.env.EMAIL_USER}>`,
    to: 'escolaEstg@sapo.pt', 
    subject: formulario.asunto,
    
    html: `
   <strong>From:</strong>${formulario.email} <br>     
   <strong>Mensagem:</strong> ${formulario.message}
    `
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
