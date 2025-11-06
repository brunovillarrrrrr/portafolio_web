import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../services/firebase-config';
import BlogAdminPanel from './BlogAdminPanel'; // Import BlogAdminPanel

const Auth: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("User signed in with Google!");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-slate-400">Cargando autenticación...</div>;
  }

  if (user) {
    // If user is logged in, render the BlogAdminPanel
    return <BlogAdminPanel />;
  }

  // If no user, show the login interface
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#1a2942] rounded-lg shadow-lg max-w-sm mx-auto my-12">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Administración del Blog</h2>
      <div className="text-center">
        <p className="text-md text-slate-400 mb-6">Inicia sesión para gestionar el blog.</p>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Iniciar Sesión con Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
