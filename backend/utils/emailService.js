const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactEmail = async (contactData) => {
  const { name, email, service, message } = contactData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'defensivecyber404@gmail.com',
    subject: `New Contact Request from ${name || 'Website User'}`,
    text: `
      You have received a new contact request from the Defensive Cyber website.

      Name: ${name || 'Not provided'}
      Email: ${email || 'Not provided'}
      Service Requested: ${service || 'Not specified'}
      
      Message:
      ${message}
    `,
    html: `
      <h2>New Contact Request</h2>
      <p>You have received a new contact request from the Defensive Cyber website.</p>
      <ul>
        <li><strong>Name:</strong> ${name || 'Not provided'}</li>
        <li><strong>Email:</strong> ${email || 'Not provided'}</li>
        <li><strong>Service Requested:</strong> ${service || 'Not specified'}</li>
      </ul>
      <h3>Message:</h3>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully.');
  } catch (error) {
    console.error('Error sending contact email:', error);
    // We log the error but don't necessarily throw it, so we don't break the client's request if email fails
  }
};

module.exports = {
  sendContactEmail,
};
