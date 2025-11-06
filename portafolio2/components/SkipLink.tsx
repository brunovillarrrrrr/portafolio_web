import React from 'react';

const SkipLink: React.FC = () => {
  return (
    <a
      href="#sobre"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-cyan-400 text-[#0A192F] px-6 py-3 rounded-md font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A192F]"
    >
      Saltar al contenido principal
    </a>
  );
};

export default SkipLink;
