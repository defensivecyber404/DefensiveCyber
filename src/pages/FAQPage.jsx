import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FAQ } from '../components/sections/FAQ';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const FAQPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main 
      className="pt-24 pb-24 relative min-h-screen bg-transparent"
      style={{
        backgroundImage: "none",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      
      <div className="relative z-10">
        <div className="container mx-auto px-6 pt-12 mb-4">
          <Link to="/" className="inline-flex items-center justify-center text-sm font-bold text-white hover:text-primary transition-all backdrop-blur-md bg-white/5 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 px-6 py-2.5 rounded-full w-max cursor-pointer group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
        <FAQ />
        
      </div>
    </main>
  );
};
