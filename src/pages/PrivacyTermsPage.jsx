import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PrivacyTermsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-24 relative min-h-screen bg-transparent text-white">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: "url('/backgroundImageAboutUs.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center justify-center text-sm font-bold text-[#0F172A] hover:text-primary transition-all backdrop-blur-md bg-transparent border border-[#0F172A]/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-[#0F172A]/5 px-6 py-2.5 rounded-full w-max cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>

        <h1 className="text-4xl font-bold font-space mb-4 text-[#0F172A]">Privacy Policy & Terms of Service</h1>
        <p className="mt-4 text-[#0F172A]/70">This page is under construction. Content for Privacy Policy and Terms of Service will be added here later.</p>
      </div>
    </main>
  );
};
