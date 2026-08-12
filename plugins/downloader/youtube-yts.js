import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Contoh: ${usedPrefix}${command} Naruto Opening`

  const res = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(text)}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  })
  const html = await res.text()

  const videoIds = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)]
    .map(m => m[1])
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 5)

  if (!videoIds.length) throw 'Tidak ada hasil ditemukan'

  const results = videoIds.map((id, i) => {
    const titleMatch = html.match(new RegExp(`"videoId":"${id}"[^}]*?"text":"([^"]+)"`, 's'))
    const title = titleMatch ? titleMatch[1] : `Video ${i + 1}`
    return `${i + 1}. *${title}*\nhttps://youtu.be/${id}`
  })

  m.reply(`*${htki} SEARCH ${htka}*\n\n${results.join('\n\n')}`)
}

handler.help = ['yts <query>']
handler.tags = ['downloader']
handler.command = /^yts(earch)?$/i
export default handler
