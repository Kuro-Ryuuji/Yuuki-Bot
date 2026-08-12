let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!text) throw `Contoh: ${usedPrefix}${command} packname|author`
  if (/video/g.test(mime) && (q.msg || q).seconds > 11) return m.reply('Maksimal 10 detik senpai!')
  
  m.reply(global.wait)
  
  try {
    let [packname, author] = text.split('|')
    let img = await q.download()
    
    if (/image/.test(mime)) {
      await conn.sendImageAsSticker(m.chat, img, m, { packname: packname || '', author: author || '' })
    } else if (/video/.test(mime)) {
      await conn.sendVideoAsSticker(m.chat, img, m, { packname: packname || '', author: author || '' })
    } else {
      throw `Reply gambar/video dengan caption ${usedPrefix}${command} packname|author`
    }
  } catch (e) {
    throw `Error: ${e.message || e}`
  }
}

handler.help = ['wm <packname>|<author>']
handler.tags = ['sticker']
handler.command = /^(wm|watermark)$/i
handler.limit = true
export default handler
