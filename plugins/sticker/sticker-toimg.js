// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import { webp2png } from '../../lib/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!/webp/.test(mime)) throw `Reply sticker dengan command ${usedPrefix + command}`
  
  m.reply(global.wait)
  
  try {
    let media = await q.download()
    let out = await webp2png(media)
    await conn.sendFile(m.chat, out, 'image.png', '*DONE*', m)
  } catch (e) {
    throw `Error: ${e.message || e}`
  }
}

handler.help = ['toimg']
handler.tags = ['sticker']
handler.command = /^(toimg)$/i
handler.limit = true
export default handler
