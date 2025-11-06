import React from 'react';
import { ExperienceItem } from '../types';
import { BriefcaseIcon } from './icons/ExperienceIcons';

interface ExperienceTimelineItemProps {
  item: ExperienceItem;
  isOdd: boolean;
}

const ExperienceTimelineItem: React.FC<ExperienceTimelineItemProps> = ({ item, isOdd }) => {
  const alignmentClass = isOdd ? 'pl-8 text-left' : 'pr-8 text-right';

  return (
    <div className="relative mb-12 group">
      <div className="flex items-center">
        <div className={`flex-1 ${alignmentClass}`}>
          {/* Content Card con icono integrado */}
          <div className="bg-[#112240] p-6 rounded-lg shadow-lg hover:shadow-cyan-400/20 border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 group-hover:bg-[#112240]/80">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400/20 to-cyan-400/5 border border-cyan-400/30 flex items-center justify-center group-hover:border-cyan-400/50 transition-all duration-300">
                <BriefcaseIcon />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-slate-200 group-hover:text-cyan-400 transition-colors duration-300">{item.role}</p>
                <p className="text-cyan-400 font-medium text-sm">{item.company}</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimelineItem;
