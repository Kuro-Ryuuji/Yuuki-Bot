import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh: ${usedPrefix}${command} Minecraft`

  let res = await fetch(`https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(text)}`)
  if (!res.ok) res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(text)}`)
  if (!res.ok) throw 'Ga ketemu di Wikipedia nih senpai'

  const json = await res.json()
  const link = json.content_urls?.desktop?.page || `https://id.wikipedia.org/wiki/${encodeURIComponent(text)}`
  const caption = `*${json.title}*\n\n${json.extract}\n\n🔗 ${link}`

  if (json.thumbnail?.source) {
    await conn.sendMessage(m.chat, { image: { url: json.thumbnail.source }, caption }, { quoted: m })
  } else {
    m.reply(caption)
  }
}

handler.help = ['wikipedia <topik>']
handler.tags = ['internet']
handler.command = /^(wiki|wikipedia)$/i
export default handler
