import React from 'react';

interface SectionTitleProps {
  number: string;
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ number, title, className = '' }) => {
  return (
    <div className={`flex items-center gap-4 mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 whitespace-nowrap">
        <span className="text-cyan-400 font-mono text-2xl md:text-3xl">{number}.</span> {title}
      </h2>
      <div className="h-px bg-slate-700 flex-grow max-w-xs"></div>
    </div>
  );
};

export default SectionTitle;
