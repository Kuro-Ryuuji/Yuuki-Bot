// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import axios from 'axios'

// ─── Muslim AI ───────────────────────────────────────────────
let handlerMuslimAI = async (m, { conn, text }) => {
    if (!text) throw `☪️ *ᴍᴜsʟɪᴍ ᴀɪ*\n\n> Masukkan pertanyaan tentang Islam\n\n\`Contoh: ${m.prefix}muslimai Apa itu sholat?\``
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const res = await axios.get(`https://api.nexray.web.id/ai/muslim?text=${encodeURIComponent(text)}`, { timeout: 30000 }).catch(() => null)
    if (!res?.data?.result) throw '❌ Gagal mendapatkan jawaban'
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    await m.reply(res.data.result)
}
handlerMuslimAI.help = ['muslimai <pertanyaan>']
handlerMuslimAI.tags = ['ai']
handlerMuslimAI.command = /^(muslimai|islamai|quranai)$/i
export { handlerMuslimAI }

// ─── Gita GPT ────────────────────────────────────────────────
let handlerGita = async (m, { conn, text }) => {
    if (!text) throw `📿 *ɢɪᴛᴀ ɢᴘᴛ*\n\n> Masukkan pertanyaan\n\n\`Contoh: ${m.prefix}gita What is dharma?\``
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const res = await axios.get(`https://api.nexray.web.id/ai/gitagpt?text=${encodeURIComponent(text)}`, { timeout: 30000 }).catch(() => null)
    if (!res?.data?.result) throw '❌ Gagal mendapatkan jawaban'
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    await m.reply(res.data.result.trim())
}
handlerGita.help = ['gita <pertanyaan>']
handlerGita.tags = ['ai']
handlerGita.command = /^(gita|gitagpt|bhagavadgita)$/i
export { handlerGita }

// ─── Anime Art Generator ─────────────────────────────────────
let handlerAnimeGen = async (m, { conn, text }) => {
    if (!text) throw (
        `🎨 *ᴀɴɪᴍᴇ ᴀʀᴛ ɢᴇɴᴇʀᴀᴛᴏʀ*\n\n> Generate gambar anime AI dari prompt!\n\n` +
        `\`Contoh: ${m.prefix}animegen girl, vibrant color, smiling, yellow hair\`\n\n> Tips: Gunakan bahasa Inggris, makin detail makin bagus`
    )
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const neoxrKey = global.APIKeys?.neoxr || ''
    const res = await axios.get(`https://api.neoxr.eu/api/ai-anime?q=${encodeURIComponent(text)}&apikey=${neoxrKey}`, { timeout: 60000 }).catch(() => null)
    if (!res?.data?.status || !res?.data?.data?.url) throw '❌ Gagal generate gambar anime'
    await conn.sendFile(m.chat, res.data.data.url, 'animegen.jpg', '', m)
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handlerAnimeGen.help = ['animegen <prompt>']
handlerAnimeGen.tags = ['ai']
handlerAnimeGen.command = /^(animegen|anime-gen|aianimegen)$/i
export { handlerAnimeGen }

// ─── Text to Image (Stable Diffusion) ────────────────────────
let handlerTxt2Img = async (m, { conn, text }) => {
    if (!text) throw (
        `🎨 *ᴛᴇxᴛ ᴛᴏ ɪᴍᴀɢᴇ*\n\n> Generate gambar dari teks dengan AI\n\n` +
        `\`Contoh: ${m.prefix}txt2img beautiful sunset, anime style\``
    )
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const neoxrKey = global.APIKeys?.neoxr || ''
    const res = await axios.get(`https://api.neoxr.eu/api/stablediff?prompt=${encodeURIComponent(text)}&model=default&orientation=potrait&apikey=${neoxrKey}`, { timeout: 60000 }).catch(() => null)
    if (!res?.data?.data?.url) throw '❌ Gagal generate gambar'
    await conn.sendFile(m.chat, res.data.data.url, 'txt2img.jpg', '', m)
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handlerTxt2Img.help = ['txt2img <prompt>']
handlerTxt2Img.tags = ['ai']
handlerTxt2Img.command = /^(txt2img|texttoimage|t2i|imagine)$/i
export { handlerTxt2Img }

// ─── AI Rewriter ─────────────────────────────────────────────
let handlerRewriter = async (m, { conn, text }) => {
    if (!text || !text.includes('|')) throw (
        `✍️ *AI REWRITER*\n\n> Tulis ulang teks dengan tone tertentu\n\n` +
        `\`Contoh: ${m.prefix}airewriter Halo semuanya | professional\`\n\n` +
        `> Tone: professional, casual, formal, friendly, persuasive`
    )
    const [rawText, tone = 'professional'] = text.split('|').map(s => s.trim())
    if (!rawText) throw '❌ Teks tidak boleh kosong!'
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const covenantKey = global.APIKeys?.covenant || ''
    if (!covenantKey) throw '❌ API Key Covenant belum diset di config.js'
    const res = await axios.post('https://api.covenant.sbs/api/ai/rewrite', { text: rawText, tone }, {
        headers: { 'x-api-key': covenantKey }, timeout: 30000
    }).catch(() => null)
    if (!res?.data?.data?.result) throw '❌ Gagal rewrite teks'
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    await m.reply(`✍️ *AI REWRITER*\n\n> Tone: ${tone}\n\n${res.data.data.result}`)
}
handlerRewriter.help = ['airewriter teks|tone']
handlerRewriter.tags = ['ai']
handlerRewriter.command = /^(airewriter|ai-rewriter|rewriteai)$/i
export { handlerRewriter }

export default handlerMuslimAI
