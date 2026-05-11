// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh: ${usedPrefix}${command} Naruto`

  const res = await fetch(`https://kusonime.com/?s=${encodeURIComponent(text)}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  })
  if (!res.ok) throw 'Gagal mengambil data Kusonime'

  const $ = cheerio.load(await res.text())
  const results = []
  $('.bsx').each((i, el) => {
    if (i >= 5) return false
    results.push({
      title: $(el).find('.tt h2').text().trim(),
      url: $(el).find('a').attr('href'),
      img: $(el).find('img').attr('src'),
      genre: $(el).find('.typez').text().trim()
    })
  })

  if (!results.length) throw 'Tidak ada hasil ditemukan di Kusonime'

  const teks = results.map((r, i) => `${i + 1}. *${r.title}*\n   ${r.genre}\n   ${r.url}`).join('\n\n')
  await conn.sendMessage(m.chat, {
    image: { url: results[0].img },
    caption: `*${htki} KUSONIME ${htka}*\n\n${teks}`
  }, { quoted: m })
}

handler.help = ['kusonime <anime>']
handler.tags = ['anime']
handler.command = /^kusonime$/i
export default handler
