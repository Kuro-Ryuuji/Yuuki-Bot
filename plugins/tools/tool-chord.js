import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

const BASE = 'https://www.chordtela.live'
const HEADERS = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }

async function searchChord(query) {
  const res = await fetch(`${BASE}/?s=${encodeURIComponent(query)}`, { headers: HEADERS })
  if (!res.ok) throw 'Gagal ngambil data chord nih senpai'
  const $ = cheerio.load(await res.text())
  const results = []
  $('h2.entry-title a, .post-title a, article h2 a').each((i, el) => {
    if (i >= 5) return false
    results.push({ title: $(el).text().trim(), url: $(el).attr('href') })
  })
  return results
}

async function getChord(url) {
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) return null
  const $ = cheerio.load(await res.text())
  const title = $('h1.entry-title, h1.post-title').first().text().trim()
  const capo = $('*').filter((_, el) => $(el).text().toLowerCase().includes('capo')).first().text().trim().slice(0, 50)
  let chord = $('pre, .chord-content, .entry-content pre').first().text().trim()
  if (!chord) chord = $('.entry-content').text().trim().slice(0, 2000)
  return { title, capo, chord }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh: ${usedPrefix}${command} Kangen Band - Pujaan Hati`

  const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  let chordData = null
  try {
    chordData = await getChord(`${BASE}/${slug}/`)
    if (!chordData?.chord) chordData = null
  } catch { chordData = null }

  if (chordData?.chord) {
    let out = `🎸 *${chordData.title || text}*`
    if (chordData.capo) out += `\n📌 ${chordData.capo}`
    out += '\n\n'
    const body = chordData.chord.length > 2800 ? chordData.chord.slice(0, 2800) + '\n...(dipotong)' : chordData.chord
    out += body
    return m.reply(out)
  }

  const results = await searchChord(text)
  if (!results.length) throw 'Chord ga ketemu senpai'

  try {
    chordData = await getChord(results[0].url)
  } catch { chordData = null }

  if (chordData?.chord) {
    let out = `🎸 *${chordData.title || results[0].title}*`
    if (chordData.capo) out += `\n📌 ${chordData.capo}`
    out += '\n\n'
    const body = chordData.chord.length > 2800 ? chordData.chord.slice(0, 2800) + '\n...(dipotong)' : chordData.chord
    out += body
    return m.reply(out)
  }

  m.reply(`🎸 *Hasil Pencarian: ${text}*\n\n` +
    results.map((r, i) => `${i + 1}. *${r.title}*\n   ${r.url}`).join('\n\n'))
}

handler.help = ['chord <judul lagu>']
handler.tags = ['tools']
handler.command = /^(chord|chords)$/i
handler.limit = true
export default handler
