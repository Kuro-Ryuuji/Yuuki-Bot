// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import axios from 'axios'

// ─── Brat Vermeil ────────────────────────────────────────────
let handlerBratVermeil = async (m, { conn, text }) => {
    if (!text) throw `👿 *ʙʀᴀᴛ ᴠᴇʀᴍᴇɪʟ*\n\n> Contoh: \`${m.prefix}bratvermeil Jangan lupa makan\``
    conn.sendMessage(m.chat, { react: { text: '🎨', key: m.key } })
    const url = `https://api.cuki.biz.id/api/canvas/brat/bratnime-vermeil?text=${encodeURIComponent(text)}&apikey=cuki-x`
    await conn.sendImageAsSticker(m.chat, url, m, { packname: global.stickpack || 'Elaina-MD', author: global.stickauth || 'OmniDevv' })
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handlerBratVermeil.help = ['bratvermeil <teks>']
handlerBratVermeil.tags = ['sticker']
handlerBratVermeil.command = /^(bratvermeil|bratv|bratnime)$/i
export { handlerBratVermeil }

// ─── Line Sticker Pack ───────────────────────────────────────
let handlerLineSticker = async (m, { conn, args }) => {
    const url = args?.[0]?.trim()
    if (!url || !url.includes('store.line.me')) throw (
        `🎨 *ʟɪɴᴇ sᴛɪᴄᴋᴇʀ*\n\n> Contoh:\n> \`${m.prefix}linesticker https://store.line.me/stickershop/product/9801/en\``
    )
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const neoxrKey = global.APIKeys?.neoxr || ''
    if (!neoxrKey) throw '❌ API Key Neoxr belum diset di config.js'
    const res = await axios.get(`https://api.neoxr.eu/api/linesticker?url=${encodeURIComponent(url)}&apikey=${neoxrKey}`, { timeout: 60000 }).catch(() => null)
    if (!res?.data?.status || !res?.data?.data) throw '❌ Gagal mengambil sticker dari URL tersebut!'
    const data = res.data.data
    const isAnimated = data.animated || false
    const stickerUrls = isAnimated && data.sticker_animation_url?.length ? data.sticker_animation_url : data.sticker_url || []
    if (!stickerUrls.length) throw '❌ Tidak ada sticker ditemukan!'
    await m.reply(`🎨 *${data.title || 'LINE Sticker'}*\n\n> 📊 Total: ${stickerUrls.length} sticker\n> 🎬 Animated: ${isAnimated ? 'Ya' : 'Tidak'}\n> 🕕 Mengirim...`)
    const max = Math.min(stickerUrls.length, 10)
    let sent = 0
    for (let i = 0; i < max; i++) {
        try {
            const buf = await axios.get(stickerUrls[i], { responseType: 'arraybuffer', timeout: 30000 }).then(r => Buffer.from(r.data))
            if (isAnimated) await conn.sendVideoAsSticker(m.chat, buf, m, { packname: data.title, author: data.author })
            else await conn.sendImageAsSticker(m.chat, buf, m, { packname: data.title, author: data.author })
            sent++
            await new Promise(r => setTimeout(r, 600))
        } catch {}
    }
    conn.sendMessage(m.chat, { react: { text: sent > 0 ? '✅' : '❌', key: m.key } })
    await m.reply(`${sent > 0 ? '✅' : '❌'} Berhasil kirim ${sent}/${stickerUrls.length} sticker`)
}
handlerLineSticker.help = ['linesticker <url>']
handlerLineSticker.tags = ['sticker']
handlerLineSticker.command = /^(linesticker|linepack|line)$/i
export { handlerLineSticker }

// ─── Sticker Watermark (SWM) ─────────────────────────────────
import { addExifToWebp } from '../../src/lib/exif.js'

let handlerSWM = async (m, { conn, text }) => {
    if (!m.quoted) throw `🖼️ *sᴛɪᴄᴋᴇʀ ᴡᴀᴛᴇʀᴍᴀʀᴋ*\n\n> Reply sticker dengan:\n> \`${m.prefix}swm packname\`\n> \`${m.prefix}swm packname|author\``
    const isSticker = m.quoted.type === 'stickerMessage' || m.quoted.isSticker
    if (!isSticker) throw '❌ Reply pesan sticker!'
    if (!text) throw '❌ Masukkan packname!'
    const [packname, author = ''] = text.split('|').map(s => s.trim())
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const buffer = await m.quoted.download()
    const riff = buffer.slice(0, 4).toString('ascii')
    const webpSig = buffer.length >= 12 ? buffer.slice(8, 12).toString('ascii') : ''
    if (riff === 'RIFF' && webpSig === 'WEBP') {
        const result = await addExifToWebp(buffer, { packname, author, emojis: ['🤖'] })
        await conn.sendMessage(m.chat, { sticker: result }, { quoted: m })
    } else {
        await conn.sendImageAsSticker(m.chat, buffer, m, { packname, author })
    }
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handlerSWM.help = ['swm packname|author']
handlerSWM.tags = ['sticker']
handlerSWM.command = /^(swm|stickerwm|stickermark|colong)$/i
export { handlerSWM }

export default handlerBratVermeil
