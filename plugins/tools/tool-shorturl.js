// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'

let handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) throw `Contoh: ${usedPrefix}${command} https://example.com/url-panjang`

  const url = args.join(' ')
  const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`)
  if (!res.ok) throw 'Gagal mempersingkat URL'

  const shortUrl = await res.text()
  if (!shortUrl.startsWith('https://is.gd/')) throw 'URL tidak valid: ' + shortUrl

  m.reply(`🔗 *URL Shortener*\n\n*Original:* ${url}\n*Short:* ${shortUrl}\n\n${global.wm}`)
}

handler.help = ['shorturl <url>']
handler.tags = ['tools']
handler.command = /^(short(url)?|tinyurl)$/i
export default handler
