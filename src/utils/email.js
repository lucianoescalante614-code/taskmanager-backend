const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendVerificationEmail = async (to, token) => {
  const url = `${process.env.BACKEND_URL || 'http://localhost:' + (process.env.PORT||4000)}/api/auth/verify?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Verifica tu cuenta en Reserva tu Cancha',
    html: `<p>Haz clic <a href="${url}">aquí</a> para verificar tu cuenta en Reserva tu Cancha.</p>`
  };

  await transporter.sendMail(mailOptions);
};
