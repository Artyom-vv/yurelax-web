/**
 * Возвращает безопасное сообщение для интерфейса игрока.
 *
 * Полезное русское объяснение валидации сохраняется. Внутренние англоязычные
 * сообщения транспорта и сервисов заменяются понятным текстом конкретного экрана.
 */
export function platformErrorMessage(error: unknown, fallback: string): string {
  const message = (error as {error?: {message?: unknown}} | null)?.error?.message;
  return typeof message === 'string' && /[А-Яа-яЁё]/.test(message) ? message : fallback;
}
