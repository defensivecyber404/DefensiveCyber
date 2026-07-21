import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { BlogPage } from './pages/BlogPage';
import { NewsPage } from './pages/NewsPage';
import { AdminBlog } from './pages/AdminBlog';
import { BlogPost } from './pages/BlogPost';
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyTermsPage } from './pages/PrivacyTermsPage';
import { CustomCursor } from './components/ui/CustomCursor';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="relative min-h-screen text-gray-800 dark:text-gray-200 font-sans selection:bg-primary/30 selection:text-gray-900 dark:selection:text-white">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/secure-admin" element={<AdminBlog />} />
            <Route path="/post/:id" element={<BlogPost />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/legal" element={<PrivacyTermsPage />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
