const nodemailer = require('nodemailer');

const sendContactEmail = async (contactData) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
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
  }
};

module.exports = {
  sendContactEmail,
};
