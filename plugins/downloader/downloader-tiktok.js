import ttdown from '../../lib/scraper/tiktok.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://vt.tiktok.com/ZSkGPK9Kj/`
  if (!text.match(/tiktok/gi)) throw `URL Tidak Ditemukan!`
  
  m.reply(global.wait)
  
  try {
    const result = await ttdown(text)
    let capt = `乂 *T I K T O K*\n\n◦ *Title* : ${result.title}\n◦ *Author* : ${result.author.username}\n\n${global.wm}`
    
    const video = result.downloads.find(d => d.type === 'nowatermark_hd' || d.type === 'nowatermark')
    const audio = result.downloads.find(d => d.type === 'mp3')
    
    if (video) {
      await conn.sendFile(m.chat, video.url, 'tiktok.mp4', capt, m)
    }
    
    if (audio) {
      await conn.sendMessage(m.chat, { audio: { url: audio.url }, mimetype: 'audio/mpeg' }, { quoted: m })
    }
  } catch (e) {
    throw `Error: ${e.message || e}`
  }
}

handler.help = ['tiktok <url>', 'tt <url>']
handler.tags = ['downloader']
handler.command = /^(tiktok|tt|tiktokdl|tiktoknowm)$/i
handler.limit = true
export default handler
