// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import mediafire from '../../lib/scraper/mediafire.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://www.mediafire.com/file/xxx`
  if (!args[0].match(/mediafire/gi)) throw `URL Tidak Ditemukan!`
  
  m.reply(global.wait)
  
  try {
    const result = await mediafire(args[0])
    let capt = `乂 *M E D I A F I R E*\n\n◦ *Title* : ${result.meta.title}\n◦ *Size* : ${result.download.size}\n◦ *Type* : ${result.download.mimetype}\n\n${global.wm}`
    
    await conn.sendFile(m.chat, result.download.link_download, result.meta.title, capt, m, null, { mimetype: result.download.mimetype, asDocument: true })
  } catch (e) {
    throw `Error: ${e.message || e}`
  }
}
handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(mediafire|mf)$/i
handler.limit = true

export default handler
