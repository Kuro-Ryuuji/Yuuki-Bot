// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'

let handler = async (m) => {
  const res = await fetch('https://api.animechan.io/v1/quotes/random')
  if (!res.ok) throw 'Gagal mengambil quote anime'

  const json = await res.json()
  const data = json.data
  m.reply(`🎌 *Anime Quote*\n\n_"${data.content}"_\n\n— *${data.character.name}*\n📺 *${data.anime.name}*\n\n${global.wm}`)
}

handler.help = ['animequote']
handler.tags = ['quotes']
handler.command = /^(animequote|quotenanime|animequotes)$/i
export default handler
