// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Contoh: ${usedPrefix}${command} 177013`

  const id = args[0]
  const res = await fetch(`https://nhentai.net/api/gallery/${id}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  })
  if (!res.ok) throw 'Tidak ditemukan atau ID salah'

  const data = await res.json()
  const title = data.title?.english || data.title?.japanese || 'Unknown'
  const tags = data.tags?.filter(t => t.type === 'tag').map(t => t.name).slice(0, 8).join(', ')
  const thumb = `https://t.nhentai.net/galleries/${data.media_id}/thumb.jpg`

  await conn.sendMessage(m.chat, {
    image: { url: thumb },
    caption: `📚 *${title}*\n\n📄 Pages: ${data.num_pages}\n🏷️ Tags: ${tags}\n\n🔞 https://nhentai.net/g/${id}/`
  }, { quoted: m })
}

handler.tags = ['nsfw']
handler.command = /^(nh|nhentai|doujin)$/i
handler.help = ['nhentai <id>']
handler.nsfw = true
export default handler
