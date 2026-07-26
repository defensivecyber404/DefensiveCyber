require('dotenv').config();
const mongoose = require('mongoose');
const Review = require('./models/Review');
const Client = require('./models/Client');
const initDB = require('./database');

const caseStudies = [
  {
    text: "This is the second time I've worked with Ankur. He is very professional, knowledgeable in cybersecurity and endpoint security tools, and always great to work with.",
    companyAndPost: "Client"
  },
  {
    text: "Ankur has good knowledge in information security and he is really hardworking and is always open to discuss ideas and suggestions. Keep growing Ankur..",
    companyAndPost: "Cloud Security | Ex-Accenture | Ex- DXC | Ex- McAfee"
  },
  {
    text: "It was my pleasure learning with Ankur, as he is through professional and shared his expertise in best possible way.",
    companyAndPost: "Governance, Risk and Compliance Lead at Kyndryl (Airtel Africa)"
  },
  {
    text: "Ankur is hardworking and very knowledgeable! I had the pleasure of working with Ankur for 10months on several projects at TruShield! He always went above and beyond for the team. He would be an asset to any company because he is passionate about the field and always went the extra mile.",
    companyAndPost: "Senior Associate - Security intelligence analyst at Capital One"
  },
  {
    text: "Ankur and I worked at the same company however, we never worked together directly. Ankur is very personable and cares about his coworkers. He is extremely determined and hardworking in his craft. I would highly recommend Ankur in any capacity, I know he is capable of many things.",
    companyAndPost: "Clinical Technician II & Telemetry Technician at Inova Health System"
  }
];

const clients = [
  { name: "TryHackMe", location: "London" },
  { name: "CodeCentro", location: "USA" },
  { name: "ActiveBytes Innovation", location: "Dubai" },
  { name: "Empathy Technologies", location: "" }
];

async function seed() {
  await initDB();
  
  await Review.deleteMany({});
  await Client.deleteMany({});
  
  for (const review of caseStudies) {
    await Review.create(review);
  }
  
  for (const client of clients) {
    await Client.create(client);
  }
  
  console.log("Seeded Reviews and Clients");
  process.exit(0);
}

seed();
