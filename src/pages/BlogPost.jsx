import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchPostById } from '../utils/blogStore';
import { ArrowLeft, Calendar, BookOpen, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
    
    fetchPostById(id).then(foundPost => {
      if (foundPost) {
        setPost(foundPost);
      } else {
        // If post not found, navigate back to home
        navigate('/');
      }
    });
  }, [id, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden text-gray-900">
      

      <div className="container mx-auto px-6 relative z-10">
        <button 
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            setTimeout(() => {
              const el = document.getElementById('blog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }}
          className="absolute top-0 left-6 lg:left-12 group z-[60] flex items-center justify-center text-sm font-bold text-white hover:text-primary transition-all backdrop-blur-md bg-white/5 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 px-6 py-2.5 rounded-full w-max cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="max-w-3xl mx-auto mt-16">
          


          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10 shadow-xl"
          >
            {/* Subtle center purple glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(90,20,150,0.2) 0%, transparent 60%)' }} />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 mb-8 pb-8 border-b border-gray-900/20">
              <span className={`inline-flex px-4 py-1.5 text-sm font-bold uppercase tracking-wider rounded-full items-center justify-center gap-2 w-max ${
                post.type === 'news' 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                  : 'bg-primary/10 text-primary border border-primary/20'
              }`}>
                {post.type === 'news' ? <Radio className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                {post.type}
              </span>
              
              <div className="flex items-center text-gray-300 text-sm drop-shadow-sm">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold font-space text-white mb-8 leading-tight drop-shadow-md">
              {post.title}
            </h1>

            <div className="prose prose-lg prose-invert max-w-none text-gray-200 leading-relaxed drop-shadow-sm">
              {/* Splitting content by newlines to render paragraphs */}
              {post.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-6 break-words whitespace-pre-wrap">{paragraph}</p>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};
