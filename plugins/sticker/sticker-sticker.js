let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (/image/.test(mime)) {
    let media = await q.download()
    m.reply(global.wait)
    await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
  } else if (/video/.test(mime)) {
    if ((q.msg || q).seconds > 7) return m.reply('Maksimal 6 detik senpai!')
    let media = await q.download()
    m.reply(global.wait)
    await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
  } else {
    throw `Kirim Gambar/Video dengan caption ${usedPrefix + command}\nDurasi Video 1-6 detik`
  }
}

handler.help = ['sticker', 's']
handler.tags = ['sticker']
handler.command = /^(stiker|s|sticker)$/i
handler.limit = true
export default handler
