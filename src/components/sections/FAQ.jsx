import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';
import { Edit, Trash2, Plus } from 'lucide-react';
import { fetchFaqs, deleteFaq } from '../../utils/faqStore';
import { FaqFormModal } from '../ui/FaqFormModal';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const { isAuthenticated, token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const loadFaqs = async () => {
    const data = await fetchFaqs();
    setFaqs(data);
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await deleteFaq(id, token);
        loadFaqs();
      } catch (err) {
        console.error('Failed to delete FAQ', err);
      }
    }
  };

  return (
    <section id="faq" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-6 text-white drop-shadow-md"
            style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}
          >
            FREQUENTLY ASKED <span className="text-[#c77dff]">QUESTIONS</span>
          </h2>
          <p className="text-gray-300 drop-shadow-sm">
            Clear answers to common questions about our security services.
          </p>
          {isAuthenticated && (
            <div className="mt-8">
              <button 
                onClick={() => { setEditingFaq(null); setIsModalOpen(true); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-colors border border-white/20 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add New FAQ
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl overflow-hidden transition-colors duration-300 ${openIndex === index ? 'border-[#c77dff]/50 bg-white/10' : ''}`}
            >
                <button
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className={`font-space font-semibold pr-8 ${openIndex === index ? 'text-[#c77dff]' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <div className="flex items-center gap-2">
                    {isAuthenticated && (
                      <div className="flex gap-2 mr-2" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleEdit(faq)} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(faq._id || faq.id)} className="p-2 bg-white/10 hover:bg-red-500 hover:text-white text-red-400 rounded-full transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <ChevronDown 
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-[#c77dff]' : 'text-gray-400'}`} 
                    />
                  </div>
                </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-300 leading-relaxed border-t border-white/10">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <FaqFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingFaq}
        onSuccess={loadFaqs}
      />
    </section>
  );
};
