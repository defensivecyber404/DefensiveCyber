import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, loginAdmin } from '../utils/blogStore';
import { Shield, ArrowLeft, Lock } from 'lucide-react';

export const AdminBlog = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    type: 'blog',
  });
  const [success, setSuccess] = useState(false);

  const [token, setToken] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAdmin(loginData.username, loginData.password);
      setToken(data.token);
      setIsAuthenticated(true);
      setLoginError('');
    } catch (err) {
      setLoginError(err.message || 'Invalid username or password');
    }
  };

  const handleLoginChange = (e) => {
    setLoginData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    
    try {
      await createPost(formData, token);
      setSuccess(true);
      setFormData({ title: '', excerpt: '', content: '', type: 'blog' });
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      alert('Failed to publish post: ' + err.message);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="pt-32 pb-24 relative min-h-screen bg-transparent text-[#0F172A]">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: "url('/backgroundImageAboutUs.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {!isAuthenticated ? (
          <>
            <div className="mb-8 w-full">
              <button 
                onClick={() => navigate('/')}
                className="group flex items-center justify-center text-sm font-bold text-[#0F172A] hover:text-primary transition-all backdrop-blur-md bg-transparent border border-[#0F172A]/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-[#0F172A]/5 px-6 py-2.5 rounded-full w-max cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </button>
            </div>
            
            <div className="w-full max-w-md mx-auto">
              <div className="p-8 rounded-2xl border border-[#0F172A]/20 bg-transparent backdrop-blur-md shadow-xl">
                <div className="flex flex-col items-center mb-8 text-center">
                  <div className="p-4 bg-[#0F172A]/5 rounded-full mb-4">
                    <Lock className="w-8 h-8 text-[#0F172A]" />
                  </div>
                  <h1 className="text-2xl font-normal uppercase text-[#0F172A]" style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}>
                    Admin Portal
                  </h1>
                  <p className="text-sm text-[#0F172A]/70 mt-2 font-medium">Enter your credentials to access the dashboard</p>
                </div>

                {loginError && (
                  <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg text-sm font-medium text-center">
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-normal text-[#0F172A] mb-2 font-space">Email</label>
                    <input 
                      type="text" 
                      name="username" 
                      required
                      value={loginData.username} 
                      onChange={handleLoginChange}
                      placeholder="Enter email"
                      className="w-full bg-transparent border border-[#0F172A]/30 shadow-sm rounded-lg px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-[#0F172A] mb-2 font-space">Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      required
                      value={loginData.password} 
                      onChange={handleLoginChange}
                      placeholder="Enter password"
                      className="w-full bg-transparent border border-[#0F172A]/30 shadow-sm rounded-lg px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full cyber-button-solid !rounded-full mt-4"
                  >
                    <span className="relative z-10">LOGIN</span>
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8 w-full">
              <button 
                onClick={() => {
                  setIsAuthenticated(false);
                  setToken(null);
                }}
                className="group flex items-center justify-center text-sm font-bold text-[#0F172A] hover:text-primary transition-all backdrop-blur-md bg-transparent border border-[#0F172A]/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-[#0F172A]/5 px-6 py-2.5 rounded-full w-max cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Logout
              </button>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="glass-panel p-8 md:p-12 rounded-2xl border border-white/50 bg-white/40 backdrop-blur-xl shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold font-space text-[#0F172A]">Admin Dashboard</h1>
                    <p className="text-sm text-[#0F172A]/70">Post new blogs or news updates.</p>
                  </div>
                </div>

                {success && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-700 rounded-lg text-sm font-medium">
                    Post successfully published!
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Post Type</label>
                      <select 
                        name="type" 
                        value={formData.type} 
                        onChange={handleChange}
                        className="w-full bg-white/60 border border-white/50 shadow-sm rounded-lg px-4 py-3 text-[#0F172A] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
                      >
                        <option value="blog" className="text-black">Blog Post</option>
                        <option value="news" className="text-black">News Update</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">Title</label>
                    <input 
                      type="text" 
                      name="title" 
                      required
                      value={formData.title} 
                      onChange={handleChange}
                      placeholder="Enter post title"
                      className="w-full bg-white/60 border border-white/50 shadow-sm rounded-lg px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">Short Excerpt</label>
                    <textarea 
                      name="excerpt" 
                      rows="2"
                      required
                      value={formData.excerpt} 
                      onChange={handleChange}
                      placeholder="Brief summary for the card view"
                      className="w-full bg-white/60 border border-white/50 shadow-sm rounded-lg px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">Full Content</label>
                    <textarea 
                      name="content" 
                      rows="8"
                      required
                      value={formData.content} 
                      onChange={handleChange}
                      placeholder="Write your full post content here..."
                      className="w-full bg-white/60 border border-white/50 shadow-sm rounded-lg px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full cyber-button-solid !rounded-full mt-4"
                  >
                    <span className="relative z-10">Publish Post</span>
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
