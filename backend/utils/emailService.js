const sendContactEmail = async (contactData) => {
  try {
    // We send this to the Vercel Serverless Function to bypass Render's strict SMTP block on free tier!
    const response = await fetch('https://defensive-cyber-czzx.vercel.app/api/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    
    if (response.ok) {
      console.log('Contact email sent successfully via Vercel Relay.');
    } else {
      console.error('Failed to send email via Vercel Relay');
    }
  } catch (error) {
    console.error('Error sending contact email:', error);
  }
};

module.exports = {
  sendContactEmail,
};
