import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogPost, getPosts } from '../services/firestore';
import FadeIn from './FadeIn';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError("Slug de publicación no proporcionado.");
        setLoading(false);
        return;
      }

      try {
        const allPosts = await getPosts();
        const foundPost = allPosts.find(p => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError("Publicación no encontrada.");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Error al cargar la publicación.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="text-center text-slate-400 py-20">Cargando publicación...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400 py-20">Error: {error}</div>;
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-slate-400 mb-4">La publicación que buscas no existe o fue eliminada.</p>
        <Link to="/blog" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Volver al Blog
        </Link>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 max-w-3xl mx-auto">
      <FadeIn>
        <article className="bg-[#1a2942] rounded-lg shadow-lg p-8">
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} className="w-full h-80 object-cover rounded-md mb-6" />
          )}
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">{post.title}</h1>
          <p className="text-slate-400 text-sm mb-6">
            Por <span className="font-semibold text-cyan-300">{post.authorName}</span> el {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div className="prose prose-invert prose-lg max-w-none text-slate-200 leading-relaxed">
            {/* Aquí asumimos que el contenido es texto plano o HTML simple. Si es Markdown, necesitaríamos un parser */}
            <p>{post.content}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-gray-700 text-slate-300 text-xs px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/blog" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              Volver al Blog
            </Link>
          </div>
        </article>
      </FadeIn>
    </section>
  );
};

export default BlogPostDetail;
