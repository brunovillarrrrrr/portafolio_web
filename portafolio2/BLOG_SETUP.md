# 📝 Sistema de Blog - Configuración

Este portafolio incluye un sistema de blog completo con Firebase y autenticación de Google.

## 🚀 Características

- ✅ Blog CMS completo con Firebase Firestore
- ✅ Autenticación con Google (Firebase Auth)
- ✅ Crear, editar y eliminar posts
- ✅ Vista pública del blog con URLs amigables
- ✅ Panel de administración protegido
- ✅ Timestamps automáticos
- ✅ Sistema de tags
- ✅ Soporte para imágenes

## 🔧 Configuración de Firebase

### 1. Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Crea un nuevo proyecto o usa el existente: `gen-lang-client-0991060668`

### 2. Habilitar Métodos de Autenticación

**Email/Password (Para usuarios regulares):**
```
Firebase Console → Authentication → Sign-in method → Email/Password → Habilitar
```

**Google OAuth (Para panel de administración):**
```
Firebase Console → Authentication → Sign-in method → Google → Habilitar
```

### 3. Crear Base de Datos Firestore

```
Firebase Console → Firestore Database → Create database
→ Selecciona "Start in production mode"
→ Elige ubicación (preferiblemente us-central1)
```

### 4. Configurar Reglas de Firestore

En Firebase Console → Firestore Database → Rules, pega:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      // Cualquiera puede leer posts
      allow read: if true;

      // Solo usuarios autenticados pueden escribir
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

Click en "Publish" para aplicar las reglas.

### 5. Verificar Credenciales

Las credenciales de Firebase ya están configuradas en `services/firebase-config.ts`:

```typescript
projectId: "gen-lang-client-0991060668"
```

## 🌐 Rutas Disponibles

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Home con **último post** del blog | Público |
| `/login` | Login/Registro con email y contraseña | Público |
| `/blog` | Vista completa del blog | Requiere login |
| `/blog/:slug` | Post individual | Requiere login |
| `/blog-admin` | Login de administración (Google OAuth) | Solo admins |
| `/blog-admin/panel` | Panel CMS | Solo admins autorizados |

## 📱 Uso del Sistema de Blog

### Para Usuarios Regulares

1. **Registro**:
   - Ve a `/login` o click en "Iniciar Sesión" en el navbar
   - Click en "Regístrate"
   - Ingresa email y contraseña (mínimo 6 caracteres)
   - Confirma contraseña
   - Click en "Crear Cuenta"

2. **Login**:
   - Ve a `/login`
   - Ingresa email y contraseña
   - Click en "Iniciar Sesión"
   - Serás redirigido a `/blog` con todos los posts

3. **Ver Blog**:
   - En el home verás **solo el último post**
   - Click en "Ver todos los posts" para ir a `/blog`
   - Click en cualquier post para ver el detalle completo

### Para Administradores

1. **Acceder al Panel**:
   - Abre `http://localhost:3002/blog-admin`
   - Click en "Iniciar Sesión con Google"
   - Selecciona tu cuenta de Google
   - Si tu email está en la whitelist, accederás al panel CMS

### Crear un Post

1. En el panel, completa el formulario:
   - **Título**: Título del post
   - **Slug**: URL amigable (ej: `mi-primer-post`)
   - **Contenido**: Texto del post (soporta saltos de línea)
   - **Tags**: Separados por comas (ej: `tecnología, desarrollo, react`)
   - **URL de Imagen**: (Opcional) URL de imagen de portada
2. Click en "Crear Publicación"

### Editar un Post

1. En la lista "Publicaciones Existentes"
2. Click en "Editar" en el post deseado
3. Modifica los campos necesarios
4. Click en "Actualizar Publicación"

### Eliminar un Post

1. En la lista "Publicaciones Existentes"
2. Click en "Eliminar" en el post deseado
3. Confirma la acción en el diálogo

## 🔒 Seguridad

### Sistema de Whitelist de Administradores

El blog implementa un **sistema de whitelist** que solo permite acceso al panel de administración a usuarios específicos:

- ✅ Solo emails autorizados pueden acceder al panel
- ✅ Verificación en múltiples capas (Auth + BlogAdminPanel)
- ✅ Mensajes claros para usuarios no autorizados
- ✅ Reglas de Firestore configuradas para escritura solo autenticada
- ✅ Autenticación con Google OAuth
- ✅ API keys expuestas solo en cliente (patrón estándar Firebase)
- ✅ No hay secrets en el código fuente

### Configurar Administradores Autorizados

Los administradores se configuran en `config/adminConfig.ts`:

```typescript
export const AUTHORIZED_ADMINS = [
  'brunovillarreal@kimal.tech',
  'villabruno2@gmail.com',
  // Agrega más emails aquí
] as const;
```

**Para agregar un nuevo administrador:**

1. Abre `config/adminConfig.ts`
2. Agrega el email a la lista `AUTHORIZED_ADMINS`
3. Guarda el archivo
4. El cambio toma efecto inmediatamente

**Flujo de autenticación:**

```
Usuario intenta acceder → Inicia sesión con Google → Verificación de whitelist
  ├─ Email autorizado → ✅ Acceso al panel
  └─ Email NO autorizado → ❌ Mensaje de "Acceso No Autorizado"
```

## 🏗️ Estructura de Datos

### Post Interface

```typescript
interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  imageUrl?: string;
  published: boolean;
}
```

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm run dev

# Build para producción
pnpm run build

# Preview del build
pnpm run preview
```

## 📊 Dependencias del Blog

```json
{
  "firebase": "^12.5.0",
  "react-router-dom": "^7.9.5"
}
```

## 🐛 Troubleshooting

### Error: "Firebase not initialized"
- Verifica que `firebase-config.ts` tenga las credenciales correctas
- Asegúrate de que el proyecto existe en Firebase Console

### Error: "Permission denied" al crear posts
- Verifica las reglas de Firestore
- Asegúrate de estar autenticado
- Revisa la consola de Firebase para logs de errores

### Posts no aparecen en la vista pública
- Verifica que `published: true` en los posts
- Revisa la consola del navegador para errores
- Confirma que Firestore esté configurado correctamente

## 🚀 Deploy a Producción

### Vercel (Recomendado)

1. Conecta tu repo de GitHub
2. Vercel detectará automáticamente Vite
3. Las variables de entorno no son necesarias (Firebase usa config pública)
4. Deploy automático en cada push

### Netlify

```bash
# Build command
pnpm run build

# Publish directory
dist

# Redirects para SPA
echo '/*    /index.html   200' > dist/_redirects
```

## 📝 Notas Importantes

- Las credenciales de Firebase en el cliente son **públicas por diseño**
- La seguridad se maneja con reglas de Firestore
- Asegúrate de habilitar Google Auth en Firebase Console
- Los posts se ordenan por fecha de creación (más recientes primero)

## 📧 Soporte

Para problemas o preguntas:
- Email: brunovillarreal@kimal.tech
- GitHub: [@brunovillarrrrrr](https://github.com/brunovillarrrrrr)
