const createMailTransport = require('../config/mail');

const sendEmail = async ({ to, subject, html }) => {
  const transport = createMailTransport();
  if (!transport) {
    if (process.env.NODE_ENV === 'production') throw new Error('Email transport is not configured.');
    console.info(`Email preview for ${to}: ${subject}\n${html}`);
    return;
  }
  await transport.sendMail({ from: process.env.MAIL_FROM || 'MediSphere <no-reply@medisphere.health>', to, subject, html });
};

const sendVerificationEmail = (user, token) => sendEmail({ to: user.email, subject: 'Verify your MediSphere email', html: `<p>Welcome to MediSphere. Verify your email by opening:</p><p>${process.env.CLIENT_URL}/verify-email/${token}</p>` });
const sendPasswordResetEmail = (user, token) => sendEmail({ to: user.email, subject: 'Reset your MediSphere password', html: `<p>Reset your password by opening:</p><p>${process.env.CLIENT_URL}/reset-password/${token}</p><p>This link expires in 15 minutes.</p>` });

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
