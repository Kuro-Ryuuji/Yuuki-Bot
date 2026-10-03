import axios from 'axios'

const bratHandler = (name, apiUrl) => {
    let h = async (m, { conn, text, usedPrefix, command }) => {
        if (!text) throw `🖼️ *${name.toUpperCase()}*\n\nContoh: ${usedPrefix}${command} Hai semua`
        conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
        try {
            const url = apiUrl(text)
            await conn.sendImageAsSticker(m.chat, url, m, { packname: global.stickpack, author: global.stickauth })
            conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        } catch (e) {
            conn.sendMessage(m.chat, { react: { text: '☢', key: m.key } })
            throw `Error: ${e.message || e}`
        }
    }
    h.help = [`${name} <teks>`]
    h.tags = ['sticker']
    return h
}

// ─── Brat White ───────────────────────────────────────────────────
export let handlerBratWhite = bratHandler('bratwhite', t => `https://api.ourin.my.id/api/bratwhite?text=${encodeURIComponent(t)}`)
handlerBratWhite.command = /^(bratwhite|bratputih)$/i

// ─── Brat Anime ───────────────────────────────────────────────────
export let handlerBratAnime = bratHandler('bratanime', t => `https://api.ourin.my.id/api/bratanime?text=${encodeURIComponent(t)}`)
handlerBratAnime.command = /^(bratanime|animebrat)$/i

// ─── Brat Cewek ───────────────────────────────────────────────────
export let handlerBratCewek = bratHandler('bratcewek', t => `https://api.deline.web.id/maker/cewekbrat?text=${encodeURIComponent(t)}`)
handlerBratCewek.command = /^(bratcewek|bratgirl|cewekbrat)$/i

// ─── Brat HD ───────────────────────────────────────────────────
export let handlerBratHD = bratHandler('brathd', t => `https://api.ourin.my.id/api/brat-hd?text=${encodeURIComponent(t)}`)
handlerBratHD.command = /^(brathd|brathds)$/i

// ─── Brat Bahlil ───────────────────────────────────────────────────
export let handlerBratBahlil = bratHandler('bratbahlil', t => `https://api.ourin.my.id/api/bratbahlil?text=${encodeURIComponent(t)}`)
handlerBratBahlil.command = /^(bratbahlil)$/i

// ─── Brat Patrick ───────────────────────────────────────────────────
export let handlerBratPatrick = bratHandler('bratpatrick', t => `https://api.ourin.my.id/api/bratpatrick?text=${encodeURIComponent(t)}`)
handlerBratPatrick.command = /^(bratpatrick)$/i

// ─── Brat Squidward ───────────────────────────────────────────────────
export let handlerBratSquidward = bratHandler('bratsquidward', t => `https://api.ourin.my.id/api/bratsquidward?text=${encodeURIComponent(t)}`)
handlerBratSquidward.command = /^(bratsquidward)$/i

// ─── QC (Quote Sticker) ───────────────────────────────────────────────────
const COLORS = {
    pink: '#f68ac9', blue: '#6cace4', red: '#f44336', green: '#4caf50',
    yellow: '#ffeb3b', purple: '#9c27b0', darkblue: '#0d47a1', lightblue: '#03a9f4',
    ash: '#9e9e9e', orange: '#ff9800', black: '#000000', white: '#ffffff',
    teal: '#008080', hotpink: '#FF69B4', cyan: '#48D1CC', gold: '#FFD700'
}

export let handlerQC = async (m, { conn, args }) => {
    if (args.length < 2) {
        const colorList = Object.keys(COLORS).join(', ')
        return m.reply(
            `💬 *ǫᴜᴏᴛᴇ sᴛɪᴄᴋᴇʀ*\n\n` +
            `*Format:* \`${m.prefix}qc <warna> <text>\`\n` +
            `*Contoh:* \`${m.prefix}qc pink Hai semuanya!\`\n\n` +
            `*Warna:* ${colorList}`
        )
    }
    const color = args[0].toLowerCase()
    const backgroundColor = COLORS[color]
    if (!backgroundColor) return m.reply(`❌ Warna \`${color}\` ga ketemu nih!`)

    let message = args.slice(1).join(' ')
    if (m.quoted && !message) message = m.quoted.text || m.quoted.body || ''
    if (!message) return m.reply('❌ Masukkin text untuk quote!')
    if (message.length > 80) return m.reply(`❌ Maksimal 80 karakter! (Saat ini: ${message.length})`)

    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    try {
        let avatar = 'https://files.catbox.moe/nwvkbt.png'
        try { avatar = await conn.profilePictureUrl(m.sender, 'image') } catch {}

        const json = {
            messages: [{
                from: {
                    id: Math.floor(Math.random() * 10),
                    first_name: m.pushName || 'User',
                    last_name: '', name: '',
                    photo: { url: avatar }
                },
                text: message, entities: [], avatar: true,
                media: { url: '' }, mediaType: '',
                replyMessage: { name: '', text: '', entities: [], chatId: Math.floor(Math.random() * 10) }
            }],
            backgroundColor, width: 512, height: 512, scale: 2,
            type: 'quote', format: 'png', emojiStyle: 'apple'
        }

        const response = await axios.post('https://brat.siputzx.my.id/quoted', json, {
            timeout: 60000, responseType: 'arraybuffer'
        })
        const buffer = Buffer.from(response.data, 'base64')
        await conn.sendImageAsSticker(m.chat, buffer, m, { packname: global.stickpack, author: global.stickauth })
        conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        conn.sendMessage(m.chat, { react: { text: '☢', key: m.key } })
        throw `Error: ${e.message || e}`
    }
}
handlerQC.help = ['qc <warna> <text>']
handlerQC.tags = ['sticker']
handlerQC.command = /^(qc|quotesticker|qcstc)$/i

// ─── Smeme (Meme Sticker) ───────────────────────────────────────────────────
export let handlerSmeme = async (m, { conn, args }) => {
    const isImg = /image/.test((m.quoted?.msg || m.msg || m)?.mimetype || '')
    const isSticker = /sticker/.test((m.quoted?.msg || m.msg || m)?.mimetype || '')
    if (!isImg && !isSticker) return m.reply(
        `😂 *ᴍᴇᴍᴇ sᴛɪᴄᴋᴇʀ*\n\n> Reply gambar/sticker dengan caption\n\n\`Contoh: ${m.prefix}smeme Top|Bottom\``
    )
    const input = args.join(' ')
    if (!input || !input.includes('|')) return m.reply(
        `😂 *ᴍᴇᴍᴇ sᴛɪᴄᴋᴇʀ*\n\n> Format: top|bottom\n\n\`Contoh: ${m.prefix}smeme Ketika|Kamu Lupa\``
    )
    const [top, bottom] = input.split('|').map(s => s.trim())
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    try {
        const mediaBuffer = m.quoted ? await m.quoted.download() : await m.download()
        if (!mediaBuffer) throw '❌ Duh gagal download media nih'

        const FormData = (await import('form-data')).default
        const form = new FormData()
        form.append('file', mediaBuffer, { filename: 'meme.png', contentType: 'image/png' })

        let imageUrl
        try {
            const uploadRes = await axios.post('https://telegra.ph/upload', form, {
                headers: form.getHeaders(), timeout: 30000
            })
            if (uploadRes.data?.[0]?.src) imageUrl = 'https://telegra.ph' + uploadRes.data[0].src
        } catch {}

        if (!imageUrl) throw '❌ Duh gagal upload gambar nih'

        const encodeText = t => t ? encodeURIComponent(t).replace(/-/g, '--').replace(/_/g, '__').replace(/%20/g, '_') : '_'
        const memeUrl = `https://api.memegen.link/images/custom/${encodeText(top)}/${encodeText(bottom)}.png?background=${encodeURIComponent(imageUrl)}`
        const res = await axios.get(memeUrl, { responseType: 'arraybuffer', timeout: 30000 })
        await conn.sendImageAsSticker(m.chat, Buffer.from(res.data), m, { packname: global.stickpack, author: global.stickauth })
        conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        conn.sendMessage(m.chat, { react: { text: '☢', key: m.key } })
        throw `Error: ${e.message || e}`
    }
}
handlerSmeme.help = ['smeme top|bottom (reply gambar)']
handlerSmeme.tags = ['sticker']
handlerSmeme.command = /^(smeme|memesticker|memes)$/i

export default handlerQC
