import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Code-split non-critical routes to optimize initial bundle size & LCP
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const NewsPage = lazy(() => import('./pages/NewsPage').then(m => ({ default: m.NewsPage })));
const AdminBlog = lazy(() => import('./pages/AdminBlog').then(m => ({ default: m.AdminBlog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const PrivacyTermsPage = lazy(() => import('./pages/PrivacyTermsPage').then(m => ({ default: m.PrivacyTermsPage })));
const ServiceDetailsPage = lazy(() => import('./pages/ServiceDetailsPage').then(m => ({ default: m.ServiceDetailsPage })));

function App() {

  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="relative min-h-screen text-[var(--text-base)] font-sans selection:bg-purple-600/30 selection:text-white transition-colors duration-300">
            {/* Ambient Background Layer */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
              <AnimatedBackground />
            </div>

            {/* Page Content Layer */}
            <div className="relative z-10 flex flex-col min-h-screen">
              <header>
                <Navbar />
              </header>
            
              <main className="flex-grow">
                <Suspense fallback={
                  <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)]">
                    <div className="w-6 h-6 border-2 border-[var(--text-heading)] border-t-transparent animate-spin" />
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blogs" element={<BlogPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/secure-admin" element={<AdminBlog />} />
                    <Route path="/post/:id" element={<BlogPost />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/legal" element={<PrivacyTermsPage />} />
                    <Route path="/service/:id" element={<ServiceDetailsPage />} />
                  </Routes>
                </Suspense>
              </main>

              <footer>
                <Footer />
              </footer>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
