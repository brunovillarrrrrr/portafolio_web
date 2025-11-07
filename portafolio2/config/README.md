# 🔐 Configuración de Administradores

Este directorio contiene la configuración de seguridad para el sistema de blog.

## 📋 adminConfig.ts

Define qué usuarios tienen acceso al panel de administración del blog.

### Estructura

```typescript
export const AUTHORIZED_ADMINS = [
  'email1@example.com',
  'email2@example.com',
  // ... más emails
] as const;
```

### Usuarios Autorizados Actuales

- ✅ `brunovillarreal@kimal.tech`
- ✅ `villabruno2@gmail.com`

## 🔧 Cómo Agregar un Nuevo Administrador

1. Abre `config/adminConfig.ts`
2. Agrega el email a la lista `AUTHORIZED_ADMINS`
3. Guarda el archivo
4. ¡Listo! El cambio es inmediato

### Ejemplo:

```typescript
export const AUTHORIZED_ADMINS = [
  'brunovillarreal@kimal.tech',
  'villabruno2@gmail.com',
  'nuevo-admin@example.com', // ← Nuevo administrador
] as const;
```

## 🛡️ Funciones Helper

### `isAuthorizedAdmin(email: string): boolean`

Verifica si un email está autorizado.

**Uso:**
```typescript
import { isAuthorizedAdmin } from '../config/adminConfig';

if (isAuthorizedAdmin(user.email)) {
  // Usuario autorizado
}
```

### `getAuthorizedAdminName(email: string, displayName: string): string | null`

Obtiene el nombre del admin si está autorizado.

**Uso:**
```typescript
import { getAuthorizedAdminName } from '../config/adminConfig';

const adminName = getAuthorizedAdminName(user.email, user.displayName);
if (adminName) {
  console.log(`Admin autorizado: ${adminName}`);
}
```

## 🔒 Seguridad

- ✅ Comparación case-insensitive (mayúsculas/minúsculas no importan)
- ✅ Trimming automático de espacios
- ✅ Verificación en múltiples puntos (Auth.tsx + BlogAdminPanel.tsx)
- ✅ Mensajes claros para usuarios no autorizados

## 📝 Notas Importantes

- Los cambios en esta configuración toman efecto **inmediatamente**
- No es necesario reiniciar el servidor
- Los usuarios ya autenticados necesitarán refrescar la página
- Este es un sistema client-side, siempre combinar con reglas de Firestore

## 🚨 ¿Qué pasa si un usuario no autorizado intenta acceder?

1. El usuario inicia sesión con Google
2. Su email es verificado contra la whitelist
3. Si NO está autorizado:
   - ❌ Ve un mensaje de "Acceso No Autorizado"
   - 🔙 Puede volver al inicio
   - 🚪 Puede cerrar sesión

## 🧪 Testing

Para probar el sistema de whitelist:

1. Temporalmente remueve tu email de la lista
2. Intenta acceder al panel de administración
3. Deberías ver el mensaje de "Acceso No Autorizado"
4. Vuelve a agregar tu email a la lista
5. Refresca la página
6. Deberías tener acceso nuevamente

## 📧 Soporte

Para agregar nuevos administradores, contacta a:
- **Email**: brunovillarreal@kimal.tech
- **GitHub**: [@brunovillarrrrrr](https://github.com/brunovillarrrrrr)
