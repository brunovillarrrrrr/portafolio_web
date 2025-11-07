// Configuración de administradores autorizados
// Solo los emails en esta lista pueden acceder al panel de administración

export const AUTHORIZED_ADMINS = [
  'brunovillarreal@kimal.tech',
  'villabruno2@gmail.com',
  // Agrega más emails autorizados aquí
  // 'otro-email@ejemplo.com',
] as const;

/**
 * Verifica si un email está autorizado para acceder al panel de admin
 * @param email - Email del usuario a verificar
 * @returns true si el usuario está autorizado, false si no
 */
export function isAuthorizedAdmin(email: string | null | undefined): boolean {
  if (!email) return false;

  // Convertir a minúsculas para comparación case-insensitive
  const normalizedEmail = email.toLowerCase().trim();

  return AUTHORIZED_ADMINS.some(
    adminEmail => adminEmail.toLowerCase() === normalizedEmail
  );
}

/**
 * Obtiene el nombre del administrador si está autorizado
 * @param email - Email del usuario
 * @param displayName - Nombre para mostrar del usuario
 * @returns Nombre del admin o null si no está autorizado
 */
export function getAuthorizedAdminName(
  email: string | null | undefined,
  displayName: string | null | undefined
): string | null {
  if (!isAuthorizedAdmin(email)) return null;
  return displayName || email || 'Admin';
}
