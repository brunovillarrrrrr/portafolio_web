import React from 'react';
import { EXPERIENCE_DATA } from '../constants';
import ExperienceTimelineItem from './ExperienceTimelineItem';
import FadeIn from './FadeIn';
import SectionTitle from './SectionTitle';

const Experience: React.FC = () => {
  return (
    <section id="experiencia" className="py-24">
      <FadeIn>
        <SectionTitle number="03" title="Experiencia y Liderazgo" className="justify-center md:justify-start mb-16" />
      </FadeIn>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-slate-700 via-cyan-400/30 to-slate-700" aria-hidden="true"></div>
        {EXPERIENCE_DATA.map((item, index) => (
          <FadeIn key={item.id} delay={index === 0 ? 'delay-100' : index === 1 ? 'delay-200' : 'delay-300'}>
            <ExperienceTimelineItem item={item} isOdd={index % 2 !== 0} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default Experience;