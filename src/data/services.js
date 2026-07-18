import { 
  Search,
  Radar,
  AlertTriangle,
  Bug
} from 'lucide-react';

export const servicesData = [
  {
    title: 'Digital Forensics',
    description: 'Uncover digital evidence and analyze cyber incidents to identify attack origins, preserve data integrity, and support investigations.',
    icon: Search,
  },
  {
    title: 'Cyber Threat Intelligence',
    description: 'Proactively identify emerging cyber threats, monitor attacker activities, and deliver actionable intelligence to strengthen your security posture.',
    icon: Radar,
  },
  {
    title: 'Incident Response',
    description: 'Rapidly detect, contain, and recover from cyber incidents while minimizing business disruption and reducing security risks.',
    icon: AlertTriangle,
  },
  {
    title: 'Reverse Engineering & Malware Analysis',
    description: 'Analyze malicious software to understand its behavior, uncover attack techniques, and develop effective detection and mitigation strategies.',
    icon: Bug,
  }
];
