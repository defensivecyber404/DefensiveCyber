import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createService, updateService } from '../../utils/blogStore';
import { useAuth } from '../../contexts/AuthContext';

const AVAILABLE_ICONS = [
  'Search', 'Radar', 'AlertTriangle', 'Bug', 'Shield', 
  'Activity', 'Lock', 'Key', 'Eye', 'Server', 'Code', 'Terminal'
];

export const ServiceFormModal = ({ isOpen, onClose, onSuccess, initialData }) => {
  const { token } = useAuth();
  const isEditing = !!initialData;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    icon: 'Search'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || '',
          description: initialData.description || '',
          fullDescription: initialData.fullDescription || '',
          icon: initialData.icon || 'Search'
        });
      } else {
        setFormData({ 
          title: '', 
          description: '', 
          fullDescription: '', 
          icon: 'Search' 
        });
      }
      setError('');
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.fullDescription) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      if (isEditing && initialData._id) {
        await updateService(initialData._id, formData, token);
      } else {
        await createService(formData, token);
      }
      setIsSubmitting(false);
      onSuccess();
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError('Failed to save service: ' + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold font-space text-white">
              {isEditing ? 'Edit Service' : 'Add New Service'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-gray-800 z-50 relative"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            <form id="service-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Service Title</label>
                <input 
                  type="text" 
                  name="title" 
                  required
                  value={formData.title} 
                  onChange={handleChange}
                  placeholder="e.g., Penetration Testing"
                  className="w-full bg-gray-950 border border-gray-800 shadow-sm rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Short Description (for Cards)</label>
                <textarea 
                  name="description" 
                  required
                  rows="2"
                  value={formData.description} 
                  onChange={handleChange}
                  placeholder="Brief summary of the service..."
                  className="w-full bg-gray-950 border border-gray-800 shadow-sm rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Description (for Service Details Page)</label>
                <textarea 
                  name="fullDescription" 
                  required
                  rows="6"
                  value={formData.fullDescription} 
                  onChange={handleChange}
                  placeholder="Detailed explanation of the service..."
                  className="w-full bg-gray-950 border border-gray-800 shadow-sm rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors whitespace-pre-wrap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full bg-gray-950 border border-gray-800 shadow-sm rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors appearance-none"
                >
                  {AVAILABLE_ICONS.map(iconName => (
                    <option key={iconName} value={iconName}>{iconName}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">Select an icon to represent this service.</p>
              </div>
            </form>
          </div>

          <div className="p-6 border-t border-gray-800 flex justify-end gap-4 bg-gray-900/50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-gray-700 font-medium text-gray-300 hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="service-form"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Service' : 'Add Service')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
