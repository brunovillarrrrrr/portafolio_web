import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

interface UnauthorizedAccessProps {
  userEmail?: string | null;
  onSignOut?: () => void;
}

const UnauthorizedAccess: React.FC<UnauthorizedAccessProps> = ({ userEmail, onSignOut }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <FadeIn>
        <div className="max-w-md w-full bg-[#112240] border border-red-500/30 rounded-lg p-8 shadow-lg">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-red-400 text-center mb-3">
            Acceso No Autorizado
          </h2>

          {/* Message */}
          <div className="space-y-3 text-center text-slate-300">
            <p className="text-sm">
              Tu cuenta <span className="text-cyan-400 font-semibold">{userEmail}</span> no tiene
              permisos para acceder al panel de administración.
            </p>
            <p className="text-xs text-slate-400">
              Si crees que esto es un error, contacta al administrador del sitio.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3">
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
              >
                Cerrar Sesión
              </button>
            )}
            <Link
              to="/"
              className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out text-center focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
            >
              Volver al Inicio
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-500 text-center">
              Contacto:{' '}
              <a
                href="mailto:brunovillarreal@kimal.tech"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                brunovillarreal@kimal.tech
              </a>
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default UnauthorizedAccess;
