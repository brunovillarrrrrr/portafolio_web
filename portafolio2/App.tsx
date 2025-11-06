
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
import { Blog } from './components/Blog';
import Auth from './components/Auth';
import BlogPage from './components/BlogPage'; // Import BlogPage
import BlogPostDetail from './components/BlogPostDetail'; // Import BlogPostDetail

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
                <BlogPage /> {/* Render BlogPage here for the main section */} 
                <Contact />
              </>
            } />
            <Route path="/blog-admin" element={<Auth />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
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
