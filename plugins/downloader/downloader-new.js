import axios from 'axios'
import { fbdown, capcut } from 'btch-downloader'
import { aiodl, aiodownload } from '../../lib/scraper/aio.js'

// ─── Instagram Downloader ────────────────────────────────────
let handlerIG = async (m, { conn, text }) => {
    if (!text) throw `📸 *ɪɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*\n\n> \`${m.prefix}igdl <url>\``
    if (!/instagram\.com\/(p|reel|reels|stories|tv)\//i.test(text)) throw '❌ URL Instagram tidak valid'
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const res = await axios.get(`https://api.nexray.web.id/downloader/v2/instagram?url=${text}`, { timeout: 30000 }).catch(() => null)
    if (!res?.data?.status) throw '❌ Gagal mengambil media. Coba link lain.'
    const media = (res.data.result?.media || []).map(({ type, url }) =>
        type === 'mp4' ? { video: { url } } : { image: { url } }
    )
    if (!media.length) throw '❌ Tidak ada media ditemukan'
    await conn.sendMessage(m.chat, { albumMessage: media, contextInfo: { isForwarded: true, forwardingScore: 99 } }, { quoted: m })
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handlerIG.help = ['igdl <url>']
handlerIG.tags = ['downloader']
handlerIG.command = /^(instagramdl|igdl|instagram)$/i
export { handlerIG }

// ─── Facebook Downloader ─────────────────────────────────────
let handlerFB = async (m, { conn, text }) => {
    if (!text) throw `📘 *ꜰʙ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*\n\n> \`${m.prefix}fbdl <url>\``
    if (!text.match(/facebook\.com|fb\.watch/i)) throw '❌ URL Facebook tidak valid'
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const data = await fbdown(text).catch(() => null)
    if (!data?.status) throw '❌ Gagal mengambil video. Coba link lain.'
    const videoUrl = data.HD || data.Normal_video
    if (!videoUrl) throw '❌ Video tidak ditemukan'
    await conn.sendFile(m.chat, videoUrl, 'facebook.mp4', '', m)
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handlerFB.help = ['fbdl <url>']
handlerFB.tags = ['downloader']
handlerFB.command = /^(facebookdl|fbdl|fbdown)$/i
export { handlerFB }

// ─── CapCut Downloader ───────────────────────────────────────
let handlerCapcut = async (m, { conn, text }) => {
    if (!text) throw `✂️ *ᴄᴀᴘᴄᴜᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*\n\n> \`${m.prefix}ccdl <url>\``
    if (!text.match(/capcut\.com/i)) throw '❌ URL CapCut tidak valid'
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const data = await capcut(text).catch(() => null)
    if (!data?.status || !data?.originalVideoUrl) throw '❌ Gagal mengambil video. Coba link lain.'
    await conn.sendFile(m.chat, data.originalVideoUrl, 'capcut.mp4', '', m)
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handlerCapcut.help = ['ccdl <url>']
handlerCapcut.tags = ['downloader']
handlerCapcut.command = /^(capcutdl|ccdl|capcut|cc)$/i
export { handlerCapcut }

// ─── Spotify Downloader ──────────────────────────────────────
let handlerSpotify = async (m, { conn, text }) => {
    if (!text) throw `🎵 *sᴘᴏᴛɪꜰʏ ᴅᴏᴡɴʟᴏᴀᴅ*\n\n> \`${m.prefix}spdl <url>\``
    if (!/open\.spotify\.com\/track/i.test(text)) throw '❌ URL Spotify tidak valid'
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const res = await axios.get(`https://api.azbry.com/api/download/spotify?url=${encodeURIComponent(text)}`, { timeout: 30000 }).catch(() => null)
    if (!res?.data?.status || !res?.data?.downloadLink) throw '❌ Gagal mengambil lagu Spotify'
    const artist = Array.isArray(res.data.author) ? res.data.author.join(', ') : res.data.author || 'Spotify'
    await conn.sendMessage(m.chat, {
        audio: { url: res.data.downloadLink },
        mimetype: 'audio/mpeg',
        fileName: `${artist} - ${res.data.title}.mp3`,
        contextInfo: { externalAdReply: { title: res.data.title, body: artist, thumbnailUrl: res.data.cover, mediaType: 1, sourceUrl: text } }
    }, { quoted: m })
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handlerSpotify.help = ['spdl <url>']
handlerSpotify.tags = ['downloader']
handlerSpotify.command = /^(spotifydl|spdl|spotdl)$/i
export { handlerSpotify }

// ─── All In One Downloader ───────────────────────────────────
const VIDEO_FORMATS = ['1080', '720', '480', '360']
const AUDIO_FORMATS = ['mp3', 'wav']

let handlerAIO = async (m, { conn, text }) => {
    if (!text || !text.startsWith('http')) throw (
        `📥 *ᴀʟʟ ɪɴ ᴏɴᴇ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*\n\n> Download dari berbagai platform!\n> IG, TikTok, FB, Twitter, YouTube, dll\n\n> \`${m.prefix}aio <url>\``
    )
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const info = await aiodl(text).catch(() => null)
    if (!info?.token || !info?.formats?.length) throw '❌ Gagal mengambil data. Pastikan URL valid.'
    const bestVideo = VIDEO_FORMATS.find(f => info.formats.includes(f))
    const format = bestVideo || info.formats.find(f => !AUDIO_FORMATS.includes(f)) || info.formats[0]
    const dlResult = await aiodownload(info.token, format).catch(() => null)
    const downloadUrl = dlResult?.url || dlResult?.download || dlResult?.data?.url
    if (!downloadUrl) throw '❌ Gagal mendapatkan link download'
    const isAudio = AUDIO_FORMATS.includes(format)
    if (isAudio) {
        await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m })
    } else {
        await conn.sendFile(m.chat, downloadUrl, `aio.mp4`, info.title || '', m)
    }
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handlerAIO.help = ['aio <url>']
handlerAIO.tags = ['downloader']
handlerAIO.command = /^(aio|allinone)$/i
export { handlerAIO }

export default handlerIG
