import React from 'react';
import { Shield, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#080312] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1 lg:col-span-2 xl:col-span-1">
            <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0">
              {/* Row 1: Logo and Heading */}
              <div className="flex items-center">
                <img src="/middle-logo-dark.png" alt="Defensive Cyber Logo" className="h-16 w-auto group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all flex-shrink-0" />
              </div>
              <div className="flex items-center">
                <a href="#" className="group block -mt-3">
                  <span className="whitespace-nowrap font-space font-bold text-xl tracking-wider text-white leading-none">
                    DEFENSIVE <span className="text-primary">CYBER</span>
                  </span>
                </a>
              </div>
              
              {/* Row 2: Paragraph and Icons */}
              <div className="col-start-2 flex flex-col -mt-5">
                <p className="text-white/70 text-sm mb-6 leading-relaxed mt-1">
                  Enterprise-grade cybersecurity solutions protecting your digital assets against modern threats with advanced intelligence and proactive defense.
                </p>
                
                {/* Social Icons */}
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-sm flex items-center justify-center text-white/70 hover:text-primary hover:border-primary/50 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-sm flex items-center justify-center text-white/70 hover:text-primary hover:border-primary/50 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-sm flex items-center justify-center text-white/70 hover:text-primary hover:border-primary/50 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-12 xl:ml-16">
            <h4 className="font-space font-semibold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/#services' },
                { name: 'Case Studies', path: '/#cases' },
                { name: 'Contact', path: '/#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/70 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-space font-semibold text-white mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3">
              {['Digital Forensics', 'Cyber Threat Intelligence', 'Incident Response', 'Reverse Engineering & Malware Analysis'].map((service) => (
                <li key={service}>
                  <span className="text-white/70 hover:text-primary transition-colors text-sm flex items-center gap-2 cursor-default">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-space font-semibold text-white mb-6 uppercase tracking-wider text-sm">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>New Delhi, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>defensivecyber404@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © Defensive Cyber Consulting Services
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <Link to="/legal" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/legal" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
