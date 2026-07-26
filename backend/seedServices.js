require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const initialServices = [
  {
    slug: 'digital-forensics',
    title: 'Digital Forensics',
    description: 'Uncover digital evidence and analyze cyber incidents to identify attack origins, preserve data integrity, and support investigations.',
    fullDescription: `When something's gone wrong — a breach, suspected fraud, an insider incident, or data that's disappeared without explanation — you need to know exactly what happened, and you need proof that will hold up if things go legal.\n\nThat's what we do. We collect, preserve, and analyze digital evidence from computers, servers, mobile devices, cloud accounts, and network logs, following strict chain-of-custody procedures so nothing gets challenged later on technicalities. We can recover data that's been deleted or hidden, piece together a timeline of exactly who did what and when, and put it all into a report that's clear enough for a courtroom and detailed enough for your legal team to act on.\n\nThis is the service you want when you need answers about something that's already happened — a breach you're trying to understand, an employee you suspect of wrongdoing, or evidence you need to preserve properly before it's gone for good.`,
    icon: 'Search'
  },
  {
    slug: 'cyber-threat-intelligence',
    title: 'Cyber Threat Intelligence',
    description: 'Proactively identify emerging cyber threats, monitor attacker activities, and deliver actionable intelligence to strengthen your security posture.',
    fullDescription: `Most companies find out they're a target after the damage is done. This is about flipping that — knowing what's coming before it lands on your doorstep.\n\nWe keep a constant watch on the threat landscape relevant to your industry: dark web chatter, criminal forums, leaked credentials tied to your domain, new malware campaigns, and the behavior of threat groups that tend to go after businesses like yours. But we don't just hand you a pile of raw data and wish you luck — every report we send is built to be acted on, whether that means alerting your SOC team to a specific new tactic or giving your leadership a clear picture of the risks worth budgeting for.\n\nIf you'd rather get ahead of problems than clean up after them, this is where you start.`,
    icon: 'Radar'
  },
  {
    slug: 'incident-response',
    title: 'Incident Response',
    description: 'Rapidly detect, contain, and recover from cyber incidents while minimizing business disruption and reducing security risks.',
    fullDescription: `An active cyber incident isn't a technical inconvenience — it's a business emergency, and how fast you move in the first hour often decides how bad the story ends up being.\n\nOur incident response team steps in to contain the threat, figure out how far it's spread, and get it out of your systems — whether that's ransomware, a compromised account, or a business email attack that's already cost you money. Once things are stable, we help bring your systems back safely and walk you through exactly what happened and how to stop it from happening again. If you'd rather not be scrambling to find help mid-crisis, we also offer retainer arrangements so you have a response team on call before you ever need one.\n\nThis is the service for right now — when something's actively happening and you need it stopped.`,
    icon: 'AlertTriangle'
  },
  {
    slug: 'reverse-engineering-malware-analysis',
    title: 'Reverse Engineering & Malware Analysis',
    description: 'Analyze malicious software to understand its behavior, uncover attack techniques, and develop effective detection and mitigation strategies.',
    fullDescription: `Finding malware on your network is only half the problem. The real question is what it actually does — what it's after, how it talks to whoever's controlling it, and how it slipped past your defenses in the first place.\n\nWe take suspicious files and binaries apart at the code level, using both static and dynamic analysis, to expose exactly how they behave. That includes tracking down command-and-control infrastructure, identifying evasion techniques, and — where possible — connecting the malware back to known threat groups or campaigns. From there, we build custom detection rules so the same threat can't walk back through the front door.\n\nIf you've found something suspicious and "just delete it" doesn't feel like enough, this is the service that gives you the full picture.`,
    icon: 'Bug'
  }
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const count = await Service.countDocuments();
    if (count === 0) {
      await Service.insertMany(initialServices);
      console.log('Successfully seeded 4 initial services.');
    } else {
      console.log('Services already exist in the database. No seeding needed.');
    }
  } catch (error) {
    console.error('Error seeding services:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedServices();
