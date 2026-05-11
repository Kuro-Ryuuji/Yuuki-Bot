// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!

if (!global.confessData) global.confessData = new Map()

let handler = async (m, { conn, text }) => {
    if (!text || !text.includes('|')) {
        return m.reply(
            `💌 *ᴀɴᴏɴʏᴍᴏᴜs ᴄᴏɴꜰᴇss*\n\n` +
            `> Kirim pesan anonim ke seseorang!\n\n` +
            `*Format:*\n> \`${m.prefix}confess nomor|pesan\`\n\n` +
            `*Contoh:*\n> \`${m.prefix}confess 6281234567890|Hai kamu!\`\n\n` +
            `> ⚠️ Identitasmu akan dirahasiakan!`
        )
    }

    const [rawNumber, ...messageParts] = text.split('|')
    const message = messageParts.join('|').trim()
    let targetNumber = rawNumber.trim().replace(/[^0-9]/g, '')
    if (targetNumber.startsWith('0')) targetNumber = '62' + targetNumber.slice(1)

    if (!message || targetNumber.length < 10 || targetNumber.length > 15)
        return m.reply('❌ Format salah! Gunakan: `confess nomor|pesan`')

    const targetJid = targetNumber + '@s.whatsapp.net'
    if (targetNumber === m.sender.split('@')[0]) return m.reply('❌ Tidak bisa mengirim confess ke diri sendiri!')

    try {
        const [onWa] = await conn.onWhatsApp(targetNumber)
        if (!onWa?.exists) return m.reply(`❌ Nomor \`${targetNumber}\` tidak terdaftar di WhatsApp!`)
    } catch (e) {}

    if (message.length < 5) return m.reply('❌ Pesan terlalu pendek! Minimal 5 karakter.')
    if (message.length > 1000) return m.reply('❌ Pesan terlalu panjang! Maksimal 1000 karakter.')

    const confessText =
        `💌 *ᴀᴅᴀ ᴘᴇsᴀɴ ᴅᴀʀɪ sᴇsᴇᴏʀᴀɴɢ*\n\n` +
        `💕 *ɪsɪ ᴘᴇsᴀɴ:*\n\`\`\`${message}\`\`\`\n` +
        `> 🔒 _Identitas pengirim dirahasiakan_\n> 💬 _Reply pesan ini untuk membalas!_`

    try {
        const sentMsg = await conn.sendMessage(targetJid, { text: confessText })
        global.confessData.set(sentMsg.key.id, {
            senderJid: m.sender,
            senderChat: m.chat,
            targetJid,
            createdAt: Date.now()
        })
        setTimeout(() => global.confessData.delete(sentMsg.key.id), 24 * 60 * 60 * 1000)
        await m.reply(`✅ *ᴄᴏɴꜰᴇss ᴛᴇʀᴋɪʀɪᴍ!*\n\n> Pesan dikirim ke: \`${targetNumber}\`\n> Identitasmu terjaga aman! 🔒`)
    } catch (e) {
        throw e
    }
}
handler.help = ['confess nomor|pesan']
handler.tags = ['fun']
handler.command = /^(confess|confession|menfess|anonim)$/i

// ─── Reply handler (all messages) ───────────────────────────
export let all = async function (m) {
    if (!m.quoted) return
    const quotedId = m.quoted?.id || m.quoted?.key?.id
    if (!quotedId) return
    const confessInfo = global.confessData.get(quotedId)
    if (!confessInfo || m.sender !== confessInfo.targetJid) return
    const replyMessage = (m.body || '').trim()
    if (!replyMessage) return
    try {
        await this.sendMessage(confessInfo.senderChat, {
            text: `💌 *ʙᴀʟᴀsᴀɴ ᴅᴀʀɪ ᴏʀᴀɴɢ ʏᴀɴɢ ᴋᴀᴍᴜ ᴄᴏɴꜰᴇss!*\n\n\`\`\`${replyMessage}\`\`\`\n> 🔒 _Identitas tetap dirahasiakan_`
        })
        await this.sendMessage(m.chat, { text: '✅ Balasanmu telah terkirim secara anonim!' })
        global.confessData.delete(quotedId)
    } catch (e) {}
}

export default handler
