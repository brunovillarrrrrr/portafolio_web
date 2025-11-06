
import { type SkillCategory, type Project, type ExperienceItem } from './types';

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Lenguajes',
    skills: [
      { name: 'JavaScript (ES6+)' },
      { name: 'Python' },
      { name: 'SQL' },
      { name: 'HTML5' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js' },
      { name: 'Next.js' },
      { name: 'Tailwind CSS' },
      { name: 'TypeScript' },
    ],
  },
  {
    title: 'Backend y Bases de Datos',
    skills: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'MongoDB' },
      { name: 'PostgreSQL' },
    ],
  },
  {
    title: 'Cloud y Herramientas',
    skills: [
        { name: 'AWS' },
        { name: 'Git & GitHub' },
        { name: 'Docker' },
        { name: 'Figma' },
    ],
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: 'Urbi AI',
    description: 'Plataforma inteligente que ayuda a las personas a encontrar la casa perfecta adaptada a sus necesidades. Utiliza IA para recomendar propiedades basándose en preferencias del usuario y análisis de mercado en tiempo real.',
    tags: ['React', 'MagicUI', 'Google APIs', 'OAuth', 'Vercel'],
    liveUrl: 'https://kimal.tech',
    repoUrl: 'https://github.com/brunovillarrrrrr',
  },
  {
    id: 2,
    title: 'Agenda Legal Profesional',
    description: 'Sistema completo de gestión de expedientes y eventos para profesionales del derecho. PWA instalable con gestión de reuniones, audiencias y plazos. Incluye notificaciones, búsqueda avanzada y sincronización con Google Calendar.',
    tags: ['PWA', 'JavaScript ES6+', 'Service Workers', 'LocalStorage'],
    liveUrl: 'https://github.com/brunovillarrrrrr',
    repoUrl: 'https://github.com/brunovillarrrrrr',
  },
  {
    id: 3,
    title: 'Villarreal García Abogados',
    description: 'Sitio web profesional responsivo para despacho jurídico con CMS personalizado. Optimización SEO completa, diseño moderno y sistema de gestión de contenido que redujo en 80% el tiempo de mantenimiento.',
    tags: ['React', 'CMS Custom', 'SEO', 'Responsive'],
    liveUrl: 'https://www.villarrealgarcia.com.mx',
    repoUrl: 'https://github.com/brunovillarrrrrr',
    imageUrl: '/images/projects/villarreal-garcia.svg',
  },
  {
    id: 4,
    title: 'CL Jurídico',
    description: 'Plataforma web moderna para firma de abogados especializada en derecho corporativo. Interfaz elegante, optimizada para conversión y con integración de formularios de contacto inteligentes.',
    tags: ['React', 'Tailwind CSS', 'SEO', 'Responsive'],
    liveUrl: 'https://cljuridico.com.mx',
    repoUrl: 'https://github.com/brunovillarrrrrr',
    imageUrl: '/images/projects/cl-juridico.svg',
  },
  {
    id: 5,
    title: 'Juego Interactivo AWS',
    description: 'Experiencia educativa interactiva que enseña conceptos de computación en la nube de manera divertida. Implementado con tecnologías serverless en AWS, incluyendo funcionalidades dinámicas y eventos en tiempo real.',
    tags: ['AWS S3', 'CloudFront', 'JavaScript', 'HTML5'],
    liveUrl: '/aws-game/index.html',
    repoUrl: 'https://github.com/brunovillarrrrrr',
    imageUrl: '/images/projects/aws-game.svg',
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: 'Desarrollador Web',
    company: 'Freelance',
    description: 'Desarrollo de soluciones web full-stack, desde el análisis de requerimientos y diseño, hasta la implementación del código con un alto compromiso con la calidad y la optimización del rendimiento.',
  },
  {
    id: 2,
    role: 'Co-organizador',
    company: 'AWS Cloud Club Saltillo',
    description: 'Creación y presentación de contenido en eventos para promover el conocimiento en la nube de AWS, así como la organización y logística de los mismos.',
  },
  {
    id: 3,
    role: 'Mentor de Programación',
    company: 'Comunidades Tech',
    description: 'Apoyo a desarrolladores en su crecimiento profesional a través de la impartición de talleres sobre control de versiones y buenas prácticas con Git y GitHub.',
  },
];
