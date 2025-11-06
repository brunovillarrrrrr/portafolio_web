import React, { useState, useMemo } from 'react';
import { PROJECTS_DATA } from '../constants';
import ProjectCard from './ProjectCard';
import FadeIn from './FadeIn';
import SectionTitle from './SectionTitle';

const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const allTags = useMemo(() => {
    return [...new Set(PROJECTS_DATA.flatMap(p => p.tags))];
  }, []);

  const handleTagClick = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  const filteredProjects = useMemo(() => {
    const filtered = PROJECTS_DATA.filter(project => {
      const query = searchQuery.toLowerCase();
      const searchMatch =
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query);

      const tagsMatch =
        activeTags.length === 0 ||
        activeTags.every(tag => project.tags.includes(tag));

      return searchMatch && tagsMatch;
    });

    // Si hay búsqueda o filtros activos, mostrar todos los resultados
    if (searchQuery || activeTags.length > 0) {
      return filtered;
    }

    // Si no, mostrar solo los primeros 3 a menos que showAll sea true
    return showAll ? filtered : filtered.slice(0, 3);
  }, [searchQuery, activeTags, showAll]);


  return (
    <section id="proyectos" className="py-24">
      <FadeIn>
        <SectionTitle number="02" title="Proyectos Destacados" className="justify-center md:justify-start mb-6" />
      </FadeIn>

      <FadeIn>
        <div className="max-w-4xl mx-auto mb-12 px-4">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar por título o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#112240] border border-slate-700 rounded-md px-4 py-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
              aria-label="Buscar proyectos"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <p className="w-full text-center text-slate-400 mb-2 font-medium">Filtrar por tecnología:</p>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 border rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTags.includes(tag)
                    ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400'
                    : 'bg-transparent border-slate-600 text-slate-400 hover:border-cyan-400 hover:text-cyan-400'
                }`}
                aria-pressed={activeTags.includes(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <div className="space-y-16">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <FadeIn key={project.id}>
              <ProjectCard project={project} isReversed={index % 2 !== 0} />
            </FadeIn>
          ))
        ) : (
          <FadeIn>
            <div className="text-center text-slate-400 py-20 px-4">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl font-medium text-slate-300 mb-2">No se encontraron proyectos</p>
                <p className="text-slate-400">Intenta con otros términos de búsqueda o ajusta los filtros de tecnología.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTags([]);
                  }}
                  className="mt-6 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-medium"
                >
                  Limpiar filtros →
                </button>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
      
      {!searchQuery && activeTags.length === 0 && PROJECTS_DATA.length > 3 && (
        <FadeIn className="text-center mt-16">
          <button
            onClick={() => setShowAll(!showAll)}
            className="border-2 border-cyan-400 text-cyan-400 px-8 py-3 rounded-md hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A192F] font-medium"
          >
            {showAll ? 'Ver Menos Proyectos' : 'Ver Más Proyectos'}
          </button>
        </FadeIn>
      )}
    </section>
  );
};

export default Projects;