
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import CursorEffect from './components/CursorEffect';
import SkipLink from './components/SkipLink';
import BrunoAssistance from './components/BrunoAssistance';
import BlogPage from './components/BlogPage';
import BlogPostDetail from './components/BlogPostDetail';
import Auth from './components/Auth';
import BlogAdminPanel from './components/BlogAdminPanel';
import UserLogin from './components/UserLogin';
import LatestBlogPost from './components/LatestBlogPost';

const App: React.FC = () => {
  return (
    <div className="bg-[#0A192F] text-slate-300 font-sans relative">
      <SkipLink />
      <ScrollProgress />
      <CursorEffect />
      <Router>
        <Navbar />
        <main className="container mx-auto px-6 md:px-10 lg:px-20" id="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Skills />
                <Projects />
                <Experience />
                <LatestBlogPost />
                <Contact />
              </>
            } />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="/blog-admin" element={<Auth />} />
            <Route path="/blog-admin/panel" element={<BlogAdminPanel />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </Router>
      <BrunoAssistance />
    </div>
  );
};

export default App;
