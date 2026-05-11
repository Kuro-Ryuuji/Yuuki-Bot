/**
 * Elaina-MD — https://github.com/OmmniDevv/Elaina-MD
 * Script by OmmniDevv — Jangan Dijual!
 */
import axios from 'axios'
import fs from 'fs'
import path from 'path'

// Helper: TTS via Groq (free) or fallback to gtts
async function ttsGroq(text, voice = 'aura-asteria-en') {
  const key = global.APIKeys?.groq
  if (!key) return null
  try {
    const res = await axios.post('https://api.groq.com/openai/v1/audio/speech', {
      model: 'playai-tts', input: text, voice
    }, { headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' }, responseType: 'arraybuffer', timeout: 30000 })
    return Buffer.from(res.data)
  } catch { return null }
}

async function ttsGtts(text, lang = 'id') {
  const { default: gtts } = await import('gtts')
  const tmpDir = path.join(process.cwd(), 'tmp')
  fs.mkdirSync(tmpDir, { recursive: true })
  const tmpFile = path.join(tmpDir, `tts_${Date.now()}.mp3`)
  await new Promise((res, rej) => {
    const t = new gtts(text, lang)
    t.save(tmpFile, e => e ? rej(e) : res())
  })
  const buf = fs.readFileSync(tmpFile)
  fs.unlinkSync(tmpFile)
  return buf
}

// ─── TTS (default) ─────────────────────────────────────────
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🔊 *ᴛᴛs*\n\nContoh: ${usedPrefix}${command} Halo dunia`
  m.react('🕕')
  let buf = await ttsGtts(text, 'id')
  if (!buf) throw '❌ Gagal generate TTS'
  await conn.sendMessage(m.chat, { audio: buf, mimetype: 'audio/mpeg', ptt: false }, { quoted: m })
  m.react('✅')
}
handler.help = ['tts <teks>']
handler.tags = ['tts']
handler.command = /^(tts|texttospeech)$/i
export default handler

// ─── TTS Eminem (speed up) ─────────────────────────────────
export const ttsEminemHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🎤 *ᴛᴛs ᴇᴍɪɴᴇᴍ*\n\nContoh: ${usedPrefix}${command} Halo dunia`
  m.react('🕕')
  const res = await axios.get(`https://api.emiliabot.my.id/tools/text-to-speech?text=${encodeURIComponent(text)}`, {
    timeout: 60000
  }).catch(() => null)
  const voiceUrl = res?.data?.result?.find(v => v.eminem)?.eminem
  if (!voiceUrl) throw '❌ Gagal generate TTS Eminem'
  const audio = await axios.get(voiceUrl, { responseType: 'arraybuffer', timeout: 30000 })
  await conn.sendMessage(m.chat, { audio: Buffer.from(audio.data), mimetype: 'audio/mpeg', ptt: false }, { quoted: m })
  m.react('✅')
}
ttsEminemHandler.help = ['ttseminem <teks>']
ttsEminemHandler.tags = ['tts']
ttsEminemHandler.command = /^ttseminem$/i

// ─── TTS Goku ──────────────────────────────────────────────
export const ttsGokuHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🐉 *ᴛᴛs ɢᴏᴋᴜ*\n\nContoh: ${usedPrefix}${command} Halo dunia`
  m.react('🕕')
  const res = await axios.get(`https://api.emiliabot.my.id/tools/text-to-speech?text=${encodeURIComponent(text)}`, {
    timeout: 60000
  }).catch(() => null)
  const voiceUrl = res?.data?.result?.find(v => v.goku)?.goku
  if (!voiceUrl) throw '❌ Gagal generate TTS Goku'
  const audio = await axios.get(voiceUrl, { responseType: 'arraybuffer', timeout: 30000 })
  await conn.sendMessage(m.chat, { audio: Buffer.from(audio.data), mimetype: 'audio/mpeg', ptt: false }, { quoted: m })
  m.react('✅')
}
ttsGokuHandler.help = ['ttsgoku <teks>']
ttsGokuHandler.tags = ['tts']
ttsGokuHandler.command = /^ttsgoku$/i

// ─── TTS Mickey ────────────────────────────────────────────
export const ttsMickeyHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🐭 *ᴛᴛs ᴍɪᴄᴋᴇʏ*\n\nContoh: ${usedPrefix}${command} Halo dunia`
  m.react('🕕')
  const res = await axios.get(`https://api.emiliabot.my.id/tools/text-to-speech?text=${encodeURIComponent(text)}`, {
    timeout: 60000
  }).catch(() => null)
  const voiceUrl = res?.data?.result?.find(v => v.mickey_mouse)?.mickey_mouse
  if (!voiceUrl) throw '❌ Gagal generate TTS Mickey'
  const audio = await axios.get(voiceUrl, { responseType: 'arraybuffer', timeout: 30000 })
  await conn.sendMessage(m.chat, { audio: Buffer.from(audio.data), mimetype: 'audio/mpeg', ptt: false }, { quoted: m })
  m.react('✅')
}
ttsMickeyHandler.help = ['ttsmickey <teks>']
ttsMickeyHandler.tags = ['tts']
ttsMickeyHandler.command = /^ttsmickey$/i
