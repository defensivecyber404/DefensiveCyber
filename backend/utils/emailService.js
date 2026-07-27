const nodemailer = require('nodemailer');

const sendContactEmail = async (contactData) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // upgrades to TLS using STARTTLS
      auth: {
        user: process.env.EMAIL_USER || 'defensivecyber404@gmail.com',
        pass: process.env.EMAIL_PASS || 'rucpcfloypxybxqp'
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'defensivecyber404@gmail.com',
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'defensivecyber404@gmail.com',
      subject: `New Contact Request: ${contactData.service || 'General Inquiry'}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${contactData.name || 'N/A'}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Service of Interest:</strong> ${contactData.service || 'N/A'}</p>
        <br/>
        <h3>Message:</h3>
        <p>${contactData.message}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
};

module.exports = {
  sendContactEmail,
};
