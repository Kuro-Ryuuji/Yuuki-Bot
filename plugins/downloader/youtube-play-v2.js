// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// Makasih kode nya OURIN
import yts from 'yt-search'
import axios from 'axios'

function formatViews(n) {
    if (!n) return '0'
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
    return n.toString()
}

async function getAudioUrl(videoUrl) {
    // Primary: nexray API
    try {
        const { data } = await axios.get(
            `https://api.nexray.eu.cc/downloader/v1/ytmp3?url=${encodeURIComponent(videoUrl)}`,
            { timeout: 15000 }
        )
        if (data?.result?.url) return { url: data.result.url, title: data.result.title }
    } catch { }

    // Fallback 1: siputzx
    try {
        const { data } = await axios.get(
            `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(videoUrl)}`,
            { timeout: 15000 }
        )
        if (data?.data?.dl) return { url: data.data.dl, title: data.data.title }
    } catch { }

    // Fallback 2: ryzendesu
    try {
        const { data } = await axios.get(
            `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(videoUrl)}`,
            { timeout: 15000 }
        )
        if (data?.url) return { url: data.url, title: data.title }
    } catch { }

    throw 'Gagal mendapatkan audio. Coba lagi nanti.'
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const query = (text || '').trim()
    if (!query) return m.reply(`🎵 *PLAY*\n\nContoh: *${usedPrefix}${command} nama lagu*`)

    m.react('🕐')

    const search = await yts(query)
    if (!search?.videos?.length) throw 'Video tidak ditemukan!'

    const video = search.videos[0]

    const info = `🎵 *NOW PLAYING*

📌 *${video.title}*

👤 Channel: *${video.author.name}*
⏱️ Durasi: *${video.duration.timestamp}*
👀 Views: *${formatViews(video.views)}*
📅 Upload: *${video.ago}*

_⏳ Mengunduh audio, harap tunggu..._`

    // Send thumbnail + info
    await conn.sendMessage(m.chat, {
        image: { url: video.thumbnail },
        caption: info
    }, { quoted: m })

    const audio = await getAudioUrl(video.url)

    // Download audio buffer
    const res = await axios.get(audio.url, { responseType: 'arraybuffer', timeout: 60000 })
    const audioBuffer = Buffer.from(res.data)

    await conn.sendMessage(m.chat, {
        audio: audioBuffer,
        mimetype: 'audio/mpeg',
        fileName: `${(audio.title || video.title).slice(0, 60)}.mp3`,
        ptt: false
    }, { quoted: m })

    m.react('✅')
}

handler.help = ['play <lagu>']
handler.tags = ['downloader']
handler.command = /^(play|playaudio|putar)$/i
handler.limit = true
handler.register = true
export default handler
