import { stopJadibot, isJadibotActive, getJadibotStatus } from '../../src/lib/jadibot-manager.js'

function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    if (hours > 0) return `${hours}h ${minutes % 60}m`
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`
    return `${seconds}s`
}

let handler = async (m, { conn, usedPrefix }) => {
    const sender = m.sender
    if (!sender) return m.reply('❌ Gagal mengidentifikasi nomor kamu')

    if (!isJadibotActive(sender)) {
        return m.reply(
            `❌ *ᴋᴀᴍᴜ ᴛɪᴅᴀᴋ ᴀᴅᴀʟᴀʜ ᴊᴀᴅɪʙᴏᴛ*\n\n` +
            `> Ketik \`${usedPrefix}jadibot\` untuk menjadi bot`
        )
    }

    const status = getJadibotStatus(sender)
    const uptime = status ? formatUptime(Date.now() - status.startedAt) : '-'

    await conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })

    try {
        await stopJadibot(sender, false)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

        await m.reply(
            `🛑 *ᴊᴀᴅɪʙᴏᴛ ᴅɪʜᴇɴᴛɪᴋᴀɴ*\n\n` +
            `> 📱 Nomor: *@${sender.split('@')[0]}*\n` +
            `> ⏱️ Uptime: *${uptime}*\n` +
            `> 💾 Session: *Tersimpan*\n\n` +
            `Ketik \`${usedPrefix}jadibot\` untuk mengaktifkan kembali.`,
            { mentions: [sender] }
        )
    } catch (e) {
        await conn.sendMessage(m.chat, { react: { text: '☢', key: m.key } })
        await m.reply(`❌ Gagal menghentikan jadibot: ${e.message}`)
    }
}

handler.help = ['stopjadibot']
handler.tags = ['main']
handler.command = /^(stopjadibot|berhentijadibot|stopbot|unjadibot)$/i
handler.owner = false
handler.premium = false
handler.register = false
handler.limit = false

export default handler
