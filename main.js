import './config.js'

import { createRequire } from "module"
import path, { join, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { 
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL) 
}

import * as ws from 'ws';
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch,
  writeFileSync,
  mkdirSync,
  rmSync
} from 'fs';

import yargs from 'yargs'
import { spawn } from 'child_process'
import lodash from 'lodash'
import syntaxerror from 'syntax-error'
import { tmpdir } from 'os'
import { format } from 'util'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import pino from 'pino'
import { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } from 'ourin-baileys'
import './lib/errorLogger.js'

const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

global.timestamp = {
  start: new Date
}

const __dirname = dirname(fileURLToPath(import.meta.url))

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎‎/!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`),
  {}
)

global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(async function () {
    if (!global.db.READ) {
      clearInterval(this)
      resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
    }
  }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = null
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = chain(global.db.data)
}
loadDatabase()

global.authFile = `${opts._[0] || 'elaina_session'}`
const { state, saveCreds: _saveCreds } = await useMultiFileAuthState(global.authFile)
let saveCreds = _saveCreds

const usePairingCode = global.usePairingCode === true
const pairingNumber = (global.pairingNumber || '').replace(/[^0-9]/g, '')

const { version, isLatest } = await fetchLatestBaileysVersion()
console.log(`\x1b[36m[VERSION]\x1b[0m WA v${version.join('.')} — isLatest: ${isLatest}`)

const connectionOptions = {
  version,
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
  },
  logger: pino({ level: 'silent' }),
  browser: ['Ubuntu', 'Chrome', '20.0.0'],
  syncFullHistory: false,
  markOnlineOnConnect: false,
  generateHighQualityLinkPreview: false,
  getMessage: async (key) => {
    return { conversation: 'hello' }
  }
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false

async function showAuthenticationMenu() {
  const { createInterface } = await import('readline')
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  
  console.log('\n\x1b[36m╔════════════════════════════════════╗\x1b[0m')
  console.log('\x1b[36m║     PILIH METODE AUTENTIKASI       ║\x1b[0m')
  console.log('\x1b[36m╠════════════════════════════════════╣\x1b[0m')
  console.log('\x1b[33m║  1. QR Code (Recommended)           ║\x1b[0m')
  console.log('\x1b[33m║  2. Pairing Code                    ║\x1b[0m')
  console.log('\x1b[36m╚════════════════════════════════════╝\x1b[0m\n')
  
  return new Promise(resolve => {
    rl.question('\x1b[36m📱 Pilih metode (1/2): \x1b[0m', answer => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

const pairingFlagFile = join(global.authFile, '.pairing_requested')
const PAIRING_TIMEOUT = 10000

if (!state.creds.registered && !existsSync(pairingFlagFile)) {
  let authMethod = usePairingCode ? '2' : '1'
  
  if (!global.usePairingCode && !global.pairingNumber) {
    authMethod = await showAuthenticationMenu()
  }
  
  try {
    mkdirSync(global.authFile, { recursive: true })
    writeFileSync(pairingFlagFile, authMethod)
  } catch (e) {
    console.error(`\x1b[33m[AUTH] Gagal membuat flag file: ${e.message}\x1b[0m`)
  }
  
  if (authMethod === '1') {
    console.log(`\x1b[32m[AUTH] Menggunakan metode QR Code\x1b[0m`)
  }
  
  else if (authMethod === '2') {
    console.log(`\x1b[32m[AUTH] Menggunakan metode Pairing Code\x1b[0m`)
    
    let phone = pairingNumber
    if (!phone) {
      const { createInterface } = await import('readline')
      const rl = createInterface({ input: process.stdin, output: process.stdout })
      phone = await new Promise(resolve => 
        rl.question('\x1b[36m📱 Masukkan nomor WA (contoh: 6281234567890): \x1b[0m', ans => { 
          rl.close()
          resolve(ans.replace(/[^0-9]/g, ''))
        })
      )
    }
    
    if (!phone) {
      console.error('\x1b[31m[PAIRING] Nomor WA tidak valid!\x1b[0m')
      process.exit(1)
    }
    
    try {
      mkdirSync(global.authFile, { recursive: true })
      writeFileSync(pairingFlagFile, `2:${phone}`)
    } catch (e) {
      console.error(`\x1b[33m[PAIRING] Gagal menyimpan nomor: ${e.message}\x1b[0m`)
    }
    
    const pairingTimeout = setTimeout(async () => {
      console.error(`\x1b[31m[PAIRING] Timeout! Pairing code tidak diterima dalam 10 detik\x1b[0m`)
      try {
        if (existsSync(pairingFlagFile)) unlinkSync(pairingFlagFile)
      } catch {}
      process.exit(1)
    }, PAIRING_TIMEOUT)
    
    setTimeout(async () => {
      try {
        console.log('\x1b[36m[PAIRING] Meminta pairing code...\x1b[0m')
        const pairCode = await conn.requestPairingCode(phone)
        clearTimeout(pairingTimeout)
        
        console.log('\n\x1b[42m\x1b[30m  PAIRING CODE  \x1b[0m')
        console.log(`\x1b[1m\x1b[32m  ${pairCode}  \x1b[0m`)
        console.log('\x1b[33m  Masukkan kode ini di WhatsApp:\x1b[0m')
        console.log('\x1b[33m  Settings → Linked Devices → Link a Device\x1b[0m')
        console.log('\x1b[90m  (Kode ini berlaku selama 10 menit)\x1b[0m\n')
      } catch (e) {
        clearTimeout(pairingTimeout)
        console.error(`\x1b[31m[PAIRING] Gagal: ${e.message}\x1b[0m`)
        try {
          if (existsSync(pairingFlagFile)) unlinkSync(pairingFlagFile)
        } catch {}
      }
    }, 1000)
  }
  
  else {
    console.error('\x1b[31m[AUTH] Pilihan tidak valid! Gunakan 1 atau 2\x1b[0m')
    try {
      if (existsSync(pairingFlagFile)) unlinkSync(pairingFlagFile)
    } catch {}
    process.exit(1)
  }
}

;['sendBut', 'send2Button', 'send3Button'].forEach(fn => {
  try {
    Object.defineProperty(conn, fn, {
      value: async (jid, content, footer, ...rest) => {
        const quoted = rest.find(r => r && typeof r === 'object' && r.key)
        return conn.sendMessage(jid, { text: `${content}\n\n_${footer || ''}_`.trim(), ...global.adReply }, { quoted })
      },
      writable: true, configurable: true
    })
  } catch {}
})

try {
  Object.defineProperty(conn, 'sendButton', {
    value: async (jid, text, footer, buffer, buttons, quoted, options) => {
      if (Array.isArray(buffer)) { options = quoted; quoted = buttons; buttons = buffer; buffer = null }
      const btnText = Array.isArray(buttons) ? buttons.map(b => Array.isArray(b) ? `• ${b[0]}` : `• ${b}`).join('\n') : ''
      return conn.sendMessage(jid, { text: `${text}\n\n${btnText}\n\n_${footer || ''}_`.trim(), ...global.adReply, ...options }, { quoted })
    },
    writable: true, configurable: true
  })
} catch {}

try {
  Object.defineProperty(conn, 'sendButtonDoc', {
    value: async (jid, content, footer, btn1, id1, quoted, options) => {
      return conn.sendMessage(jid, { text: `${content}\n\n• ${btn1}\n\n_${footer || ''}_`.trim(), ...global.adReply, ...options }, { quoted })
    },
    writable: true, configurable: true
  })
} catch {}

if (!opts['test']) {
  setInterval(async () => {
    if (global.db.data) await global.db.write().catch(console.error)
    if (opts['autocleartmp']) try {
      clearTmp()
    } catch (e) { console.error(e) }
  }, 60 * 1000)
}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT)

function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, './tmp')]
  const filename = []
  tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
  return filename.map(file => {
    const stats = statSync(file)
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file)
    return false
  })
}

import { createRequire as _cr } from 'module'
const _pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const PROJECT_NAME = _pkg.name.toUpperCase()
const PROJECT_AUTHOR = _pkg.author?.name || 'OmmniDevv'

function _banner() {
  const line = '─'.repeat(50)
  console.log(`\n\x1b[36m${line}\x1b[0m`)
  console.log(`\x1b[1m\x1b[35m  ★  ${PROJECT_NAME}\x1b[0m`)
  console.log(`\x1b[90m  By ${PROJECT_AUTHOR}  •  v${_pkg.version}\x1b[0m`)
  console.log(`\x1b[36m${line}\x1b[0m\n`)
}
_banner()

function _tag(label, color = '\x1b[36m') {
  return `${color}[${label}]\x1b[0m`
}

function deleteSession() {
  try {
    if (existsSync(global.authFile)) {
      rmSync(global.authFile, { recursive: true, force: true })
      console.log(`${_tag('SESSION', '\x1b[32m')} Folder session "${global.authFile}" berhasil dihapus`)
    }
    const pairingFlagFile = join(global.authFile, '.pairing_requested')
    if (existsSync(pairingFlagFile)) {
      unlinkSync(pairingFlagFile)
    }
  } catch (e) {
    console.error(`${_tag('SESSION', '\x1b[31m')} Gagal menghapus session: ${e.message}`)
  }
}

function getDisconnectReasonName(code) {
  const reasons = {
    [DisconnectReason.loggedOut]: 'Logged Out dari HP',
    [DisconnectReason.badSession]: 'Session Rusak / Corrupt',
    [DisconnectReason.connectionReplaced]: 'Koneksi Diganti Perangkat Lain',
    [DisconnectReason.restartRequired]: 'Perlu Restart Bot',
    [DisconnectReason.forbidden]: 'Akses Ditolak / Forbidden',
    [DisconnectReason.timedOut]: 'Koneksi Timeout',
    [DisconnectReason.connectionClosed]: 'Koneksi Ditutup',
    [DisconnectReason.multideviceMismatch]: 'Multi Device Mismatch'
  }
  return reasons[code] || 'Tidak Diketahui'
}

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin, qr } = update
  if (isNewLogin) conn.isInit = true
  
  const code = lastDisconnect?.error?.output?.statusCode || 
               lastDisconnect?.error?.output?.payload?.statusCode
  const errMsg = lastDisconnect?.error?.message || ''
  const errStack = lastDisconnect?.error?.stack || ''

  if (qr) {
    console.log('\n\x1b[42m\x1b[30m  QR CODE  \x1b[0m')
    console.log('\x1b[36mScan QR Code di atas dengan WhatsApp Anda\x1b[0m\n')
  }

  if (connection === 'close') {
    const isFetchError =
      errStack.includes('undici') ||
      errStack.includes('Fetch.') ||
      errStack.includes('onAborted')

    if (isFetchError) {
      console.log(`${_tag('CONN', '\x1b[33m')} Fetch error — reconnect tanpa hapus session`)
      setTimeout(() => global.reloadHandler(true).catch(console.error), 3000)
      return
    }

    const resetSessionCodes = [
      DisconnectReason.loggedOut,
      DisconnectReason.badSession,
      DisconnectReason.connectionReplaced,
      DisconnectReason.restartRequired,
      DisconnectReason.forbidden
    ]

    if (code && resetSessionCodes.includes(code)) {
      console.log(`\n${_tag('SESSION', '\x1b[31m')} ═══════════════════════════════`)
      console.log(`${_tag('SESSION', '\x1b[31m')} ERROR KODE: ${code}`)
      console.log(`${_tag('SESSION', '\x1b[31m')} ALASAN: ${getDisconnectReasonName(code)}`)
      console.log(`${_tag('SESSION', '\x1b[31m')} PESAN: ${errMsg || 'Tidak ada pesan'}`)
      console.log(`${_tag('SESSION', '\x1b[31m')} ═══════════════════════════════`)
      console.log(`${_tag('SESSION', '\x1b[33m')} Session rusak, menghapus folder session...`)
      
      deleteSession()
      
      console.log(`${_tag('SESSION', '\x1b[32m')} Session dihapus! Silakan restart bot untuk login ulang`)
      process.exit(1)
    }

    console.log(`${_tag('CONN', '\x1b[33m')} Disconnected — code: ${code}${errMsg ? ` (${errMsg})` : ''}`)
    console.log(`${_tag('SYSTEM')} Mencoba reconnect dalam 3 detik...`)
    setTimeout(() => global.reloadHandler(true).catch(console.error), 3000)
  }

  else if (connection === 'open') {
    const botName = global.namebot || PROJECT_NAME
    console.log(`${_tag('CONN', '\x1b[32m')} ✓ Connected — berjalan sebagai \x1b[1m${botName}\x1b[0m`)
    
    try {
      if (existsSync(pairingFlagFile)) unlinkSync(pairingFlagFile)
    } catch {}
    
    global.timestamp.connect = new Date
  }

  if (global.db.data == null) loadDatabase()
}

process.on('uncaughtException', (err) => {
  const isFetchError = err.stack && (
    err.stack.includes('undici') || 
    err.stack.includes('node-fetch') || 
    err.stack.includes('Fetch.') || 
    err.stack.includes('onAborted')
  )
  
  if (!isFetchError && /terminated|connection reset|ECONNRESET|ETIMEDOUT/i.test(err.message)) {
    console.log(`${_tag('ERROR', '\x1b[31m')} Uncaught exception — reconnecting...`)
    global.reloadHandler(true).catch(console.error)
  }
})

let isInit = true;
let handler = await import('./handler.js')
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) {
    console.error(e)
  }
  if (restatConn) {
    const oldChats = global.conn.chats
    try { global.conn.ws.close() } catch { }
    conn.ev.removeAllListeners()
    const { state: newState, saveCreds: newSaveCreds } = await useMultiFileAuthState(global.authFile)
    connectionOptions.auth = {
      creds: newState.creds,
      keys: makeCacheableSignalKeyStore(newState.keys, pino({ level: 'silent' }))
    }
    global.conn = makeWASocket(connectionOptions, { chats: oldChats })
    saveCreds = newSaveCreds
    isInit = true
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('groups.update', conn.groupsUpdate)
    conn.ev.off('message.delete', conn.onDelete)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }
  conn.welcome = '❖━━━━━━[ *いらっしゃいませ* ]━━━━━━❖\n\n┏––––––━━━━━━━━•\n│☘︎ @subject\n┣━━━━━━━━┅┅┅━━━━┫\n┃ *Selamat Datang di Group*\n┃━━━━━━━━━━━━━━━━\n┃ Tata tertib:\n┃ ✓ No SARA\n┃ ✓ No Spam\n┃ ✓ No Iklan\n┣━━━━━━━━━━━━━━━━┫\n┃ Jika tidak patuh akan dikeluarkan!\n┗━━━━━━━━━━━━━━━━┛\n\n*Selamat datang @user* 🎉'
  conn.bye = '❖━━━━━━[ *さようなら* ]━━━━━━❖\n𝚂𝚊𝚢𝚘𝚗𝚊𝚛𝚊𝚊 *@user* 👋😃'
  conn.spromote = '@user swlsmt senpai, kamu sekarang admin!'
  conn.sdemote = '@user aduh yang sabar ya senpai, kamu emang cocoknya jadi member ajaa 😭!'
  conn.sDesc = 'yatta, deskripsi grup berhasil diubah jadi \n@desc'
  conn.sSubject = 'yatta, judul grup berhasil diubah jadi \n@subject'
  conn.sIcon = 'yatta, icon grup berhasil diubah!'
  conn.sRevoke = 'yatta, link group berhasil diubah jadi \n@revoke'
  conn.handler = handler.handler.bind(global.conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
  conn.onDelete = handler.deleteUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveCreds.bind(global.conn)
  if (!conn.handler) console.error(`${_tag('ERROR', '\x1b[31m')} handler.handler is undefined!`)
  
  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('groups.update', conn.groupsUpdate)
  conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  console.log(`${_tag('HANDLER', '\x1b[36m')} Event listeners attached`)
  return true
}

const pluginFolder = join(__dirname, './plugins')
const pluginFilter = filename => /\.js$/.test(filename) && !filename.endsWith('.disabled')

function collectPluginFiles(dir) {
  const files = []
  if (dir.includes('node_modules') || dir.includes('.git')) return files
  
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'lib' || entry.name === 'test') continue
    
    if (entry.isDirectory()) {
      files.push(...collectPluginFiles(full))
    } else if (pluginFilter(entry.name)) {
      files.push(full)
    }
  }
  return files
}

global.plugins = {}
async function filesInit() {
  const files = collectPluginFiles(pluginFolder)
  let loaded = 0
  let failed = 0
  for (const file of files) {
    const key = file.replace(pluginFolder + '/', '').replace(pluginFolder + path.sep, '')
    try {
      const fileUrl = pathToFileURL(path.resolve(file)).href
      const module = await import(fileUrl)
      global.plugins[key] = module.default || module
      loaded++
    } catch (e) {
      failed++
      if (global.conn?.logger) {
        conn.logger.error(`Failed to load ${key}: ${e.message}`)
      } else {
        console.error(`Failed to load ${key}:`, e.message)
      }
      delete global.plugins[key]
    }
  }
  console.log(`${_tag('PLUGIN', '\x1b[32m')} \x1b[32m${loaded} plugins loaded\x1b[0m${failed > 0 ? ` \x1b[31m(${failed} failed)\x1b[0m` : ''}`)
}
filesInit().catch(console.error)

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = global.__filename(join(pluginFolder, filename), true)
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`requiring new plugin '${filename}'`)
    let err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true
    })
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
    else try {
      const fileUrl = pathToFileURL(path.resolve(dir)).href + '?update=' + Date.now()
      const module = await import(fileUrl)
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)

;(function watchRecursive(dir) {
  try { watch(dir, global.reload) } catch {}
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
        watchRecursive(join(dir, entry.name))
      }
    }
  } catch {}
})(pluginFolder)

await global.reloadHandler()

async function _quickTest() {
  let test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
        spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version'])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', () => resolve(false))
      })
    ])
  }))
  
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  console.log(`${_tag('CHECK', '\x1b[36m')} Dependencies check`)
  let s = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  }
  console.log(s)
  global.support = s
}
_quickTest().catch(console.error)
