import React from 'react';
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons';
import FadeIn from './FadeIn';
import SectionTitle from './SectionTitle';

const Contact: React.FC = () => {
  return (
    <section id="contacto" className="py-24 text-center px-4">
      <FadeIn>
        <SectionTitle number="04" title="Hablemos" className="justify-center mb-4" />

        <p className="max-w-xl mx-auto text-base md:text-lg text-slate-300 mb-8 leading-relaxed">
          Actualmente estoy abierto a nuevas oportunidades. Si tienes un proyecto en mente, una idea o simplemente quieres saludar, ¡me encantaría escucharte!
        </p>
        <a
          href="mailto:brunovillarreal@kimal.tech"
          className="inline-block border-2 border-cyan-400 text-cyan-400 text-lg md:text-xl font-bold px-8 md:px-10 py-4 md:py-5 rounded-lg hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 mb-12 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A192F] hover:-translate-y-1"
        >
          Ponerse en Contacto
        </a>
        <div className="flex justify-center space-x-6">
          <a href="https://github.com/brunovillarrrrrr" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:text-cyan-400" aria-label="Perfil de Github">
            <GithubIcon size={28} />
          </a>
          <a href="https://www.linkedin.com/in/bruno-villarreal-26b118267" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:text-cyan-400" aria-label="Perfil de LinkedIn">
            <LinkedinIcon size={28} />
          </a>
        </div>
      </FadeIn>
    </section>
  );
};

export default Contact;