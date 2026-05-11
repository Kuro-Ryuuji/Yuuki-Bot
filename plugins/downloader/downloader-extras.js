/**
 * Elaina-MD — https://github.com/OmmniDevv/Elaina-MD
 * Script by OmmniDevv — Jangan Dijual!
 */
import axios from 'axios'

// ─── YouTube MP4 ───────────────────────────────────────────
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh: ${usedPrefix}${command} https://youtube.com/watch?v=xxx`
  if (!text.includes('youtube.com') && !text.includes('youtu.be')) throw '❌ URL harus YouTube'
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  let dlUrl
  try {
    const { data } = await axios.get(`https://api.nexray.eu.cc/downloader/v1/ytmp4?url=${encodeURIComponent(text)}&resolusi=1080`, { timeout: 30000 })
    dlUrl = data?.result?.url
  } catch {}
  if (!dlUrl) {
    const { data } = await axios.get(`https://api.cobalt.tools/api/json`, {
      method: 'POST', data: { url: text, vQuality: '720' },
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, timeout: 30000
    }).catch(() => ({ data: null }))
    dlUrl = data?.url
  }
  if (!dlUrl) throw '❌ Gagal mendapatkan URL download'
  await conn.sendMessage(m.chat, { video: { url: dlUrl }, caption: `🎬 ${text}` }, { quoted: m })
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handler.help = ['ytmp4 <url>', 'ytvideo <url>']
handler.tags = ['downloader']
handler.command = /^(ytmp4|youtubemp4|ytvideo)$/i
export default handler

// ─── YouTube MP3 ───────────────────────────────────────────
export const ytmp3Handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh: ${usedPrefix}${command} https://youtube.com/watch?v=xxx`
  if (!text.includes('youtube.com') && !text.includes('youtu.be')) throw '❌ URL harus YouTube'
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  let dlUrl, title
  try {
    const { data } = await axios.get(`https://api.nexray.eu.cc/downloader/v1/ytmp3?url=${encodeURIComponent(text)}`, { timeout: 30000 })
    dlUrl = data?.result?.url
    title = data?.result?.title
  } catch {}
  if (!dlUrl) throw '❌ Gagal mendapatkan URL download'
  await conn.sendMessage(m.chat, { audio: { url: dlUrl }, mimetype: 'audio/mpeg', ptt: false, fileName: `${title||'audio'}.mp3` }, { quoted: m })
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
ytmp3Handler.help = ['ytmp3 <url>', 'ytaudio <url>']
ytmp3Handler.tags = ['downloader']
ytmp3Handler.command = /^(ytmp3|youtubemp3|ytaudio)$/i

// ─── TikTok Download ───────────────────────────────────────
export const tiktokdl2Handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `📌 Contoh: ${usedPrefix}${command} https://vt.tiktok.com/...`
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  const res = await axios.post('https://www.tikwm.com/api/', {}, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'Mozilla/5.0' },
    params: { url: text, count: 12, cursor: 0, web: 1, hd: 1 }, timeout: 30000
  })
  const d = res.data?.data
  if (!d) throw '❌ Gagal download TikTok'
  if (d.duration > 0) {
    const vidUrl = 'https://www.tikwm.com' + (d.hdplay || d.play)
    await conn.sendMessage(m.chat, { video: { url: vidUrl }, caption: d.title || '' }, { quoted: m })
  } else {
    for (const img of (d.images || [])) {
      await conn.sendMessage(m.chat, { image: { url: img } }, { quoted: m })
    }
  }
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
tiktokdl2Handler.help = ['tt2 <url>', 'tiktok2 <url>']
tiktokdl2Handler.tags = ['downloader']
tiktokdl2Handler.command = /^(tt2|tiktok2|tiktokdl2)$/i

// ─── Instagram Download ────────────────────────────────────
export const igdlHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `📌 Contoh: ${usedPrefix}${command} https://instagram.com/p/xxx`
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  const res = await axios.get(`https://api.cobalt.tools/api/json`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    data: { url: text }, timeout: 30000
  }).catch(() => null)
  const url = res?.data?.url
  if (!url) throw '❌ Gagal download Instagram'
  const isVideo = /\.mp4/.test(url) || res?.data?.type === 'video'
  if (isVideo) await conn.sendMessage(m.chat, { video: { url }, caption: '' }, { quoted: m })
  else await conn.sendMessage(m.chat, { image: { url } }, { quoted: m })
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
igdlHandler.help = ['igdl <url>', 'instagramdl <url>']
igdlHandler.tags = ['downloader']
igdlHandler.command = /^(igdl|instagramdl|igdownload)$/i

// ─── Spotify Download ──────────────────────────────────────
export const spotifydlHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `📌 Contoh: ${usedPrefix}${command} https://open.spotify.com/track/xxx`
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  const res = await axios.get(`https://api.fabdl.com/spotify/get?url=${encodeURIComponent(text)}`, { timeout: 30000 })
  const d = res.data?.result
  if (!d) throw '❌ Gagal mendapatkan info lagu'
  const dlRes = await axios.get(`https://api.fabdl.com/spotify/mp3-convert-task/${d.gid}/${d.id}`, { timeout: 60000 })
  const dlUrl = dlRes.data?.result?.download_url
  if (!dlUrl) throw '❌ Gagal mendapatkan URL download'
  await conn.sendMessage(m.chat, {
    audio: { url: dlUrl }, mimetype: 'audio/mpeg', ptt: false,
    fileName: `${d.name||'spotify'}.mp3`
  }, { quoted: m })
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
spotifydlHandler.help = ['spotifydl <url>']
spotifydlHandler.tags = ['downloader']
spotifydlHandler.command = /^(spotifydl|spotifydown)$/i

// ─── MediaFire Download ────────────────────────────────────
export const mediafiredlHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `📌 Contoh: ${usedPrefix}${command} https://mediafire.com/file/xxx`
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  // Scrape mediafire directly
  const page = await axios.get(text, { timeout: 30000, headers: { 'user-agent': 'Mozilla/5.0' } })
  const html = page.data
  const dlMatch = html.match(/href="(https:\/\/download\d+\.mediafire\.com[^"]+)"/)
  const nameMatch = html.match(/<div class="filename">([^<]+)<\/div>/) || html.match(/id="downloadButton"[^>]*>([^<]+)</)
  if (!dlMatch) throw '❌ Gagal download MediaFire'
  const dlUrl = dlMatch[1]
  const filename = nameMatch?.[1]?.trim() || 'file'
  const caption = `📁 *${filename}*`
  await conn.sendMessage(m.chat, { document: { url: dlUrl }, fileName: filename, mimetype: 'application/octet-stream', caption }, { quoted: m })
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
mediafiredlHandler.help = ['mediafiredl <url>']
mediafiredlHandler.tags = ['downloader']
mediafiredlHandler.command = /^(mediafiredl|mfdl)$/i

// ─── Pinterest Download ────────────────────────────────────
export const pindlHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `📌 Contoh: ${usedPrefix}${command} https://pin.it/xxx`
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  // Use ilovepin.net scraper
  const mainPage = await axios.get('https://ilovepin.net/id', {
    headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    timeout: 15000
  })
  const cookies = mainPage.headers['set-cookie']?.map(c => c.split(';')[0]).join('; ') || ''
  const $ = (await import('cheerio')).load(mainPage.data)
  const token = $('input[name=_token]').val() || ''
  const params = new URLSearchParams({ url: text, _token: token })
  const { data } = await axios.post('https://ilovepin.net/proxy.php', params, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'cookie': cookies, 'referer': 'https://ilovepin.net/id'
    }, timeout: 30000
  })
  const mediaUrl = data?.data?.[0]?.mediaUrl || data?.data?.mediaUrl
  if (!mediaUrl) throw '❌ Gagal download Pinterest'
  const isVideo = /\.mp4/.test(mediaUrl)
  if (isVideo) await conn.sendMessage(m.chat, { video: { url: mediaUrl } }, { quoted: m })
  else await conn.sendMessage(m.chat, { image: { url: mediaUrl } }, { quoted: m })
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
pindlHandler.help = ['pindl <url>']
pindlHandler.tags = ['downloader']
pindlHandler.command = /^(pindl|pinterestdl)$/i

// ─── Facebook Download ─────────────────────────────────────
export const fbdlHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `📌 Contoh: ${usedPrefix}${command} https://facebook.com/...`
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  const res = await axios.get(`https://api.cobalt.tools/api/json`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    data: { url: text }, timeout: 30000
  }).catch(() => null)
  const url = res?.data?.url
  if (!url) throw '❌ Gagal download Facebook'
  await conn.sendMessage(m.chat, { video: { url } }, { quoted: m })
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
fbdlHandler.help = ['fbdl <url>', 'facebookdl <url>']
fbdlHandler.tags = ['downloader']
fbdlHandler.command = /^(fbdl|facebookdl|fbdown)$/i

// ─── CapCut Download ───────────────────────────────────────
export const capcutdlHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `📌 Contoh: ${usedPrefix}${command} https://www.capcut.com/t/xxx`
  if (!text.match(/capcut\.com/i)) throw '❌ URL tidak valid. Gunakan link CapCut.'
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  try {
    const { capcut } = await import('btch-downloader')
    const data = await capcut(text)
    if (!data?.status || !data?.originalVideoUrl) throw '❌ Gagal mengambil video'
    await conn.sendFile(m.chat, data.originalVideoUrl, 'capcut.mp4', '', m)
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (e) {
    conn.sendMessage(m.chat, { react: { text: '☢', key: m.key } })
    throw `Error: ${e.message || e}`
  }
}
capcutdlHandler.help = ['capcutdl <url>', 'ccdl <url>']
capcutdlHandler.tags = ['downloader']
capcutdlHandler.command = /^(capcutdl|ccdl|capcut)$/i

// ─── SnackVideo Download ───────────────────────────────────
export const snackvideodlHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `📌 Contoh: ${usedPrefix}${command} https://www.snackvideo.com/...`
  if (!text.match(/snackvideo\.com/i)) throw '❌ URL tidak valid. Gunakan link SnackVideo.'
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  try {
    const { snackvideo } = await import('btch-downloader')
    const data = await snackvideo(text)
    if (!data?.status || !data?.result?.videoUrl) throw '❌ Gagal mengambil video'
    await conn.sendFile(m.chat, data.result.videoUrl, 'snackvideo.mp4', '', m)
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (e) {
    conn.sendMessage(m.chat, { react: { text: '☢', key: m.key } })
    throw `Error: ${e.message || e}`
  }
}
snackvideodlHandler.help = ['svdl <url>', 'snackvideo <url>']
snackvideodlHandler.tags = ['downloader']
snackvideodlHandler.command = /^(svdl|snackvideo|snackvideodl)$/i

// ─── TikTok MP3 ────────────────────────────────────────────
export const ttmp3Handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `📌 Contoh: ${usedPrefix}${command} https://vt.tiktok.com/xxx`
  if (!text.match(/tiktok\.com|vt\.tiktok/i)) throw '❌ URL tidak valid. Gunakan link TikTok.'
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  try {
    const ttdown = (await import('../../lib/scraper/tiktok.js')).default
    const result = await ttdown(text)
    const audio = result.downloads.find(d => d.type === 'mp3')
    if (!audio?.url) throw '❌ Audio TikTok tidak ditemukan'
    await conn.sendMessage(m.chat, {
      audio: { url: audio.url }, mimetype: 'audio/mpeg',
      fileName: `TikTok_${Date.now()}.mp3`
    }, { quoted: m })
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (e) {
    conn.sendMessage(m.chat, { react: { text: '☢', key: m.key } })
    throw `Error: ${e.message || e}`
  }
}
ttmp3Handler.help = ['ttmp3 <url>', 'tiktokmp3 <url>']
ttmp3Handler.tags = ['downloader']
ttmp3Handler.command = /^(ttmp3|tiktokmp3|ttmusic)$/i
