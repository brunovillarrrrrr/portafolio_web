import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, BlogPost } from '../services/firestore';
import FadeIn from './FadeIn';
import SectionTitle from './SectionTitle';

const LatestBlogPost: React.FC = () => {
  const [latestPost, setLatestPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const posts = await getPosts();
        const publishedPosts = posts.filter(post => post.published);

        if (publishedPosts.length > 0) {
          setLatestPost(publishedPosts[0]); // El primero es el más reciente
        }
      } catch (error) {
        console.error('Error fetching latest post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPost();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="py-24">
        <FadeIn>
          <SectionTitle number="05" title="Últimas del Blog" className="justify-center md:justify-start mb-12" />
        </FadeIn>
        <div className="flex justify-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        </div>
      </section>
    );
  }

  if (!latestPost) {
    return (
      <section id="blog" className="py-24">
        <FadeIn>
          <SectionTitle number="05" title="Últimas del Blog" className="justify-center md:justify-start mb-12" />
        </FadeIn>
        <div className="text-center py-12">
          <p className="text-slate-400">No hay publicaciones disponibles aún.</p>
        </div>
      </section>
    );
  }

  // Truncar contenido
  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <section id="blog" className="py-24">
      <FadeIn>
        <SectionTitle number="05" title="Últimas del Blog" className="justify-center md:justify-start mb-12" />
      </FadeIn>

      <FadeIn delay="delay-100">
        <article className="bg-[#112240] border border-slate-800 rounded-lg overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 hover:-translate-y-1">
          {/* Image */}
          {latestPost.imageUrl && (
            <div className="aspect-video overflow-hidden">
              <img
                src={latestPost.imageUrl}
                alt={latestPost.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Tags */}
            {latestPost.tags && latestPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {latestPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <Link to={`/blog/${latestPost.slug}`}>
              <h3 className="text-2xl font-bold text-slate-100 hover:text-cyan-400 transition-colors mb-3">
                {latestPost.title}
              </h3>
            </Link>

            {/* Excerpt */}
            <p className="text-slate-300 leading-relaxed mb-4">
              {truncateContent(latestPost.content)}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
              <span>Por {latestPost.authorName}</span>
              <span>{new Date(latestPost.createdAt).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>

            {/* Read More Button */}
            <Link
              to={`/blog/${latestPost.slug}`}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group"
            >
              Leer más
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </article>

        {/* Ver todos los posts */}
        <div className="text-center mt-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 border border-cyan-400 text-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-400 hover:text-[#0A192F] transition-all duration-300 font-semibold"
          >
            Ver todos los posts
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </FadeIn>
    </section>
  );
};

export default LatestBlogPost;
