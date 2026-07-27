const nodemailer = require('nodemailer');
const dns = require('dns');
const { promisify } = require('util');
const lookup = promisify(dns.lookup);

const sendContactEmail = async (contactData) => {
  try {
    // Manually force IPv4 resolution to bypass Vercel IPv6 ENETUNREACH bug
    const { address } = await lookup('smtp.gmail.com', { family: 4 });

    const transporter = nodemailer.createTransport({
      host: address,
      port: 587,
      secure: false, // upgrades to TLS using STARTTLS
      tls: {
        servername: 'smtp.gmail.com',
        rejectUnauthorized: false
      },
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
