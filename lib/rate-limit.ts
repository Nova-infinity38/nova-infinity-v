interface RateLimitRecord {
  count: number;
  lastReset: number;
}

const ipRequestMap = new Map<string, RateLimitRecord>();

/**
 * Vérifie si une adresse IP a dépassé le nombre maximal de requêtes autorisées.
 * @param ip Adresse IP de l'utilisateur/appelant
 * @param limit Nombre maximal de requêtes (par défaut 10)
 * @param windowMs Fenêtre de temps en millisecondes (par défaut 60000ms = 1 min)
 * @returns true si la requête est autorisée, false si la limite est dépassée
 */
export function checkRateLimit(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const record = ipRequestMap.get(ip);

  // Premier appel pour cette IP
  if (!record) {
    ipRequestMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  // Réinitialisation du compteur si la fenêtre de temps est écoulée
  if (now - record.lastReset > windowMs) {
    record.count = 1;
    record.lastReset = now;
    return true;
  }

  // Si la limite est atteinte
  if (record.count >= limit) {
    return false;
  }

  // Incrémentation
  record.count++;
  return true;
}