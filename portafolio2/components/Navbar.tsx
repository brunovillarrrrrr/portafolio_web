import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons';
import { useAuth } from '../hooks/useAuth';
import { isAuthorizedAdmin } from '../config/adminConfig';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('sobre');
  const { user } = useAuth();

  const navLinks = [
    { href: '#sobre', label: 'Sobre', id: 'sobre' },
    { href: '#habilidades', label: 'Habilidades', id: 'habilidades' },
    { href: '#proyectos', label: 'Proyectos', id: 'proyectos' },
    { href: '#experiencia', label: 'Experiencia', id: 'experiencia' },
    { href: '#contacto', label: 'Contacto', id: 'contacto' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach(link => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0A192F]/80 backdrop-blur-sm">
      <nav className="container mx-auto px-6 md:px-10 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-cyan-400 border-2 border-cyan-400 px-2 py-1 hover:bg-cyan-400 hover:text-[#0A192F] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A192F]">
            BV
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-slate-300 hover:text-cyan-400 transition-colors duration-300 focus:outline-none focus:text-cyan-400 ${
                  activeSection === link.id ? 'text-cyan-400' : ''
                }`}
              >
                <span className="text-cyan-400">0{index + 1}.</span> {link.label}
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="border border-cyan-400 text-cyan-400 px-4 py-2 rounded-md hover:bg-cyan-400 hover:text-[#0A192F] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A192F]">
              Resume
            </a>

            {/* Login Button - Estilo Urbi */}
            {user ? (
              isAuthorizedAdmin(user.email) ? (
                <Link
                  to="/blog-admin"
                  className="flex items-center gap-2 bg-cyan-400/10 border border-cyan-400 text-cyan-400 px-4 py-2 rounded-md hover:bg-cyan-400 hover:text-[#0A192F] transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin
                </Link>
              ) : (
                <Link
                  to="/blog"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-400/50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Mi Blog
                </Link>
              )
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-400/50 hover:scale-105"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 focus:outline-none" aria-label={isOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isOpen}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col items-center space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-slate-300 hover:text-cyan-400 transition-colors duration-300 text-lg focus:outline-none focus:text-cyan-400 ${
                    activeSection === link.id ? 'text-cyan-400' : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="border border-cyan-400 text-cyan-400 px-6 py-2 rounded-md hover:bg-cyan-400 hover:text-[#0A192F] transition-all duration-300">
                Resume
              </a>

              {/* Admin / Login Button Mobile */}
              {user ? (
                isAuthorizedAdmin(user.email) ? (
                  <Link
                    to="/blog-admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 bg-cyan-400/10 border border-cyan-400 text-cyan-400 px-6 py-2 rounded-md hover:bg-cyan-400 hover:text-[#0A192F] transition-all duration-300 w-auto"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin
                  </Link>
                ) : (
                  <Link
                    to="/blog"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-6 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-400/50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Mi Blog
                  </Link>
                )
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-400/50"
                >
                  Iniciar Sesión
                </Link>
              )}

              <div className="flex space-x-4 mt-4">
                <a href="https://github.com/brunovillarrrrrr" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400" aria-label="Perfil de Github"><GithubIcon /></a>
                <a href="https://www.linkedin.com/in/bruno-villarreal-26b118267" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400" aria-label="Perfil de LinkedIn"><LinkedinIcon /></a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;