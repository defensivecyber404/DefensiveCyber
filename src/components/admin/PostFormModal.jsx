import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPost, updatePost } from '../../utils/blogStore';
import { useAuth } from '../../contexts/AuthContext';
import JoditEditor from 'jodit-react';

export const PostFormModal = ({ isOpen, onClose, initialData, type, onSuccess }) => {
  const { token } = useAuth();
  const isEditing = !!initialData;
  const editor = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    type: type || 'blog',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || '',
          excerpt: initialData.excerpt || '',
          content: initialData.content || '',
          type: initialData.type || type || 'blog'
        });
      } else {
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          type: type || 'blog',
        });
      }
      setError('');
    }
  }, [isOpen, initialData, type]);

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

  const config = useMemo(() => ({
    readonly: false, 
    placeholder: 'Write your full post content here...',
    uploader: {
      url: '/api/upload',
      format: 'json',
      method: 'POST',
      error: function(e) {
        console.log("Upload error", e);
      }
    },
    image: {
      editSrc: false,
      editTitle: true,
      editAlt: true,
      editLink: true,
      editSize: true,
      editBorderRadius: true,
      editMargins: true,
      editAlign: true,
      editClass: true,
      editStyle: true,
    },
    height: 400
  }), []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditorChange = (newContent) => {
    setFormData(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      if (isEditing) {
        await updatePost(initialData._id || initialData.id, formData, token);
      } else {
        await createPost(formData, token);
      }
      setIsSubmitting(false);
      onSuccess();
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError('Failed to save post: ' + err.message);
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
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold font-space text-gray-900 dark:text-white">
              {isEditing ? 'Edit Post' : `Create New ${type === 'news' ? 'News' : 'Blog'}`}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
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

            <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="hidden">
                <input type="hidden" name="type" value={formData.type} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  required
                  value={formData.title} 
                  onChange={handleChange}
                  placeholder="Enter post title"
                  className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 shadow-sm rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short Excerpt</label>
                <textarea 
                  name="excerpt" 
                  rows="2"
                  required
                  value={formData.excerpt} 
                  onChange={handleChange}
                  placeholder="Brief summary for the card view"
                  className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 shadow-sm rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Content</label>
                <div className="bg-white dark:bg-gray-950 text-gray-900 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-800">
                  <JoditEditor
                    ref={editor}
                    value={formData.content}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => handleEditorChange(newContent)}
                    onChange={newContent => {}} // Preferred to use onBlur for performance reasons, but we can do both if needed
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-4 bg-gray-50 dark:bg-gray-900/50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="post-form"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Post' : 'Publish Post')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
