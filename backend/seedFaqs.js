require('dotenv').config();
const mongoose = require('mongoose');
const Faq = require('./models/Faq');

const faqs = [
  {
    question: "What exactly happens during a Penetration Test?",
    answer: "A penetration test is a simulated cyber attack against your computer system to check for exploitable vulnerabilities. We use the same techniques as malicious hackers, but safely and with your permission, to identify weak spots before criminals can exploit them."
  },
  {
    question: "How long does a typical security assessment take?",
    answer: "The duration depends on the scope and complexity of your infrastructure. A small web application might take 1-2 weeks, while a comprehensive enterprise-wide assessment could take 4-6 weeks. We provide a detailed timeline during the scoping phase."
  },
  {
    question: "Will your testing disrupt our normal business operations?",
    answer: "Our primary goal is to assess security without causing disruption. We carefully schedule intrusive tests during maintenance windows and closely monitor system health. If we identify a critical vulnerability that could cause a crash, we immediately stop and notify your team."
  },
  {
    question: "Do you help fix the vulnerabilities you find?",
    answer: "Yes. Our reports include detailed remediation steps and proof-of-concept exploits. We also offer remediation support consulting to help your development and IT teams implement the recommended fixes effectively."
  },
  {
    question: "Are your services compliant with SOC2 and ISO 27001?",
    answer: "Absolutely. Our methodologies align with industry standards including OWASP, NIST, and PTES. Our reports can be used as evidence of independent security testing for SOC2, ISO 27001, PCI-DSS, and HIPAA audits."
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');
    
    // Clear existing FAQs
    await Faq.deleteMany({});
    
    // Insert new FAQs
    await Faq.insertMany(faqs);
    console.log('FAQs seeded successfully!');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding FAQs:', error);
    process.exit(1);
  }
};

seed();
