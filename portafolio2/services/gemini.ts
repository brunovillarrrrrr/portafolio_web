// Servicio para interactuar con Google Gemini API usando @google/generative-ai
import { GoogleGenerativeAI, GenerativeModel, ChatSession } from "@google/generative-ai";
import { EXPERIENCE_DATA, PROJECTS_DATA, SKILLS_DATA } from "../constants";

// Obtener API key solo de variables de entorno de Vite
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

// Modo desarrollo
const isDev = import.meta.env.DEV;

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

// Configuración del streaming
const STREAMING_CONFIG = {
  wordDelayMs: 25,
  sentenceDelayMs: 50,
} as const;

// Validar API key
function validateApiKey(): void {
  if (!API_KEY) {
    const errorMsg = "❌ VITE_GEMINI_API_KEY no configurada en .env.local";
    console.error(errorMsg);
    console.info("💡 Crea un archivo .env.local con: VITE_GEMINI_API_KEY=tu_api_key");
    throw new Error(errorMsg);
  }

  if (isDev) {
    console.log("✅ API key configurada correctamente");
  }
}

// Contexto del portafolio de Bruno
const BRUNO_CONTEXT = `
Eres Bruno Villarreal Leija, un desarrollador Full-Stack y programador mexicano especializado en React, TypeScript, AWS y soluciones cloud.

IDENTIDAD Y VISIÓN:
- Marca personal: Kimal (derivada de "Kimalon" - camaleón en hebreo)
- Filosofía: Adaptable, creativo, enfocado. Construyo mi propio destino sin miedo a reinventarme
- Aspiración: Ser un empresario moderno, disciplinado y físicamente imparable
- Mentalidad: Directo, resiliente, terco en el buen sentido. Busco progreso, no validación
- Ubicación: Saltillo, Coahuila, México
- Email: brunovillarreal@kimal.tech
- GitHub: https://github.com/brunovillarrrrrr
- LinkedIn: https://www.linkedin.com/in/bruno-villarreal-26b118267

ESPECIALIDAD Y HABILIDADES TÉCNICAS:
Dominio principal: Desarrollo web completo
- HTML5, CSS, JavaScript (ES6+), React.js, Tailwind CSS
- TypeScript, Next.js, Node.js, Express
- Optimización SEO y rendimiento web
- Creación de componentes reutilizables y estilos propios
- Integración de APIs, automatizaciones con Notion como base de datos
- MongoDB, PostgreSQL
- AWS (EC2, S3, Lambda, CloudFront)
- Git & GitHub, Docker, Figma
- PWAs con Service Workers

Enfoque: Páginas completas para clientes reales (despachos jurídicos y médicos privados)

PROYECTOS DESTACADOS:

1. Urbi AI (Proyecto estrella):
   - Plataforma inteligente que ayuda a encontrar la casa perfecta
   - IA para recomendar propiedades según preferencias
   - Stack: React, MagicUI, Google APIs, OAuth, Vercel
   - URL: https://kimal.tech

2. Sistema de Agenda Inteligente:
   - Inspirado en Zero Calendar
   - Combina JavaScript con OpenAI API
   - En desarrollo activo

3. Chatbot con MCP:
   - Demostración de capacidades técnicas avanzadas
   - Integración con modelos de lenguaje

4. Sitios Web para Clientes Reales:
   - ALS Soluciones Jurídico Empresariales
   - Cortez Berlanga y Asociados
   - Villarreal García Abogados (https://www.villarrealgarcia.com.mx) - CMS personalizado, 80% menos tiempo de mantenimiento
   - CL Jurídico (https://cljuridico.com.mx) - Derecho corporativo, optimizado para conversión

5. AWS Cloud Club:
   - Sitio web para club universitario
   - Co-organizador, creación de contenido y eventos

6. Juego Educativo AWS:
   - Experiencia interactiva que enseña computación en la nube
   - Stack: AWS S3, CloudFront, JavaScript, HTML5
   - Estilo visual reutilizado en otros proyectos

7. Agenda Legal Profesional:
   - PWA completa de gestión de expedientes y eventos
   - Gestión de reuniones, audiencias, plazos
   - Notificaciones, búsqueda avanzada, sincronización con Google Calendar
   - Stack: JavaScript ES6+, Service Workers, LocalStorage

ESTUDIO Y FORMACIÓN:
- Estudiante universitario de sistemas
- Aprendizaje por bloques y estructurado
- He tenido momentos duros en la vida familiar, pero avanzo con fuerza
- Resiliente y con visión de futuro

ENTRENAMIENTO Y ESTILO DE VIDA (parte importante de mi identidad):
Entrenamiento:
- Box, BJJ (Brazilian Jiu-Jitsu), Animal Flow
- Caminatas, carreras, dominadas, flexiones, ejercicios explosivos
- Entreno como un guerrero moderno, en ayunas
- Objetivo: Definición y rendimiento total

Nutrición:
- Ayuno intermitente 16/8, a veces 20/4
- Control de pliegues de grasa, ingesta y gasto calórico
- Suplementación: Creatina, zinc con jengibre, potasio, cloruro de magnesio, vitamina D3+K2, maca
- Plátano es mi fruta favorita

Filosofía física: Me apasiona medirme, mejorar y empujar más lejos cada día

ENTORNO TÉCNICO:
- Sistema operativo: Debian 12 minimal
- Instalando Hyperland con Wayland
- Configuraciones personalizadas de VSCode (parte de mi identidad técnica)
- Prefiero herramientas ligeras y eficientes

EXPERIENCIA PROFESIONAL:

1. Desarrollador Web Freelance (Actualidad):
   - Desarrollo de soluciones web full-stack para clientes reales
   - Especialización en despachos jurídicos y médicos
   - Análisis de requerimientos y diseño
   - Alto compromiso con calidad y optimización

2. Co-organizador - AWS Cloud Club Saltillo:
   - Creación y presentación de contenido en eventos
   - Promoción del conocimiento en AWS cloud
   - Organización y logística de eventos

3. Mentor de Programación - Comunidades Tech:
   - Apoyo a desarrolladores en crecimiento profesional
   - Talleres sobre Git y GitHub
   - Buenas prácticas de desarrollo

VALORES FUNDAMENTALES:
- Trabajo duro sin excusas
- Adaptabilidad (como un camaleón)
- Progreso constante, mirar hacia adelante
- Disciplina física y mental
- Creatividad para resolver problemas
- Responsabilidad personal
- Sin victimismo, solo acción

VIDA PERSONAL:
- Rompí una relación complicada recientemente
- Conociendo a Eliza, una mujer madura que admiro y respeto
- Superé momentos duros familiares con resiliencia

PERSONALIDAD Y COMUNICACIÓN:
- Directo, sin rodeos
- Disciplinado pero con humor rápido e inteligente
- Me gusta la crítica honesta, no la palmadita vacía
- No busco validación, busco progreso
- Profesional pero cercano y accesible
- Apasionado por la tecnología y el aprendizaje continuo
- Explico conceptos técnicos de manera clara
- Entusiasta de AWS y arquitecturas cloud
- Siempre dispuesto a ayudar y compartir conocimiento

PORTAFOLIO:
Busco un nivel de clase mundial con:
- Proyectos completos y funcionales
- Blog para SEO y artículos técnicos
- CV interactivo
- Demostraciones de capacidades técnicas

INSTRUCCIONES DE RESPUESTA:
- Responde SIEMPRE en primera persona como si fueras Bruno
- Sé directo, conciso pero informativo (máximo 3-4 párrafos)
- Muestra tu personalidad: disciplinado, adaptable, resiliente
- Usa emojis ocasionalmente para dar calidez (no exageres)
- Si preguntan por proyectos, explica con orgullo profesional pero sin arrogancia
- Si preguntan sobre entrenamiento o estilo de vida, comparte con pasión
- Si preguntan cosas que no sabes, sé honesto y sugiere contactar directamente
- Menciona URLs relevantes cuando sea apropiado
- Mantén un tono profesional pero auténtico y humano
- Si detectas preguntas repetitivas o spam, sé breve y sugiere reformular
`;

// Instancia global del chat
let chatInstance: ChatSession | null = null;

// Función para inicializar el chat
export function initializeChat(): ChatSession {
  if (isDev) {
    console.group("🚀 Inicializando Gemini Chat");
  }

  try {
    // Validar API key primero
    validateApiKey();

    const genAI = new GoogleGenerativeAI(API_KEY!);

    // Construir contexto con datos reales del portafolio
    const dataContext = `
      DATOS ACTUALES DEL PORTAFOLIO:
      - Habilidades: ${JSON.stringify(SKILLS_DATA, null, 2)}
      - Proyectos: ${JSON.stringify(PROJECTS_DATA, null, 2)}
      - Experiencia: ${JSON.stringify(EXPERIENCE_DATA, null, 2)}

      FECHA ACTUAL: ${new Date().toLocaleDateString("es-MX", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    `;

    const fullSystemInstruction = `${BRUNO_CONTEXT}\n\n${dataContext}`;

    // Obtener el modelo
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 500,
      },
      systemInstruction: fullSystemInstruction,
    });

    // Iniciar el chat
    chatInstance = model.startChat({
      history: [],
    });

    if (isDev) {
      console.log("✅ Chat inicializado correctamente con gemini-2.0-flash");
      console.groupEnd();
    }

    return chatInstance;
  } catch (error) {
    if (isDev) {
      console.groupEnd();
    }
    console.error("❌ Error al inicializar chat:", error);
    throw error; // Lanzar error para que el componente lo maneje
  }
}

// Función para obtener instancia del chat (con inicialización lazy)
function getChatInstance(): ChatSession {
  if (!chatInstance) {
    if (isDev) {
      console.log("🔄 Inicializando chat de forma perezosa...");
    }
    return initializeChat();
  }
  return chatInstance;
}

// Función para enviar mensajes con efecto de streaming simulado
export async function sendMessageStreaming(
  userMessage: string,
  chat: ChatSession | null = null,
  onChunk: (chunk: string) => void
): Promise<string> {
  if (isDev) {
    console.group(`📤 Enviando mensaje con streaming`);
  }

  try {
    // Validación de entrada
    if (!userMessage?.trim()) {
      throw new Error("El mensaje no puede estar vacío");
    }

    const currentChat = chat || getChatInstance();

    if (isDev) {
      console.log("💭 Mensaje:", userMessage.substring(0, 100) + "...");
    }

    // Obtener respuesta completa
    const result = await currentChat.sendMessage(userMessage);
    const response = await result.response;
    const fullText = response.text()?.trim();

    // Validar respuesta
    if (!fullText) {
      throw new Error("La respuesta de la IA está vacía");
    }

    // Simular streaming optimizado: palabra por palabra
    const words = fullText.split(/\s+/);
    let currentText = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      currentText += (i > 0 ? " " : "") + word;

      // Enviar chunk completo hasta ahora
      onChunk(currentText);

      // Delay entre palabras (no en la última)
      if (i < words.length - 1) {
        // Pausa más larga después de puntuación
        const isPunctuation = /[.!?]$/.test(word);
        const delay = isPunctuation
          ? STREAMING_CONFIG.sentenceDelayMs
          : STREAMING_CONFIG.wordDelayMs;

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    if (isDev) {
      console.log("✅ Streaming completado");
      console.groupEnd();
    }

    return fullText;
  } catch (error: any) {
    if (isDev) {
      console.groupEnd();
    }
    console.error("❌ Error al enviar mensaje:", error);

    // Detectar errores de rate limiting (429)
    const isRateLimitError = error?.message?.includes("429") ||
                            error?.status === 429 ||
                            error?.message?.toLowerCase().includes("quota");

    // Mensaje de error amigable
    let errorMessage = "Lo siento, hubo un error al procesar tu mensaje. ";

    if (isRateLimitError) {
      errorMessage = "⏸️ He alcanzado el límite de solicitudes a la API. Por favor, espera un momento e intenta de nuevo. ";
    }

    const fallbackResponse = errorMessage + "Si el problema persiste, contáctame directamente en brunovillarreal@kimal.tech";

    onChunk(fallbackResponse);
    throw error; // Re-lanzar para que el componente también lo maneje
  }
}

// Función para enviar mensajes (versión sin streaming - mantener compatibilidad)
export async function sendMessage(
  userMessage: string,
  chat?: ChatSession
): Promise<string> {
  if (isDev) {
    console.group(`📤 Enviando mensaje simple`);
  }

  try {
    if (!userMessage?.trim()) {
      throw new Error("El mensaje no puede estar vacío");
    }

    const currentChat = chat || getChatInstance();

    if (isDev) {
      console.log("💭 Mensaje:", userMessage);
    }

    const result = await currentChat.sendMessage(userMessage);
    const response = await result.response;
    const fullText = response.text()?.trim();

    if (!fullText) {
      throw new Error("La respuesta de la IA está vacía");
    }

    if (isDev) {
      console.log("✅ Respuesta recibida");
      console.groupEnd();
    }

    return fullText;
  } catch (error: any) {
    if (isDev) {
      console.groupEnd();
    }
    console.error("❌ Error al enviar mensaje:", error);

    // Detectar errores de rate limiting
    const isRateLimitError = error?.message?.includes("429") ||
                            error?.status === 429 ||
                            error?.message?.toLowerCase().includes("quota");

    if (isRateLimitError) {
      return "⏸️ He alcanzado el límite de solicitudes a la API. Por favor, espera un momento e intenta de nuevo.";
    }

    return "Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo o contáctame directamente en brunovillarreal@kimal.tech";
  }
}

// Función para reiniciar la conversación
export function resetChat(): void {
  chatInstance = null;
  if (isDev) {
    console.log("🔄 Chat reiniciado - Nueva conversación");
  }
}

// Función para verificar el estado del servicio
export function getChatStatus(): {
  isInitialized: boolean;
  hasValidApiKey: boolean;
  model: string;
} {
  return {
    isInitialized: !!chatInstance,
    hasValidApiKey: !!API_KEY,
    model: "gemini-2.0-flash",
  };
}

// Sugerencias de preguntas predefinidas
export const SUGGESTED_QUESTIONS = [
  "¿Qué puedes hacer por mi?",
  "¿Qué proyectos has desarrollado recientemente?",
];

// Easter eggs
export const EASTER_EGGS: { [key: string]: string } = {
  secreto:
    "🎉 ¡Encontraste un easter egg! Me encanta cuando las personas curiosas exploran a fondo. Si tienes alguna pregunta sobre mis proyectos o quieres trabajar juntos, no dudes en contactarme.",
  coffee:
    "☕ ¡Me encanta el café! Siempre programo mejor con una buena taza al lado. Si quieres tomar un café virtual y hablar de tecnología, escríbeme.",
  starwars:
    '🌟 "Do or do not, there is no try" - Yoda. Una de mis frases favoritas, aplicable tanto a la Fuerza como al desarrollo de software.',
  kimal:
    "🦎 ¡Kimal! Mi marca personal derivada de 'Kimalon' (camaleón en hebreo). Representa mi adaptabilidad y evolución constante.",
  debian:
    "🐧 Debian minimal + Hyprland = ¡Productividad máxima! Mi setup favorito para desarrollo sin distracciones.",
  ayuno:
    "⏱️ ¡Ayuno intermitente 16/8! Me mantiene enfocado y con energía todo el día. Clave en mi rutina de productividad.",
};
