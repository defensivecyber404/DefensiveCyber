import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchPosts, fetchExternalNews } from '../../utils/blogStore';
import { Calendar, ArrowRight, BookOpen, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadHomepagePosts = async () => {
      try {
        const allPosts = await fetchPosts();
        let newsPost = allPosts.find(p => p.type === 'news');
        const blogPost = allPosts.find(p => p.type === 'blog');

        // Fetch external news to feature on homepage
        const extNews = await fetchExternalNews('cybersecurity', 1);
        if (extNews && extNews.length > 0) {
          newsPost = extNews[0]; // Override with external news if available
        }

        setPosts([newsPost, blogPost].filter(Boolean));
      } catch (err) {
        console.error('Failed to load homepage posts', err);
      }
    };
    
    loadHomepagePosts();
  }, []);

  return (
    <section id="blog" className="py-24 relative z-10 bg-transparent">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-[-1] opacity-100"
        style={{
          backgroundImage: "url('/backgroundImage3.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(1.2)'
        }}
      />
      <div className="container mx-auto px-6">
        <div className="relative mb-16 z-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold font-sans tracking-tight mb-6 text-[#0F172A]">
              Stay Up To <span className="text-primary">Date</span>
            </h2>
            <p className="text-white font-medium text-lg drop-shadow-md">
              The latest insights, news, and updates from the cybersecurity frontlines.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post, index) => (
            <motion.div
              key={post._id || post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col h-full"
            >
                <h3 
                  className="text-3xl md:text-4xl font-black uppercase text-[#0F172A] mb-6 text-center"
                  style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}
                >
                  {post.type}
                </h3>
                <motion.div
                  className="group flex flex-col flex-grow rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] bg-black/60 dark:bg-black/60 backdrop-blur-2xl"
                >
                  <div className="p-8 flex flex-col flex-grow text-center min-w-0 w-full">
                    <h3 className="text-xl font-bold font-space text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-3 break-all break-words">
                      {post.title}
                    </h3>
                    
                    <p className="text-white text-sm leading-relaxed mb-6 flex-grow break-all break-words whitespace-pre-wrap line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto">
                      {post.isExternal ? (
                        <a 
                          href={post.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-bold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
                        >
                          Read on Source 
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                      ) : (
                        <Link 
                          to={`/post/${post._id || post.id}`} 
                          state={{ from: '/#blog' }}
                          onClick={() => window.scrollTo(0, 0)}
                          className="inline-flex items-center text-sm font-bold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
                        >
                          Read More 
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
                <div className="mt-8 flex justify-center">
                  <Link 
                    to={post.type === 'news' ? '/news' : '/blogs'} 
                    className="flex w-fit px-8 py-3 rounded-full backdrop-blur-md border border-white/20 bg-[#0F172A] shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-white font-bold items-center justify-center gap-2 hover:bg-white hover:text-[#0F172A] transition-colors"
                  >
                    View More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
