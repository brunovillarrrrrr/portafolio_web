import React from 'react';
import { Project } from '../types';
import { GithubIcon } from './icons/SocialIcons';
import { ExternalLinkIcon } from './icons/ProjectIcons';

interface ProjectCardProps {
  project: Project;
  isReversed?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isReversed = false }) => {
  const textAlign = isReversed ? 'lg:text-right' : 'text-left';
  const tagAlign = isReversed ? 'lg:justify-end' : '';
  const linkAlign = isReversed ? 'lg:justify-end' : '';
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
      {/* Detalles del Proyecto */}
      <div className={`lg:col-span-7 p-8 bg-[#112240] rounded-lg shadow-lg hover:shadow-cyan-400/20 z-10 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className={textAlign}>
          <p className="text-cyan-400 mb-2 text-sm font-mono">Proyecto Destacado</p>
          <h3 className="text-2xl font-bold text-slate-100 mb-4 group-hover:text-cyan-400 transition-colors duration-300">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="focus:outline-none focus:text-cyan-400">{project.title}</a>
          </h3>
        </div>
        <div className="mb-4">
          <p className="text-slate-300">{project.description}</p>
        </div>
        <ul className={`flex flex-wrap gap-x-4 gap-y-2 mb-6 ${tagAlign}`}>
          {project.tags.map(tag => (
            <li key={tag} className="text-sm font-mono text-slate-400">{tag}</li>
          ))}
        </ul>
        <div className={`flex items-center space-x-4 ${linkAlign}`}>
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:text-cyan-400" aria-label={`Repositorio de ${project.title} en Github`}>
              <GithubIcon />
            </a>
          )}
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:text-cyan-400" aria-label={`Ver ${project.title} en vivo`}>
            <ExternalLinkIcon />
          </a>
        </div>
      </div>
      {/* Imagen del Proyecto */}
      <div className={`lg:col-span-5 h-80 rounded-lg bg-cyan-800/50 overflow-hidden ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block h-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A192F] rounded-lg">
              <img
                src={project.imageUrl || `https://picsum.photos/seed/${project.id}/600/400`}
                alt={`Vista previa del proyecto ${project.title}`}
                className="w-full h-full object-cover rounded-lg mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500 group-hover:scale-110"
                onError={(e) => {
                  // Fallback a picsum si la imagen personalizada falla
                  const target = e.target as HTMLImageElement;
                  target.src = `https://picsum.photos/seed/${project.id}/600/400`;
                }}
              />
          </a>
      </div>
    </div>
  );
};

export default ProjectCard;