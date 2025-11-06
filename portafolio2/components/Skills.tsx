import React from 'react';
import { SKILLS_DATA } from '../constants';
import { CodeIcon, DatabaseIcon, CloudIcon, MonitorIcon } from './icons/SkillIcons';
import SkillCard from './SkillCard';
import FadeIn from './FadeIn';
import SectionTitle from './SectionTitle';

const iconMap: { [key: string]: React.ReactNode } = {
  'Lenguajes': <CodeIcon />,
  'Frontend': <MonitorIcon />,
  'Backend y Bases de Datos': <DatabaseIcon />,
  'Cloud y Herramientas': <CloudIcon />,
};

const Skills: React.FC = () => {
  const delays = ['delay-0', 'delay-150', 'delay-300', 'delay-500'];
  return (
    <section id="habilidades" className="py-24">
      <FadeIn>
        <SectionTitle number="01" title="Habilidades Técnicas" className="justify-center md:justify-start" />
      </FadeIn>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {SKILLS_DATA.map((category, index) => (
          <FadeIn key={category.title} delay={delays[index % delays.length]}>
            <SkillCard category={category} icon={iconMap[category.title]} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default Skills;