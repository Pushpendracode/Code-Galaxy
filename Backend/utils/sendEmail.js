const nodemailer = require('nodemailer');

// Reuses the same Brevo SMTP pattern from your Password Reset Flow project,
// since Gmail SMTP gets blocked on Render's free tier.
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false, // Brevo uses STARTTLS on port 587, not full SSL
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

async function sendContactNotification({ name, email, message }) {
  const mailOptions = {
    from: `"Code Galaxy Contact Form" <${process.env.BREVO_SMTP_USER}>`,
    to: process.env.TO_EMAIL,
    replyTo: email,
    subject: `New message from ${name} via Code Galaxy`,
    text: `You received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}

Message:
${message}`,
    html: `
      <h3>New message from your Code Galaxy contact form</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendContactNotification };