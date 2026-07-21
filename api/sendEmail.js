import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Add CORS headers to allow Render backend to call this
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, service, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.VITE_EMAIL_USER || process.env.EMAIL_USER || 'defensivecyber404@gmail.com',
      pass: process.env.VITE_EMAIL_PASS || process.env.EMAIL_PASS || 'rucpcfloypxybxqp',
    },
  });

  const mailOptions = {
    from: process.env.VITE_EMAIL_USER || process.env.EMAIL_USER || 'defensivecyber404@gmail.com',
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
    return res.status(200).json({ success: true, message: 'Email sent' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
