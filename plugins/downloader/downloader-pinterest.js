// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Contoh: ${usedPrefix}${command} https://pin.it/xxxxxx`
  const url = args[0]
  if (!url.includes('pinterest') && !url.includes('pin.it')) throw 'URL bukan dari Pinterest!'

  m.reply(global.wait)

  const pageRes = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  })
  if (!pageRes.ok) throw 'Gagal mengakses Pinterest'

  const html = await pageRes.text()
  const ogVideo = html.match(/<meta property="og:video" content="([^"]+)"/)?.[1]
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1]
  const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] || 'Pinterest'

  const caption = `📌 *${ogTitle}*\n\n${global.wm}`

  if (ogVideo) {
    await conn.sendMessage(m.chat, { video: { url: ogVideo }, caption, mimetype: 'video/mp4' }, { quoted: m })
  } else if (ogImage) {
    await conn.sendMessage(m.chat, { image: { url: ogImage }, caption }, { quoted: m })
  } else {
    throw 'Tidak dapat mengekstrak media dari URL ini'
  }
}

handler.help = ['pinterest <url>', 'pin <url>']
handler.tags = ['downloader']
handler.command = /^(pinterest|pintdl|pin)$/i
export default handler
