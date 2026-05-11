// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Contoh: ${usedPrefix}${command} rumah`

  const res = await fetch(`https://kbbi.kemdikbud.go.id/entri/${encodeURIComponent(text.trim().toLowerCase())}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  })
  if (!res.ok) throw 'Gagal mengakses KBBI'

  const $ = cheerio.load(await res.text())

  if ($('h2').text().includes('Entri tidak ditemukan')) throw `Kata "${text}" tidak ditemukan di KBBI`

  const results = []
  $('ol > li').each((i, el) => {
    if (i >= 5) return false
    const t = $(el).text().trim()
    if (t) results.push(`${i + 1}. ${t}`)
  })

  if (!results.length) throw `Definisi untuk "${text}" tidak dapat diekstrak`

  m.reply(`📚 *KBBI — "${text.toUpperCase()}"*\n\n${results.join('\n\n')}\n\n_Sumber: kbbi.kemdikbud.go.id_\n${global.wm}`)
}

handler.help = ['kbbi <kata>']
handler.tags = ['tools', 'edukasi']
handler.command = /^(kbbi|kamus|artikata)$/i
export default handler
