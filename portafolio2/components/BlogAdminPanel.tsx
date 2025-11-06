import React, { useState, useEffect } from 'react';
import { auth } from '../services/firebase-config';
import { onAuthStateChanged, User } from 'firebase/auth';
import SectionTitle from './SectionTitle';
import FadeIn from './FadeIn';
import { addPost, getPosts, updatePost, deletePost, BlogPost } from '../services/firestore';
import { Link } from 'react-router-dom';

const BlogAdminPanel: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState<Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'authorName'>>({
    title: '',
    slug: '',
    content: '',
    tags: [],
    imageUrl: '',
    published: true,
  });
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User signed out from admin panel!");
      // Opcional: Redirigir al usuario a la página principal o de login después de cerrar sesión
    } catch (error) {
      console.error("Error during sign-out from admin panel:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingPost) {
      setEditingPost((prev) => ({
        ...prev!,
        [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value,
      }));
    } else {
      setNewPost((prev) => ({
        ...prev,
        [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.uid || !user.displayName) {
      setFormMessage({ type: 'error', text: 'No user authenticated. Please log in.' });
      return;
    }

    try {
      if (editingPost) {
        // Logic for updating an existing post
        await updatePost(editingPost.id!, {
          title: editingPost.title,
          slug: editingPost.slug,
          content: editingPost.content,
          tags: editingPost.tags,
          imageUrl: editingPost.imageUrl,
          published: editingPost.published,
        });
        setFormMessage({ type: 'success', text: 'Publicación actualizada exitosamente!' });
        setEditingPost(null); // Exit editing mode
      } else {
        // Logic for adding a new post
        const postToAdd = {
          ...newPost,
          authorId: user.uid,
          authorName: user.displayName,
        };
        await addPost(postToAdd);
        setFormMessage({ type: 'success', text: 'Publicación creada exitosamente!' });
        setNewPost({
          title: '',
          slug: '',
          content: '',
          tags: [],
          imageUrl: '',
          published: true,
        });
      }
      fetchPosts(); // Refresh the list of posts
    } catch (error) {
      console.error("Error submitting post:", error);
      setFormMessage({ type: 'error', text: 'Error al guardar la publicación.' });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top to see the form
  };

  const handleDelete = async (postId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")) {
      try {
        await deletePost(postId);
        setFormMessage({ type: 'success', text: 'Publicación eliminada exitosamente!' });
        fetchPosts(); // Refresh the list
      } catch (error) {
        console.error("Error deleting post:", error);
        setFormMessage({ type: 'error', text: 'Error al eliminar la publicación.' });
      }
    }
  };

  if (loading) {
    return <div className="text-center text-slate-400">Cargando panel de administración...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-[#1a2942] rounded-lg shadow-lg max-w-lg mx-auto my-20">
        <p className="text-xl text-red-400 mb-6">Acceso denegado</p>
        <p className="text-md text-slate-400 mb-6">Necesitas iniciar sesión para acceder al panel de administración del blog.</p>
        <Link to="/blog-admin" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Ir a Iniciar Sesión
        </Link>
      </div>
    );
  }

  const currentFormData = editingPost || newPost;

  return (
    <section id="blog-admin" className="py-16 md:py-20">
      <FadeIn>
        <SectionTitle title="Administración de Blog" subtitle="Gestiona tus publicaciones" />
      </FadeIn>

      <div className="mt-12 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xl text-slate-300 mb-4">¡Bienvenido al panel de administración, {user.displayName}!</p>
          {user.photoURL && (
            <img src={user.photoURL} alt="User profile" className="w-20 h-20 rounded-full mx-auto mb-4" />
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="p-6 bg-[#1a2942] rounded-lg shadow-lg mb-10">
            <h3 className="text-xl font-semibold text-cyan-400 mb-6">{editingPost ? 'Editar Publicación' : 'Crear Nueva Publicación'}</h3>
            {formMessage && (
              <div className={`p-3 mb-4 rounded-md text-center ${formMessage.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                {formMessage.text}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-slate-300 text-sm font-bold mb-2">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={currentFormData.title}
                        onChange={handleInputChange}
                        className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="slug" className="block text-slate-300 text-sm font-bold mb-2">Slug (URL amigable):</label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={currentFormData.slug}
                        onChange={handleInputChange}
                        className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-slate-300 text-sm font-bold mb-2">Contenido:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={currentFormData.content}
                        onChange={handleInputChange}
                        rows={10}
                        className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="tags" className="block text-slate-300 text-sm font-bold mb-2">Etiquetas (separadas por comas):</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={currentFormData.tags.join(', ')}
                        onChange={handleInputChange}
                        className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                    />
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-slate-300 text-sm font-bold mb-2">URL de Imagen (Opcional):</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={currentFormData.imageUrl}
                        onChange={handleInputChange}
                        className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                >
                    {editingPost ? 'Actualizar Publicación' : 'Crear Publicación'}
                </button>
                {editingPost && (
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className="ml-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  >
                    Cancelar Edición
                  </button>
                )}
            </form>
        </div>

        <div className="p-6 bg-[#1a2942] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">Publicaciones Existentes</h3>
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-md">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-cyan-300">{post.title}</h4>
                      <p className="text-sm text-slate-400">Slug: {post.slug}</p>
                      <p className="text-xs text-slate-500">Creado: {new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(post)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md transition duration-300"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(post.id!)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md transition duration-300"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No hay publicaciones aún. ¡Crea la primera!</p>
            )}
        </div>
      </div>
    </section>
  );
};

export default BlogAdminPanel;
