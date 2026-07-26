import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, PlusCircle, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchReviews, deleteReview, fetchClients, deleteClient } from '../../utils/blogStore';
import { ReviewFormModal } from '../admin/ReviewFormModal';
import { ClientFormModal } from '../admin/ClientFormModal';

const defaultCaseStudies = [
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

const defaultClients = [
  { name: "TryHackMe", location: "London" },
  { name: "CodeCentro", location: "USA" },
  { name: "ActiveBytes Innovation", location: "Dubai" },
  { name: "Empathy Technologies", location: "" }
];

export const CaseStudiesSlider = () => {
  const { isAuthenticated, token } = useAuth();
  
  const [caseStudies, setCaseStudies] = useState(defaultCaseStudies);
  const [clients, setClients] = useState(defaultClients);
  
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [currentClientIndex, setCurrentClientIndex] = useState(0);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  
  const [editingReview, setEditingReview] = useState(null);
  const [editingClient, setEditingClient] = useState(null);

  const loadData = async () => {
    try {
      const fetchedReviews = await fetchReviews();
      const fetchedClients = await fetchClients();
      if (fetchedReviews && fetchedReviews.length > 0) {
        setCaseStudies(fetchedReviews);
      }
      if (fetchedClients && fetchedClients.length > 0) {
        setClients(fetchedClients);
      }
    } catch (err) {
      console.error("Failed to load data, using defaults");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Review Slider logic
  const nextReviewSlide = () => {
    setCurrentReviewIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };
  const prevReviewSlide = () => {
    setCurrentReviewIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  // Client Slider logic
  const nextClientSlide = () => {
    setCurrentClientIndex((prev) => (prev >= clients.length - 1 ? 0 : prev + 1));
  };
  const prevClientSlide = () => {
    setCurrentClientIndex((prev) => (prev <= 0 ? clients.length - 1 : prev - 1));
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm("Delete this review?")) {
      await deleteReview(id, token);
      setCurrentReviewIndex(0);
      loadData();
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm("Delete this client?")) {
      await deleteClient(id, token);
      setCurrentClientIndex(0);
      loadData();
    }
  };

  const currentReview = caseStudies[currentReviewIndex];
  // Calculate visible clients for the slider view
  // Let's show 4 at a time on desktop, 2 on tablet, 1 on mobile
  // For simplicity, we can just slide the wrapper or show one group.
  // The user asked for "ek arrow ka option do jaise us pe click karke slide ho paye". 
  // Let's create a simple horizontal scroll or a similar 3D card approach, but for multiple items it's easier to use a flex row that translates.
  
  const clientsToShow = 4;
  const visibleClients = clients.slice(currentClientIndex, currentClientIndex + clientsToShow);
  // To handle wrapping, if we're near the end, we can append from the start
  const displayClients = [...visibleClients];
  if (displayClients.length < clientsToShow && clients.length > 0) {
    const remaining = clientsToShow - displayClients.length;
    displayClients.push(...clients.slice(0, remaining));
  }

  return (
    <section id="cases" className="relative py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 xl:px-16 relative">
        
        {/* REVIEWS SECTION */}
        <div className="max-w-4xl mx-auto mb-4 pl-2 md:pl-0 flex justify-between items-center">
          <h4 
            className="text-white font-bold tracking-widest text-sm md:text-base uppercase"
            style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}
          >
            CLIENT <span className="text-[#c77dff]">REVIEW</span>
          </h4>
          {isAuthenticated && (
            <button 
              onClick={() => {
                setEditingReview(null);
                setIsReviewModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg transition-all text-xs"
            >
              <PlusCircle className="w-4 h-4" /> Add Review
            </button>
          )}
        </div>

        {caseStudies.length > 0 ? (
          <div className="max-w-4xl mx-auto relative mb-24">
            <div className="hidden lg:flex absolute top-1/2 -left-6 md:-left-20 -translate-y-1/2 z-20">
              <button 
                onClick={prevReviewSlide}
                className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center shadow-md border border-white/10 hover:scale-110 hover:bg-black/90 transition-all text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="hidden lg:flex absolute top-1/2 -right-6 md:-right-20 -translate-y-1/2 z-20">
              <button 
                onClick={nextReviewSlide}
                className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center shadow-md border border-white/10 hover:scale-110 hover:bg-black/90 transition-all text-white"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-white/10 relative z-10 w-full transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              {/* Subtle center purple glow */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(90,20,150,0.2) 0%, transparent 60%)' }} />
              {isAuthenticated && currentReview && (
                <div className="absolute top-4 right-4 z-50 flex gap-2">
                  <button 
                    onClick={() => {
                      setEditingReview(currentReview);
                      setIsReviewModalOpen(true);
                    }}
                    className="p-2 bg-white/10 hover:bg-white/20 text-gray-200 rounded-full transition-colors"
                    title="Edit Review"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteReview(currentReview._id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500 hover:text-white text-red-400 rounded-full transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="min-h-[250px] flex items-center justify-center">
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative w-full text-center">
                  <AnimatePresence mode="wait">
                    {currentReview && (
                      <motion.div
                        key={currentReviewIndex}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}
                        className="w-full"
                      >
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 font-medium">
                          "{currentReview.text}"
                        </p>
                        
                        <div className="mt-6 flex flex-col items-center">
                          {currentReview.companyAndPost && (
                            <p className="font-bold font-space text-white text-sm md:text-base text-center max-w-2xl">{currentReview.companyAndPost}</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex gap-4 mt-8 lg:hidden justify-center">
                    <button 
                      onClick={prevReviewSlide}
                      className="w-10 h-10 rounded-full bg-black/70 border border-gray-700 shadow-sm flex items-center justify-center hover:bg-black transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 text-gray-200" />
                    </button>
                    <button 
                      onClick={nextReviewSlide}
                      className="w-10 h-10 rounded-full bg-black/70 border border-gray-700 shadow-sm flex items-center justify-center hover:bg-black transition-colors"
                    >
                      <ArrowRight className="w-4 h-4 text-gray-200" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center mb-24 max-w-4xl mx-auto">No reviews available.</p>
        )}

        {/* CLIENTS SECTION */}
        <div className="mt-12 max-w-5xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-10">
            <h4 
              className="text-white font-bold tracking-widest text-sm md:text-base uppercase"
              style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}
            >
              CLIENTS WE'VE WORKED <span className="text-[#c77dff]">WITH</span>
            </h4>
            {isAuthenticated && (
              <button 
                onClick={() => {
                  setEditingClient(null);
                  setIsClientModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg transition-all text-xs"
              >
                <PlusCircle className="w-4 h-4" /> Add Client
              </button>
            )}
          </div>
          
          {clients.length > 0 ? (
            <div className="relative">
              {/* Clients Slider Controls */}
              {clients.length > 4 && (
                <>
                  <button 
                    onClick={prevClientSlide}
                    className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center shadow-md border border-white/10 hover:scale-110 hover:bg-black/90 transition-all text-white"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={nextClientSlide}
                    className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center shadow-md border border-white/10 hover:scale-110 hover:bg-black/90 transition-all text-white"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {displayClients.map((client, idx) => (
                    <motion.div 
                      key={client._id || idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center border border-white/10 shadow-xl hover:-translate-y-1 transition-all group relative min-h-[140px]"
                    >
                      {isAuthenticated && (
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                          <button 
                            onClick={() => {
                              setEditingClient(client);
                              setIsClientModalOpen(true);
                            }}
                            className="p-1.5 bg-white/10 hover:bg-white/20 text-gray-200 rounded-full transition-colors"
                            title="Edit Client"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClient(client._id)}
                            className="p-1.5 bg-red-500/20 hover:bg-red-500 hover:text-white text-red-400 rounded-full transition-colors"
                            title="Delete Client"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      <h5 className="font-bold font-space text-white text-center text-lg md:text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                        {client.name}
                      </h5>
                      {client.location && (
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest text-center">
                          {client.location}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center">No clients available.</p>
          )}
        </div>

      </div>

      <ReviewFormModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
        onSuccess={loadData}
        initialData={editingReview}
      />
      <ClientFormModal 
        isOpen={isClientModalOpen} 
        onClose={() => setIsClientModalOpen(false)} 
        onSuccess={loadData}
        initialData={editingClient}
      />
    </section>
  );
};
