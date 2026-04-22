/**
 * Structured logging. Uses console internally but carries a consistent
 * message-plus-context shape so downstream sinks can filter and format.
 * The game ships with no runtime telemetry — logs are developer-facing
 * only, visible in the browser devtools.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

function emit(level: LogLevel, message: string, context?: Record<string, unknown>): void {
  const payload = context ? `${message} ${JSON.stringify(context)}` : message
  switch (level) {
    case 'debug':
      console.log(payload)
      return
    case 'info':
      console.info(payload)
      return
    case 'warn':
      console.warn(payload)
      return
    case 'error':
      console.error(payload)
      return
  }
}

export const log = {
  debug: (message: string, context?: Record<string, unknown>): void =>
    emit('debug', message, context),
  info: (message: string, context?: Record<string, unknown>): void =>
    emit('info', message, context),
  warn: (message: string, context?: Record<string, unknown>): void =>
    emit('warn', message, context),
  error: (message: string, context?: Record<string, unknown>): void =>
    emit('error', message, context)
} as const
