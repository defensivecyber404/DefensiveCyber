import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchPosts, deletePost, fetchExternalNews } from '../utils/blogStore';
import { ArrowRight, ArrowLeft, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PostFormModal } from '../components/admin/PostFormModal';

export const NewsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [posts, setPosts] = useState([]);
  
  // Admin modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const loadPosts = async () => {
    try {
      const dbPosts = await fetchPosts();
      const extNews = await fetchExternalNews('cybersecurity', 6);
      
      const newsFromDb = dbPosts.filter(p => p.type === 'news');
      // Sort combined array by date descending
      const combinedNews = [...newsFromDb, ...extNews].sort((a, b) => {
        const dateA = new Date(a.created_at || a.date || 0).getTime();
        const dateB = new Date(b.created_at || b.date || 0).getTime();
        return dateB - dateA;
      });
      
      setPosts(combinedNews);
    } catch (error) {
      console.error('Error loading posts', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news update?')) {
      try {
        await deletePost(id, token);
        loadPosts();
      } catch (err) {
        alert('Failed to delete post: ' + err.message);
      }
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

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

        <div className="text-center max-w-3xl mx-auto mb-8 pt-4 mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black uppercase mb-6 text-gray-900 drop-shadow-sm"
            style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}
          >
            <span className="text-gray-900 drop-shadow-sm">NEWS</span>
          </motion.h1>
        </div>

        {isAuthenticated && (
          <div className="flex justify-center mb-12">
            <button 
              onClick={handleAddNew}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg transition-all hover:-translate-y-1"
            >
              <PlusCircle className="w-5 h-5" />
              Post New News
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post._id || post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-transparent backdrop-blur-md flex flex-col h-full rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 border border-gray-900/20 shadow-lg relative"
            >
              {isAuthenticated && !post.isExternal && (
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button 
                    onClick={() => handleEdit(post)}
                    className="p-2 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow-sm backdrop-blur-sm transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(post._id || post.id)}
                    className="p-2 bg-white/80 hover:bg-red-500 hover:text-white text-red-500 rounded-full shadow-sm backdrop-blur-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="p-8 flex flex-col flex-grow text-left min-w-0 w-full">
                <h3 className="text-xl font-bold font-space text-gray-900 group-hover:text-primary transition-colors mb-4 drop-shadow-sm pr-16 break-all break-words">
                  {post.title}
                </h3>
                
                <p className="text-gray-800 text-sm leading-relaxed mb-6 flex-grow drop-shadow-sm break-all break-words whitespace-pre-wrap line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex justify-between items-center w-full">
                  {post.isExternal ? (
                    <a 
                      href={post.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-primary transition-colors cursor-pointer"
                    >
                      Read on Source 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <Link 
                      to={`/post/${post._id || post.id}`} 
                      state={{ from: '/news' }}
                      className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-primary transition-colors cursor-pointer"
                    >
                      Read More 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  <span 
                    className="text-xs font-bold text-gray-600 drop-shadow-sm"
                  >
                    {new Date(post.created_at || post.date || Date.now()).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <PostFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingPost}
        type="news"
        onSuccess={loadPosts}
      />
    </main>
  );
};
