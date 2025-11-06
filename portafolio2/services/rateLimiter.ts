// Sistema de protección contra DDoS y rate limiting para el chatbot

export interface RateLimitConfig {
  maxMessagesPerMinute: number;
  maxMessagesPerHour: number;
  cooldownPeriodMs: number;
  duplicateMessageThreshold: number;
}

export interface RateLimitStatus {
  isAllowed: boolean;
  reason?: string;
  remainingMessages?: number;
  cooldownEndsAt?: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxMessagesPerMinute: 10, // Máximo 10 mensajes por minuto
  maxMessagesPerHour: 50, // Máximo 50 mensajes por hora
  cooldownPeriodMs: 60000, // 1 minuto de cooldown si excede límites
  duplicateMessageThreshold: 3, // Bloquear si envía el mismo mensaje 3+ veces
};

class RateLimiter {
  private config: RateLimitConfig;
  private messageHistory: Array<{ content: string; timestamp: number }> = [];
  private cooldownUntil: number | null = null;
  private warningShown = false;

  constructor(config: RateLimitConfig = DEFAULT_CONFIG) {
    this.config = config;
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('bruno-chat-rate-limit');
      if (stored) {
        const data = JSON.parse(stored);
        this.messageHistory = data.messageHistory || [];
        this.cooldownUntil = data.cooldownUntil || null;

        // Limpiar mensajes antiguos (más de 1 hora)
        const oneHourAgo = Date.now() - 60 * 60 * 1000;
        this.messageHistory = this.messageHistory.filter(
          msg => msg.timestamp > oneHourAgo
        );
      }
    } catch (e) {
      console.error('Error cargando rate limiter:', e);
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('bruno-chat-rate-limit', JSON.stringify({
        messageHistory: this.messageHistory,
        cooldownUntil: this.cooldownUntil
      }));
    } catch (e) {
      console.error('Error guardando rate limiter:', e);
    }
  }

  private cleanOldMessages(): void {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    // Eliminar mensajes más antiguos de 1 hora
    this.messageHistory = this.messageHistory.filter(
      msg => msg.timestamp > oneHourAgo
    );
  }

  private countRecentMessages(windowMs: number): number {
    const now = Date.now();
    const cutoff = now - windowMs;
    return this.messageHistory.filter(msg => msg.timestamp > cutoff).length;
  }

  private detectDuplicates(content: string): boolean {
    const recentDuplicates = this.messageHistory.filter(
      msg => msg.content.toLowerCase().trim() === content.toLowerCase().trim()
    );
    return recentDuplicates.length >= this.config.duplicateMessageThreshold;
  }

  checkLimit(messageContent: string): RateLimitStatus {
    const now = Date.now();

    // Verificar si está en período de cooldown
    if (this.cooldownUntil && now < this.cooldownUntil) {
      return {
        isAllowed: false,
        reason: 'cooldown',
        cooldownEndsAt: this.cooldownUntil
      };
    } else if (this.cooldownUntil && now >= this.cooldownUntil) {
      // Cooldown terminado, resetear
      this.cooldownUntil = null;
      this.messageHistory = [];
      this.saveToStorage();
    }

    // Limpiar mensajes antiguos
    this.cleanOldMessages();

    // Verificar mensajes duplicados/spam
    if (this.detectDuplicates(messageContent)) {
      this.cooldownUntil = now + this.config.cooldownPeriodMs;
      this.saveToStorage();
      return {
        isAllowed: false,
        reason: 'duplicate',
        cooldownEndsAt: this.cooldownUntil
      };
    }

    // Verificar límite por minuto
    const messagesLastMinute = this.countRecentMessages(60 * 1000);
    if (messagesLastMinute >= this.config.maxMessagesPerMinute) {
      this.cooldownUntil = now + this.config.cooldownPeriodMs;
      this.saveToStorage();
      return {
        isAllowed: false,
        reason: 'rate_limit_minute',
        cooldownEndsAt: this.cooldownUntil
      };
    }

    // Verificar límite por hora
    const messagesLastHour = this.countRecentMessages(60 * 60 * 1000);
    if (messagesLastHour >= this.config.maxMessagesPerHour) {
      this.cooldownUntil = now + this.config.cooldownPeriodMs * 5; // 5 minutos de cooldown
      this.saveToStorage();
      return {
        isAllowed: false,
        reason: 'rate_limit_hour',
        cooldownEndsAt: this.cooldownUntil
      };
    }

    // Calcular mensajes restantes
    const remainingMinute = this.config.maxMessagesPerMinute - messagesLastMinute;
    const remainingHour = this.config.maxMessagesPerHour - messagesLastHour;

    return {
      isAllowed: true,
      remainingMessages: Math.min(remainingMinute, remainingHour)
    };
  }

  recordMessage(content: string): void {
    this.messageHistory.push({
      content: content.trim(),
      timestamp: Date.now()
    });
    this.saveToStorage();
  }

  getRemainingCooldown(): number {
    if (!this.cooldownUntil) return 0;
    const remaining = this.cooldownUntil - Date.now();
    return remaining > 0 ? remaining : 0;
  }

  reset(): void {
    this.messageHistory = [];
    this.cooldownUntil = null;
    this.warningShown = false;
    localStorage.removeItem('bruno-chat-rate-limit');
  }

  shouldShowWarning(remainingMessages: number): boolean {
    // Mostrar warning si quedan menos de 3 mensajes
    if (remainingMessages <= 3 && !this.warningShown) {
      this.warningShown = true;
      return true;
    }
    if (remainingMessages > 3) {
      this.warningShown = false;
    }
    return false;
  }
}

// Instancia singleton
export const rateLimiter = new RateLimiter();

// Función helper para formatear tiempo de cooldown
export function formatCooldownTime(ms: number): string {
  const seconds = Math.ceil(ms / 1000);
  if (seconds < 60) {
    return `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
  }
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minuto${minutes !== 1 ? 's' : ''}`;
}
