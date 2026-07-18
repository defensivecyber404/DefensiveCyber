import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchPosts } from '../utils/blogStore';
import { Calendar, ArrowRight, BookOpen, Radio, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const BlogPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts().then(data => setPosts(data.filter(p => p.type === 'blog')));
  }, []);

  return (
    <main className="pt-24 pb-24 relative min-h-screen text-gray-900">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: "url('/backgroundImageNewsBlog.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />
      
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
          className="absolute top-0 left-6 lg:left-12 group z-50 flex items-center justify-center text-sm font-bold text-gray-900 hover:text-primary transition-all backdrop-blur-md bg-transparent border border-gray-900/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-gray-900/5 px-6 py-2.5 rounded-full w-max cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="text-center max-w-3xl mx-auto mb-16 pt-4 mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black uppercase mb-6 text-gray-900 drop-shadow-sm"
            style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}
          >
            <span className="text-gray-900 drop-shadow-sm">BLOG</span>
          </motion.h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-transparent backdrop-blur-md flex flex-col h-full rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 border border-gray-900/20 shadow-lg"
            >
              <div className="p-8 flex flex-col flex-grow text-left">
                <h3 className="text-xl font-bold font-space text-gray-900 group-hover:text-primary transition-colors mb-4 drop-shadow-sm">
                  {post.title}
                </h3>
                
                <p className="text-gray-800 text-sm leading-relaxed mb-6 flex-grow drop-shadow-sm">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex justify-between items-center w-full">
                  <Link 
                    to={`/post/${post.id}`} 
                    state={{ from: '/blogs' }}
                    className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-primary transition-colors cursor-pointer"
                  >
                    Read More 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span 
                    className="text-xs font-bold text-gray-600 drop-shadow-sm"
                  >
                    {new Date(post.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};
