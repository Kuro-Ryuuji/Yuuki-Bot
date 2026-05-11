// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import axios from 'axios'

// ─── Chord / Kunci Gitar ─────────────────────────────────────
let handlerChord = async (m, { conn, text }) => {
    if (!text) throw `🎸 *ᴄʜᴏʀᴅ sᴇᴀʀᴄʜ*\n\n> Contoh: \`${m.prefix}chord komang\``
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const neoxrKey = global.APIKeys?.neoxr || ''
    const res = await axios.get(`https://api.neoxr.eu/api/chord?q=${encodeURIComponent(text)}&apikey=${neoxrKey}`, { timeout: 30000 }).catch(() => null)
    if (!res?.data?.status || !res?.data?.data?.chord) throw `❌ Chord tidak ditemukan untuk: \`${text}\``
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    await m.reply(res.data.data.chord)
}
handlerChord.help = ['chord <judul lagu>']
handlerChord.tags = ['search']
handlerChord.command = /^(chord2|chords2|kunci|kuncigitar)$/i
export { handlerChord }

// ─── Apple Music Search ──────────────────────────────────────
let handlerAppleMusic = async (m, { conn, text }) => {
    if (!text) throw `🍎 *ᴀᴘᴘʟᴇ ᴍᴜsɪᴄ*\n\n> Contoh: \`${m.prefix}applemusic Best Friend\``
    conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
    const res = await axios.get(`https://api.nexray.web.id/search/applemusic?q=${encodeURIComponent(text)}`, { timeout: 20000 }).catch(() => null)
    if (!res?.data?.result?.length) throw `❌ Tidak ditemukan hasil untuk: ${text}`
    const tracks = res.data.result.slice(0, 5)
    let txt = `🍎 *ᴀᴘᴘʟᴇ ᴍᴜsɪᴄ sᴇᴀʀᴄʜ*\n\n> Query: *${text}*\n\n`
    tracks.forEach((t, i) => {
        txt += `*${i + 1}.* \`\`\`${t.title}\`\`\`\n   ├ 📀 \`${t.subtitle || 'Unknown'}\`\n   └ 🔗 \`${t.link}\`\n\n`
    })
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    await m.reply(txt.trim())
}
handlerAppleMusic.help = ['applemusic <query>']
handlerAppleMusic.tags = ['search']
handlerAppleMusic.command = /^(applemusic|amusic)$/i
export { handlerAppleMusic }

// ─── Pixiv Search ────────────────────────────────────────────
let handlerPixiv = async (m, { conn, text }) => {
    if (!text) throw `🎨 *ᴘɪxɪᴠ sᴇᴀʀᴄʜ*\n\n> Contoh: \`${m.prefix}pixiv rem\``
    conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
    const neoxrKey = global.APIKeys?.neoxr || ''
    const res = await axios.get(`https://api.neoxr.eu/api/pixiv-search?q=${encodeURIComponent(text)}&apikey=${neoxrKey}`, { timeout: 30000 }).catch(() => null)
    if (!res?.data?.status || !res?.data?.data?.length) throw `❌ Tidak ditemukan hasil untuk: ${text}`
    const results = res.data.data.slice(0, 8)
    let caption = `🎨 *ᴘɪxɪᴠ sᴇᴀʀᴄʜ*\n📝 *Query:* ${text}\n📊 *Hasil:* ${results.length} artwork\n\n`
    results.forEach((art, i) => {
        const ai = art.aiType === 2 ? ' 🤖' : ''
        const nsfw = art.xRestrict > 0 ? ' 🔞' : ''
        caption += `*${i + 1}.* ${art.title}${ai}${nsfw}\n   👤 ${art.userName}\n   🔗 ${art.url}\n\n`
    })
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    await m.reply(caption.trim())
}
handlerPixiv.help = ['pixiv <query>']
handlerPixiv.tags = ['search']
handlerPixiv.command = /^(pixiv|pixivsearch|caripixiv)$/i
export { handlerPixiv }

// ─── TikTok Search ───────────────────────────────────────────
import { tiktokSearchVideo } from '../../lib/scraper/tiktoksearch.js'

let handlerTTSearch = async (m, { conn, text }) => {
    if (!text) throw `🎵 *ᴛɪᴋᴛᴏᴋ sᴇᴀʀᴄʜ*\n\n> Contoh: \`${m.prefix}ttsearch anime\``
    conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
    const videos = await tiktokSearchVideo(text).catch(() => null)
    if (!videos?.length) throw `❌ Tidak ditemukan video untuk: ${text}`
    let txt = `🎵 *ᴛɪᴋᴛᴏᴋ sᴇᴀʀᴄʜ*\n\n> Query: *${text}*\n\n`
    videos.slice(0, 5).forEach((v, i) => {
        txt += `*${i + 1}.* ${v.title || '-'}\n   👤 ${v.author?.nickname || '-'}\n   👀 ${v.stats?.plays || 0} views\n   🔗 ${v.link}\n\n`
    })
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    await m.reply(txt.trim())
}
handlerTTSearch.help = ['ttsearch <query>']
handlerTTSearch.tags = ['search']
handlerTTSearch.command = /^(ttsearch|tiktoksearch|searchtiktok)$/i
export { handlerTTSearch }

export default handlerChord
