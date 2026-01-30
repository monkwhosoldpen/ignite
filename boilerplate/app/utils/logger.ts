/**
 * Logger utility that captures logs in memory for debugging
 * Works across all platforms (iOS, Android, Web)
 */

export type LogLevel = "debug" | "info" | "warn" | "error"

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: unknown
  stack?: string
}

// In-memory log storage
const MAX_LOGS = 500
const logs: LogEntry[] = []

// Store original console methods
const originalConsole = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
  debug: console.debug,
}

function createLogEntry(level: LogLevel, args: unknown[]): LogEntry {
  const message = args
    .map((arg) => {
      if (arg instanceof Error) {
        return `${arg.name}: ${arg.message}`
      }
      if (typeof arg === "object") {
        try {
          return JSON.stringify(arg, null, 2)
        } catch {
          return String(arg)
        }
      }
      return String(arg)
    })
    .join(" ")

  const errorArg = args.find((arg) => arg instanceof Error) as Error | undefined

  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    stack: errorArg?.stack,
  }
}

function addLog(entry: LogEntry) {
  logs.push(entry)
  // Keep only the last MAX_LOGS entries
  if (logs.length > MAX_LOGS) {
    logs.shift()
  }
}

/**
 * Initialize the logger - intercepts console methods to capture logs
 */
export function initLogger() {
  console.log = (...args) => {
    addLog(createLogEntry("info", args))
    originalConsole.log(...args)
  }

  console.info = (...args) => {
    addLog(createLogEntry("info", args))
    originalConsole.info(...args)
  }

  console.warn = (...args) => {
    addLog(createLogEntry("warn", args))
    originalConsole.warn(...args)
  }

  console.error = (...args) => {
    addLog(createLogEntry("error", args))
    originalConsole.error(...args)
  }

  console.debug = (...args) => {
    addLog(createLogEntry("debug", args))
    originalConsole.debug(...args)
  }

  // Log initialization
  addLog({
    timestamp: new Date().toISOString(),
    level: "info",
    message: "Logger initialized",
  })
}

/**
 * Add a custom log entry directly
 */
export function log(level: LogLevel, message: string, data?: unknown) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
  }
  addLog(entry)

  // Also output to console
  switch (level) {
    case "debug":
      originalConsole.debug(message, data)
      break
    case "info":
      originalConsole.info(message, data)
      break
    case "warn":
      originalConsole.warn(message, data)
      break
    case "error":
      originalConsole.error(message, data)
      break
  }
}

/**
 * Log an error with full stack trace
 */
export function logError(error: Error, context?: string) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level: "error",
    message: context ? `[${context}] ${error.message}` : error.message,
    stack: error.stack,
  }
  addLog(entry)
  originalConsole.error(entry.message, error)
}

/**
 * Get all captured logs
 */
export function getLogs(): LogEntry[] {
  return [...logs]
}

/**
 * Clear all captured logs
 */
export function clearLogs() {
  logs.length = 0
}

/**
 * Format logs as a string for download/export
 */
export function formatLogsAsText(): string {
  const header = [
    "=".repeat(60),
    "APP LOGS EXPORT",
    `Generated: ${new Date().toISOString()}`,
    `Total entries: ${logs.length}`,
    `Environment: ${__DEV__ ? "Development" : "Production"}`,
    "=".repeat(60),
    "",
  ].join("\n")

  const logLines = logs
    .map((entry) => {
      const levelPad = entry.level.toUpperCase().padEnd(5)
      const lines = [`[${entry.timestamp}] ${levelPad} ${entry.message}`]

      if (entry.data) {
        try {
          lines.push(`  Data: ${JSON.stringify(entry.data, null, 2)}`)
        } catch {
          lines.push(`  Data: [Unable to serialize]`)
        }
      }

      if (entry.stack) {
        lines.push(`  Stack:\n${entry.stack.split("\n").map((l) => `    ${l}`).join("\n")}`)
      }

      return lines.join("\n")
    })
    .join("\n\n")

  return `${header}\n${logLines}`
}
