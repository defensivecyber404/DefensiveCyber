import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { fetchServices, defaultServices } from '../utils/blogStore';
import { Helmet } from 'react-helmet-async';

const SERVICE_PARAGRAPHS = {
  'digital-forensics': "When an incident, data breach, or unauthorized insider activity occurs, Defensive Cyber uncovers, preserves, and analyzes digital evidence across endpoints, volatile memory, cloud estates, and networks. Following strict chain-of-custody protocols, our certified senior practitioners reconstruct the complete chronological timeline of adversary activity to deliver defensible, court-admissible forensic reports that hold up under legal, regulatory, and executive scrutiny.",
  'cyber-threat-intelligence': "Defensive Cyber proactively monitors adversary infrastructure, dark web forums, illicit marketplaces, and leaked credentials to identify threats targeting your organization before attacks occur. We translate real-world threat actor behaviors and campaigns into actionable intelligence, prioritized threat warnings, and tailored detection rules to harden your defenses in advance.",
  'incident-response': "In the event of an active intrusion, compromised identity, or ransomware deployment, Defensive Cyber delivers rapid, senior-led emergency containment to sever adversary command links, halt lateral spread, and preserve vital evidence. We systematically eliminate backdoors and persistence mechanisms, orchestrating a safe, resilient operational recovery with minimal business downtime.",
  'reverse-engineering-malware-analysis': "Defensive Cyber dissects suspicious binaries, compiled executables, loaders, and obfuscated payloads down to the assembly level inside isolated laboratory environments. We expose hidden capabilities, encryption routines, and command-and-control infrastructure, providing validated detection signatures (YARA/Sigma) and tactical indicators to permanently block related threat variants."
};

export const ServiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadData = async () => {
      try {
        const fetched = await fetchServices();
        const list = (fetched && fetched.length > 0) ? fetched : defaultServices;
        const found = list.find(s => s.slug === id || s._id === id);
        setService(found || list[0]);
      } catch (e) {
        const found = defaultServices.find(s => s.slug === id || s._id === id);
        setService(found || defaultServices[0]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-base)] text-[var(--text-heading)]">
        <div className="w-8 h-8 border-2 border-[var(--text-heading)] border-t-transparent animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Loading Service Overview...
        </p>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-base)] text-[var(--text-heading)] px-6">
        <h2 className="font-serif text-3xl font-bold mb-4">Capability Not Found</h2>
        <p className="font-sans text-sm text-[var(--text-muted)] mb-8">
          The requested security service or assessment could not be located.
        </p>
        <Link 
          to="/#services" 
          className="brand-btn-primary !py-3 !px-7 font-mono text-xs uppercase tracking-wider"
        >
          Browse All Services
        </Link>
      </main>
    );
  }

  const paragraph = SERVICE_PARAGRAPHS[service.slug] || service.fullDescription || service.description;

  return (
    <main className="pt-28 pb-20 relative min-h-screen bg-[var(--bg-base)] text-[var(--text-base)]">
      <Helmet>
        <title>{`${service.title} | Defensive Cyber Services`}</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-10 border-b border-[var(--border-hairline)]">
          <button 
            onClick={() => navigate('/#services')}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Services</span>
          </button>
          
          <Link 
            to="/#services"
            className="font-mono text-xs uppercase tracking-wider text-[var(--text-heading)] hover:text-[var(--accent-signal)] transition-colors flex items-center gap-1.5 font-semibold"
          >
            <span>Browse All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Clean Central Explanation Block */}
        <div className="pb-12 border-b border-[var(--border-hairline)] mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-[var(--accent-signal)] rounded-none" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
              Core Security Discipline
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-heading)] leading-tight mb-6">
            {service.title}
          </h1>

          <p className="font-sans text-base sm:text-lg text-[var(--text-body)] leading-relaxed mb-8">
            {paragraph}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/#contact" 
              className="brand-btn-primary flex items-center justify-center gap-3 !rounded-none !py-3 !px-7 font-mono text-xs uppercase tracking-wider font-semibold"
            >
              <span>Request Scope Docket</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link 
              to="/#services" 
              className="brand-btn-secondary flex items-center justify-center gap-2 !rounded-none !py-3 !px-7 font-mono text-xs uppercase tracking-wider"
            >
              Browse All Services
            </Link>
          </div>
        </div>

        {/* Bottom CTA Box (Kept as requested) */}
        <div className="border border-[var(--border-hairline)] bg-[var(--bg-card)] p-8 sm:p-12 text-center rounded-none shadow-sm">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] block mb-3 font-semibold">
            SECURE YOUR ASSESSMENT WINDOW
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-heading)] max-w-xl mx-auto mb-4">
            Ready to initiate a {service.title} engagement?
          </h2>
          <p className="font-sans text-sm text-[var(--text-body)] max-w-lg mx-auto leading-relaxed mb-8">
            Speak directly with our senior certified practitioners. Receive a customized scoping docket with transparent timelines and zero automated filler.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/#contact"
              className="brand-btn-primary inline-flex items-center justify-center gap-3 !rounded-none !py-3.5 !px-8 font-mono text-xs uppercase tracking-wider font-semibold"
            >
              <span>Request Confidential Scoping Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link 
              to="/#services"
              className="brand-btn-secondary inline-flex items-center justify-center gap-2 !rounded-none !py-3.5 !px-8 font-mono text-xs uppercase tracking-wider"
            >
              <span>Browse All Services</span>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
};
