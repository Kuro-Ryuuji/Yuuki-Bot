import fs from 'fs'
import path from 'path'

const LOG_DIR = './log'
const LOG_FILE = path.join(LOG_DIR, 'error.log')

try {
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true })
} catch (e) {
  console.error('[LOG] Gagal buat direktori log:', e.message)
}

export function logError(context, error) {
  const timestamp = new Date().toISOString()
  const errMsg = error instanceof Error
    ? `${error.message}\nStack: ${error.stack}`
    : (typeof error === 'object' ? JSON.stringify(error, null, 2) : String(error))
  const entry = `[${timestamp}] [ERROR] [${context}]\n${errMsg}\n${'─'.repeat(72)}\n`
  console.error(`\x1b[31m[ERROR]\x1b[0m [${context}] ${error?.message || error}`)
  try { fs.appendFileSync(LOG_FILE, entry, 'utf8') } catch {}
}

export function logInfo(context, message) {
  console.log(`\x1b[36m[INFO]\x1b[0m [${new Date().toISOString()}] [${context}] ${message}`)
}

process.on('uncaughtException', (err) => logError('uncaughtException', err))
process.on('unhandledRejection', (reason) => {
  logError('unhandledRejection', reason instanceof Error ? reason : new Error(String(reason)))
})
