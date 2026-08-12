import { bratGen } from 'brat-canvas'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🖼️ *ʙʀᴀᴛ*\n\nContoh: ${usedPrefix}${command} Hai semua`
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  
  try {
    const buf = await bratGen(text)
    await conn.sendImageAsSticker(m.chat, buf, m, { packname: global.stickpack, author: global.stickauth })
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (e) {
    conn.sendMessage(m.chat, { react: { text: '☢', key: m.key } })
    throw `Error: ${e.message || e}`
  }
}

handler.help = ['brat <teks>']
handler.tags = ['sticker']
handler.command = /^(brat|bratgreen|brat2|bratimg)$/i
export default handler
