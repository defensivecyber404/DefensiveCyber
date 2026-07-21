import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AdminBlog = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // If already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginData.username, loginData.password);
      // login sets isAuthenticated which triggers the useEffect redirect
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

  return (
    <main className="pt-32 pb-24 relative min-h-screen bg-transparent text-[#0F172A] flex flex-col justify-center">
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
        <div className="mb-8 w-full max-w-md mx-auto">
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
      </div>
    </main>
  );
};
