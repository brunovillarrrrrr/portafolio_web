import React, { useState, useEffect } from 'react';
import { BlogPost, getPosts } from '../services/firestore';
import SectionTitle from './SectionTitle';
import FadeIn from './FadeIn';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("No se pudieron cargar las publicaciones.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center text-slate-400 py-20">Cargando publicaciones...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400 py-20">Error: {error}</div>;
  }

  return (
    <section id="blog" className="py-16 md:py-20">
      <FadeIn>
        <SectionTitle title="Mi Blog" subtitle="Últimas publicaciones y reflexiones" />
      </FadeIn>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.id} className="block p-6 bg-[#1a2942] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4 group-hover:opacity-80 transition-opacity duration-300" />
              )}
              <h3 className="text-xl font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors duration-300">{post.title}</h3>
              <p className="text-slate-400 text-sm mb-3">{new Date(post.createdAt).toLocaleDateString()}</p>
              <p className="text-slate-300 text-base line-clamp-3">{post.content.substring(0, 150)}...</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-gray-700 text-slate-300 text-xs px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-slate-400 text-xl">
            Aún no hay publicaciones en el blog. ¡Pronto habrá contenido!.
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
