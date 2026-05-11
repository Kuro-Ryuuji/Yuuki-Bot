/**
 * Elaina-MD — https://github.com/OmmniDevv/Elaina-MD
 * Script by OmmniDevv — Jangan Dijual!
 */
import axios from 'axios'
import * as cheerio from 'cheerio'

// ─── Lirik Lagu (Google Scrape) ────────────────────────────
async function googleLyrics(judul) {
  const q = 'lirik+' + judul.replaceAll(' ', '+')
  const res = await axios.get(`https://www.google.com/search?q=${q}&source=hp`, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
      'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    }, timeout: 15000
  })
  const $ = cheerio.load(res.data)
  const lyrics = $('div[data-attrid="kc:/music/recording_cluster:lyrics"] div[jsname="U8S5sf"]')
    .map((_, div) => $(div).find('span[jsname="YS01Ge"]').map((_, s) => $(s).text().trim()).get().join('\n')).get().join('\n\n')
  return {
    title: $('div[data-attrid="title"]').text().trim(),
    subtitle: $('div[data-attrid="subtitle"]').text().trim(),
    lyrics: lyrics || 'Lirik tidak ditemukan'
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🎶 *ʟɪʀɪᴋ*\n\nContoh: ${usedPrefix}${command} Somewhere only we know`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const json = await googleLyrics(text)
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  m.reply(`🎶 \`\`\`${json.title}\`\`\`\n> ${json.subtitle}\n\n${json.lyrics}`)
}
handler.help = ['lirik <judul lagu>']
handler.tags = ['internet']
handler.command = /^(lirikyt|lyricyt|liriklagu)$/i
export default handler

// ─── Spotify Search ────────────────────────────────────────
export const spotifySearchHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🎵 *sᴘᴏᴛɪꜰʏ*\n\nContoh: ${usedPrefix}${command} Bohemian Rhapsody`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const res = await axios.get(`https://api.fabdl.com/spotify/search?q=${encodeURIComponent(text)}&type=track&limit=5`, { timeout: 15000 })
  const tracks = res.data?.result?.tracks?.items
  if (!tracks?.length) throw '❌ Lagu tidak ditemukan'
  let txt = `🎵 *sᴘᴏᴛɪꜰʏ sᴇᴀʀᴄʜ*\n\n`
  tracks.slice(0, 5).forEach((t, i) => {
    txt += `${i+1}. *${t.name}*\n   👤 ${t.artists?.map(a=>a.name).join(', ')}\n   🔗 ${t.external_urls?.spotify||'-'}\n\n`
  })
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  m.reply(txt.trim())
}
spotifySearchHandler.help = ['spotify <query>']
spotifySearchHandler.tags = ['search']
spotifySearchHandler.command = /^(spotify|spotifysearch)$/i

// ─── NPM Search ────────────────────────────────────────────
export const npmHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `📦 *ɴᴘᴍ*\n\nContoh: ${usedPrefix}${command} axios`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const res = await axios.get(`https://registry.npmjs.org/${encodeURIComponent(text)}`, { timeout: 15000 })
  const d = res.data
  if (!d?.name) throw '❌ Package tidak ditemukan'
  const latest = d['dist-tags']?.latest
  const v = d.versions?.[latest] || {}
  const txt = `📦 *ɴᴘᴍ ᴘᴀᴄᴋᴀɢᴇ*\n\n📛 *Nama:* ${d.name}\n📝 *Deskripsi:* ${d.description||'-'}\n🏷️ *Versi:* ${latest||'-'}\n👤 *Author:* ${d.author?.name||'-'}\n📜 *Lisensi:* ${v.license||'-'}\n\n🔗 https://npmjs.com/package/${d.name}`
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  m.reply(txt)
}
npmHandler.help = ['npm <package>']
npmHandler.tags = ['search']
npmHandler.command = /^(npm|npmjs)$/i

// ─── Bing Image Search ─────────────────────────────────────
export const bingimageHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🖼️ *ʙɪɴɢ ɪᴍᴀɢᴇ*\n\nContoh: ${usedPrefix}${command} anime girl`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const res = await axios.get(`https://www.bing.com/images/search?q=${encodeURIComponent(text)}&form=HDRSC2&first=1`, {
    headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }, timeout: 15000
  })
  const $ = cheerio.load(res.data)
  const imgs = []
  $('a.iusc').each((_, el) => {
    try { const m = JSON.parse($(el).attr('m')); if (m?.murl) imgs.push(m.murl) } catch {}
  })
  if (!imgs.length) throw '❌ Gambar tidak ditemukan'
  const url = imgs[Math.floor(Math.random() * Math.min(imgs.length, 10))]
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  await conn.sendMessage(m.chat, { image: { url }, caption: `🖼️ *${text}*` }, { quoted: m })
}
bingimageHandler.help = ['bingimage <query>']
bingimageHandler.tags = ['search']
bingimageHandler.command = /^(bingimage|bingimg|imgsearch)$/i

// ─── YouTube Search ────────────────────────────────────────
export const ytsHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `▶️ *ʏᴛ sᴇᴀʀᴄʜ*\n\nContoh: ${usedPrefix}${command} Bohemian Rhapsody`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const { default: yts } = await import('yt-search')
  const res = await yts(text)
  const videos = res.videos?.slice(0, 5)
  if (!videos?.length) throw '❌ Video tidak ditemukan'
  let txt = `▶️ *ʏᴏᴜᴛᴜʙᴇ sᴇᴀʀᴄʜ*\n\n`
  videos.forEach((v, i) => {
    txt += `${i+1}. *${v.title}*\n   👤 ${v.author?.name||'-'} | ⏱️ ${v.timestamp||'-'}\n   🔗 ${v.url}\n\n`
  })
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  m.reply(txt.trim())
}
ytsHandler.help = ['yts <query>']
ytsHandler.tags = ['search']
ytsHandler.command = /^(yts|ytsearch|youtubesearch)$/i
