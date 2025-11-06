import React from 'react';
import { SkillCategory } from '../types';

interface SkillCardProps {
  category: SkillCategory;
  icon: React.ReactNode;
}

const SkillCard: React.FC<SkillCardProps> = ({ category, icon }) => {
  return (
    <div className="bg-[#112240] h-full p-6 rounded-lg shadow-lg hover:shadow-cyan-400/20 border border-slate-700 hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="flex items-center mb-4">
        <div className="text-cyan-400 mr-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">{icon}</div>
        <h3 className="text-xl font-bold text-slate-200 group-hover:text-cyan-400 transition-colors duration-300">{category.title}</h3>
      </div>
      <ul className="space-y-2">
        {category.skills.map((skill) => (
          <li key={skill.name} className="flex items-center text-slate-300 hover:text-cyan-400 transition-colors duration-200">
            <span className="text-cyan-400 mr-2">▹</span>
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCard;
