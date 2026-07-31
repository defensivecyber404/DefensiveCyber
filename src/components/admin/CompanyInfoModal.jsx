import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import { updateCompanyInfo } from '../../utils/blogStore';
import { useAuth } from '../../contexts/AuthContext';

export const CompanyInfoModal = ({ isOpen, onClose, companyInfo, onSaveSuccess }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    emails: companyInfo?.emails || [],
    phones: companyInfo?.phones || [],
    locations: companyInfo?.locations || []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        emails: companyInfo?.emails || [],
        phones: companyInfo?.phones || [],
        locations: companyInfo?.locations || []
      });
    }
  }, [isOpen, companyInfo]);

  if (!isOpen) return null;

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleAddField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const handleRemoveField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      // Filter out empty strings
      const cleanedData = {
        emails: formData.emails.filter(e => e.trim() !== ''),
        phones: formData.phones.filter(p => p.trim() !== ''),
        locations: formData.locations.filter(l => l.trim() !== '')
      };
      
      const updatedInfo = await updateCompanyInfo(cleanedData, token);
      onSaveSuccess(updatedInfo);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update company info');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFieldSection = (title, field, placeholder) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-200">{title}</label>
        <button
          type="button"
          onClick={() => handleAddField(field)}
          className="text-primary hover:text-primary/80 flex items-center text-xs font-bold"
        >
          <Plus className="w-3 h-3 mr-1" /> Add
        </button>
      </div>
      {formData[field].map((item, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(field, index, e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder={placeholder}
            required
          />
          <button
            type="button"
            onClick={() => handleRemoveField(field, index)}
            className="p-2 text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      {formData[field].length === 0 && (
        <p className="text-xs text-gray-400 italic">No {title.toLowerCase()} added.</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-black/90 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white font-space">Edit Contact Info</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {renderFieldSection('Emails', 'emails', 'company@example.com')}
          {renderFieldSection('Phone Numbers', 'phones', '+1 234 567 8900')}
          {renderFieldSection('Locations', 'locations', 'City, Country')}

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
