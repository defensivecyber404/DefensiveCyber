import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { fetchServiceById } from '../utils/blogStore';

export const ServiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadService = async () => {
      setIsLoading(true);
      const data = await fetchServiceById(id);
      setService(data);
      setIsLoading(false);
    };
    loadService();
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-400 font-medium tracking-wider animate-pulse">Loading service...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <button onClick={() => navigate('/')} className="text-primary hover:underline font-bold">
          Return Home
        </button>
      </div>
    );
  }

  // Split title for styling (last word in purple)
  const words = service.title.split(' ');
  const lastWord = words.pop();
  const firstPart = words.join(' ');
  const IconComponent = Icons[service.icon] || Icons.Search;

  return (
    <main className="pt-24 pb-24 relative min-h-screen bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="relative z-50 mt-12 mb-8 cursor-pointer inline-flex items-center text-sm font-bold text-white hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 backdrop-blur-sm bg-white/5 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-5 py-2 rounded-full"
        >
          <Icons.ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 backdrop-blur-sm"
            >
              <IconComponent className="w-12 h-12 text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-black uppercase mb-6"
              style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}
            >
              {firstPart && <span className="glossy-neon-white pb-1 mr-3">{firstPart}</span>}
              <span className="glossy-neon-purple pb-1">{lastWord}</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden group rounded-2xl border border-white/10 shadow-xl bg-black/30 backdrop-blur-sm"
          >
            {/* Subtle center purple glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(90,20,150,0.2) 0%, transparent 60%)' }} />
            
            <div className="relative z-10 p-8 md:p-12">
              {service.fullDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed text-[1.15rem] md:text-xl text-gray-200 drop-shadow-sm font-medium">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};
