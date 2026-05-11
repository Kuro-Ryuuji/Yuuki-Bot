// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh: ${usedPrefix}${command} One Piece`

  const res = await fetch(`https://otakudesu.cloud/pencarian/?s=${encodeURIComponent(text)}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  })
  if (!res.ok) throw 'Gagal mengakses Otakudesu'

  const $ = cheerio.load(await res.text())
  const results = []
  $('.chivsrc li').each((i, el) => {
    if (i >= 5) return false
    results.push({
      title: $(el).find('h2 a').text().trim(),
      url: $(el).find('h2 a').attr('href'),
      img: $(el).find('img').attr('src'),
      genre: $(el).find('p:nth-child(2) span').text().trim()
    })
  })

  if (!results.length) throw 'Tidak ada hasil ditemukan di Otakudesu'

  const teks = results.map((r, i) => `${i + 1}. *${r.title}*\n   ${r.genre}\n   ${r.url}`).join('\n\n')
  await conn.sendMessage(m.chat, {
    image: { url: results[0].img },
    caption: `*${htki} OTAKUDESU ${htka}*\n\n${teks}`
  }, { quoted: m })
}

handler.help = ['otakudesu <anime>']
handler.tags = ['anime']
handler.command = /^(otakudesu|ods)$/i
export default handler
