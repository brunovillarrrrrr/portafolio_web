
import React from 'react';
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

const App: React.FC = () => {
  return (
    <div className="bg-[#0A192F] text-slate-300 font-sans relative">
      <SkipLink />
      <ScrollProgress />
      <CursorEffect />
      <Navbar />
      <main className="container mx-auto px-6 md:px-10 lg:px-20" id="main-content">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <BrunoAssistance />
    </div>
  );
};

export default App;
