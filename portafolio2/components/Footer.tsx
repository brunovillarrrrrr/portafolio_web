import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A192F] border-t border-slate-800 py-12">
      <div className="container mx-auto px-6 md:px-10 lg:px-20 text-center text-slate-400">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Columna 1: Info Personal */}
            <div className="text-center md:text-left">
                <h4 className="font-bold text-xl text-slate-100 mb-2">Bruno Villarreal</h4>
                <p className="text-sm text-slate-400 mb-1">Software Developer & Full-Stack Specialist</p>
                <p className="text-xs text-slate-500">Saltillo, Coahuila, México</p>
            </div>

            {/* Columna 2: Enlaces rápidos */}
            <div className="text-center">
                <h5 className="font-bold text-sm text-slate-300 mb-3">Enlaces Rápidos</h5>
                <nav className="flex flex-col space-y-2">
                    <a href="#sobre" className="text-sm hover:text-cyan-400 transition-colors duration-200">Sobre</a>
                    <a href="#habilidades" className="text-sm hover:text-cyan-400 transition-colors duration-200">Habilidades</a>
                    <a href="#proyectos" className="text-sm hover:text-cyan-400 transition-colors duration-200">Proyectos</a>
                    <a href="#contacto" className="text-sm hover:text-cyan-400 transition-colors duration-200">Contacto</a>
                </nav>
            </div>

            {/* Columna 3: Redes Sociales */}
            <div className="text-center md:text-right">
                <h5 className="font-bold text-sm text-slate-300 mb-3">Conecta Conmigo</h5>
                <div className="flex justify-center md:justify-end space-x-6 mb-3">
                    <a href="https://github.com/brunovillarrrrrr" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:text-cyan-400" aria-label="Perfil de Github"><GithubIcon /></a>
                    <a href="https://www.linkedin.com/in/bruno-villarreal-26b118267" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:text-cyan-400" aria-label="Perfil de LinkedIn"><LinkedinIcon /></a>
                </div>
                <a href="mailto:brunovillarreal@kimal.tech" className="text-sm hover:text-cyan-400 transition-colors duration-200">brunovillarreal@kimal.tech</a>
            </div>
        </div>

        <div className="pt-8 border-t border-slate-800">
            <p className="text-sm mb-2">Diseñado y desarrollado con <span className="text-cyan-400 font-medium">React</span>, <span className="text-cyan-400 font-medium">TypeScript</span> & <span className="text-cyan-400 font-medium">Tailwind CSS</span></p>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Bruno Villarreal Leija. Todos los derechos reservados. · <Link to="/blog-admin" className="text-slate-500 hover:text-slate-400 transition-colors">Admin</Link>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;