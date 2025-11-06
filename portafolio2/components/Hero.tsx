import React from 'react';
import FadeIn from './FadeIn';

const Hero: React.FC = () => {
  return (
    <section id="sobre" className="min-h-screen flex flex-col justify-center py-20">
      <FadeIn delay="delay-100">
        <p className="text-cyan-400 mb-4 text-base md:text-lg font-mono">👋 Hola, soy</p>
      </FadeIn>
      <FadeIn delay="delay-200">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 leading-tight">
          Bruno Villarreal Leija.
        </h1>
      </FadeIn>
      <FadeIn delay="delay-300">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-400 mt-2 leading-tight">
          Construyo soluciones para la web.
        </h2>
      </FadeIn>
      <FadeIn delay="delay-400">
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
          Soy un desarrollador de software y especialista Full-Stack apasionado por crear experiencias digitales excepcionales. Actualmente, me enfoco en el desarrollo de productos accesibles y centrados en el usuario, utilizando arquitecturas cloud.
        </p>
      </FadeIn>
      <FadeIn delay="delay-500">
        <div className="mt-8">
          <a
            href="#contacto"
            className="inline-block border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-md text-lg font-medium hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A192F] hover:-translate-y-1"
          >
            Contactar
          </a>
        </div>
      </FadeIn>
    </section>
  );
};

export default Hero;