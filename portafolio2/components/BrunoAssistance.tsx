import React, { useState, useEffect, useRef } from 'react';
import { initializeChat, sendMessageStreaming, SUGGESTED_QUESTIONS, EASTER_EGGS, type Message } from '../services/gemini';
import type { ChatSession } from '@google/generative-ai';
import { ChatBotIcon, CloseIcon, SendIcon } from './icons/AIIcons';
import { rateLimiter, formatCooldownTime } from '../services/rateLimiter';

const BrunoAssistance: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [rateLimitWarning, setRateLimitWarning] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<ChatSession | null>(null);
  const cooldownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Inicializar chat cuando se abre por primera vez
  useEffect(() => {
    if (isOpen && !chatRef.current) {
      try {
        chatRef.current = initializeChat();
      } catch (error) {
        console.error('Error al inicializar chat:', error);
        const errorMessage: Message = {
          role: 'assistant',
          content: '❌ No se pudo inicializar el asistente. Por favor, revisa la configuración e inténtalo de nuevo.',
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  }, [isOpen]);

  // Cargar historial del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bruno-chat-history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
        setShowSuggestions(false);
      } catch (e) {
        console.error('Error cargando historial:', e);
      }
    } else {
      // Mensaje de bienvenida
      setMessages([{
        role: 'assistant',
        content: '👋 ¡Hola! Soy Bruno Assistance, tu asistente virtual. Estoy aquí para responder cualquier pregunta sobre mi trabajo, proyectos y experiencia. ¿En qué puedo ayudarte?',
        timestamp: Date.now()
      }]);
    }
  }, []);

  // Guardar historial en localStorage
  useEffect(() => {
    if (messages.length > 1) { // Solo guardar si hay más que el mensaje de bienvenida
      localStorage.setItem('bruno-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus en input cuando se abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Countdown timer para cooldown
  useEffect(() => {
    const remaining = rateLimiter.getRemainingCooldown();
    if (remaining > 0) {
      setCooldownTime(remaining);

      // Actualizar cada segundo
      cooldownIntervalRef.current = setInterval(() => {
        const newRemaining = rateLimiter.getRemainingCooldown();
        if (newRemaining > 0) {
          setCooldownTime(newRemaining);
        } else {
          setCooldownTime(0);
          setRateLimitWarning(null);
          if (cooldownIntervalRef.current) {
            clearInterval(cooldownIntervalRef.current);
          }
        }
      }, 1000);

      return () => {
        if (cooldownIntervalRef.current) {
          clearInterval(cooldownIntervalRef.current);
        }
      };
    }
  }, [cooldownTime]);

  // Cleanup interval al cerrar
  useEffect(() => {
    return () => {
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const currentInput = input.trim();

    // Verificar rate limiting
    const limitStatus = rateLimiter.checkLimit(currentInput);

    if (!limitStatus.isAllowed) {
      // Generar mensaje de error según la razón
      let errorMessage = '';
      switch (limitStatus.reason) {
        case 'cooldown':
          errorMessage = `⏸️ Por favor, espera ${formatCooldownTime(limitStatus.cooldownEndsAt! - Date.now())} antes de enviar más mensajes.`;
          break;
        case 'duplicate':
          errorMessage = '⚠️ Detectamos mensajes duplicados. Por favor, espera un momento antes de continuar.';
          break;
        case 'rate_limit_minute':
          errorMessage = '⚠️ Has alcanzado el límite de mensajes por minuto. Por favor, espera un momento.';
          break;
        case 'rate_limit_hour':
          errorMessage = '⚠️ Has alcanzado el límite de mensajes por hora. Por favor, intenta más tarde.';
          break;
        default:
          errorMessage = '⚠️ Límite de mensajes alcanzado. Por favor, espera un momento.';
      }

      setRateLimitWarning(errorMessage);
      setCooldownTime(rateLimiter.getRemainingCooldown());
      return;
    }

    // Verificar si debemos mostrar warning
    if (limitStatus.remainingMessages !== undefined && rateLimiter.shouldShowWarning(limitStatus.remainingMessages)) {
      setRateLimitWarning(`⚠️ Te quedan ${limitStatus.remainingMessages} mensajes antes del límite.`);
      setTimeout(() => setRateLimitWarning(null), 5000);
    }

    // Registrar el mensaje
    rateLimiter.recordMessage(currentInput);

    const userMessage: Message = {
      role: 'user',
      content: currentInput,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);

    // Verificar easter eggs
    const lowerInput = currentInput.toLowerCase();
    const easterEggKey = Object.keys(EASTER_EGGS).find(key => lowerInput.includes(key));

    try {
      if (easterEggKey) {
        // Easter egg - respuesta inmediata
        const response = EASTER_EGGS[easterEggKey];
        const assistantMessage: Message = {
          role: 'assistant',
          content: response,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Streaming en tiempo real
        if (!chatRef.current) {
          throw new Error('Chat no inicializado');
        }

        // Crear mensaje temporal del asistente que se irá actualizando
        const assistantMessage: Message = {
          role: 'assistant',
          content: '',
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Callback que actualiza el mensaje en tiempo real con el texto completo hasta ahora
        const onChunk = (fullTextSoFar: string) => {
          setMessages(prev => {
            const updatedMessages = [...prev];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            if (lastMessage.role === 'assistant') {
              lastMessage.content = fullTextSoFar;
            }
            return updatedMessages;
          });
        };

        // Enviar mensaje con streaming
        await sendMessageStreaming(currentInput, chatRef.current, onChunk);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: '❌ Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo o contáctame directamente en brunovillarreal@kimal.tech',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('bruno-chat-history');
    setMessages([{
      role: 'assistant',
      content: '👋 ¡Hola! Soy Bruno Assistance, tu asistente virtual. Estoy aquí para responder cualquier pregunta sobre mi trabajo, proyectos y experiencia. ¿En qué puedo ayudarte?',
      timestamp: Date.now()
    }]);
    setShowSuggestions(true);
    // Reinicializar el chat
    try {
      chatRef.current = initializeChat();
    } catch (error) {
      console.error('Error al reinicializar chat:', error);
    }
    // Resetear rate limiter
    rateLimiter.reset();
    setCooldownTime(0);
    setRateLimitWarning(null);
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 z-40 w-14 h-14 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A192F] group"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat con Bruno'}
      >
        {isOpen ? (
          <svg className="w-6 h-6 m-auto text-[#0A192F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <span className="text-[#0A192F] font-bold text-lg">BV</span>
            {/* Indicador de notificación */}
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </div>
        )}
      </button>

      {/* Sidebar del chat */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0A192F] border-l border-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#112240] to-[#0A192F] border-b border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
                <span className="text-[#0A192F] font-bold">BV</span>
              </div>
              <div>
                <h3 className="text-slate-100 font-bold">Bruno Assistance</h3>
                <p className="text-xs text-slate-400">Asistente Virtual • Gemini 2.0 Flash</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none"
              aria-label="Cerrar chat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Área de mensajes con altura dinámica */}
        <div
          className={`overflow-y-auto p-4 space-y-4 ${
            showSuggestions && messages.length <= 1
              ? 'h-[calc(100%-340px)]'
              : 'h-[calc(100%-180px)]'
          }`}
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#22d3ee #0a192f' }}
        >
          {messages.map((msg, idx) => {
            const isLastMessage = idx === messages.length - 1;
            const isStreamingMessage = isLastMessage && msg.role === 'assistant' && isLoading;

            return (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-cyan-400/10 border border-cyan-400/30 text-slate-100'
                    : 'bg-[#112240] border border-slate-700 text-slate-300'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                    {isStreamingMessage && (
                      <span className="inline-block w-1 h-4 ml-1 bg-cyan-400 animate-pulse"></span>
                    )}
                  </p>
                  <span className="text-xs text-slate-500 mt-1 block">
                    {new Date(msg.timestamp).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && messages.length > 0 && messages[messages.length - 1].role !== 'assistant' && (
            <div className="flex justify-start">
              <div className="bg-[#112240] border border-slate-700 p-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sugerencias de preguntas */}
        {showSuggestions && messages.length <= 1 && (
          <div className="px-4 pb-3 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <div className="bg-gradient-to-r from-[#112240] to-[#0e1e30] rounded-xl p-4 border border-cyan-400/20 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wide">Comienza aquí</p>
              </div>
              <div className="flex justify-center">
                {SUGGESTED_QUESTIONS.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(question)}
                    className="w-full text-sm bg-gradient-to-r from-cyan-400/10 to-blue-500/10 text-slate-200 px-5 py-3 rounded-lg hover:from-cyan-400/20 hover:to-blue-500/20 hover:text-cyan-300 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 font-medium hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-400/20 flex items-center justify-center gap-2 group"
                  >
                    <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Rate Limit Warning & Cooldown */}
        {(rateLimitWarning || cooldownTime > 0) && (
          <div className="absolute bottom-20 left-0 right-0 px-4 pb-2">
            <div className={`p-3 rounded-lg border ${
              cooldownTime > 0
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
            } animate-slideInUp`}>
              <div className="flex items-center gap-2">
                {cooldownTime > 0 ? (
                  <>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Límite alcanzado</p>
                      <p className="text-xs mt-0.5">Podrás enviar mensajes en: {formatCooldownTime(cooldownTime)}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-sm flex-1">{rateLimitWarning}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0A192F] border-t border-slate-800 p-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={clearHistory}
              className="text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none"
              aria-label="Limpiar historial"
              title="Limpiar historial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={cooldownTime > 0 ? `Espera ${formatCooldownTime(cooldownTime)}...` : "Escribe tu pregunta..."}
              disabled={isLoading || cooldownTime > 0}
              className="flex-1 bg-[#112240] text-slate-100 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || cooldownTime > 0}
              className="bg-cyan-400 text-[#0A192F] p-2 rounded-lg hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A192F]"
              aria-label="Enviar mensaje"
              title={cooldownTime > 0 ? `Espera ${formatCooldownTime(cooldownTime)}` : 'Enviar mensaje'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default BrunoAssistance;
