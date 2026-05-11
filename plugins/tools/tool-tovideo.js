// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import { webp2mp4 } from '../../lib/webp2mp4.js'
import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!/webp/.test(mime)) throw `Reply sticker dengan command ${usedPrefix + command}`
  
  m.reply(global.wait)
  
  try {
    let media = await q.download()
    let video = await webp2mp4(media)
    await conn.sendFile(m.chat, video, 'video.mp4', '*DONE*', m)
    fs.unlinkSync(video)
  } catch (e) {
    throw `Error: ${e.message || e}`
  }
}

handler.help = ['tovideo', 'togif']
handler.tags = ['tools']
handler.command = /^(tovideo|togif|tomp4)$/i
handler.limit = true
export default handler
