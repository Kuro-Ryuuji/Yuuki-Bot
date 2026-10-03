import { toAudio } from '../../lib/converter.js'
import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!/video|audio/.test(mime)) throw `Reply video/audio dengan command ${usedPrefix + command}`
  
  m.reply(global.wait)
  
  try {
    let media = await q.download()
    let audio = await toAudio(media, 'mp3')
    await conn.sendFile(m.chat, audio, 'audio.mp3', '', m, null, { mimetype: 'audio/mpeg' })
    fs.unlinkSync(audio)
  } catch (e) {
    throw `Error: ${e.message || e}`
  }
}

handler.help = ['tomp3']
handler.tags = ['audio']
handler.command = /^(to(mp3|audio))$/i
handler.limit = true
export default handler
