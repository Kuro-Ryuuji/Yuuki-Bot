// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// Makasih kode nya OURIN
import { startJadibot, isJadibotActive } from '../../src/lib/jadibot-manager.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    const sender = m.sender
    if (!sender) return m.reply('❌ Gagal mengidentifikasi nomor kamu')

    if (isJadibotActive(sender)) {
        return m.reply(
            `⚠️ *ᴊᴀᴅɪʙᴏᴛ ꜱᴜᴅᴀʜ ᴀᴋᴛɪꜰ*\n\n` +
            `> Nomor kamu sudah menjadi bot\n` +
            `> Ketik \`${usedPrefix}stopjadibot\` untuk menghentikan`
        )
    }

    const arg = (m.text?.split(' ')[1] || '').toLowerCase()
    const useQR = arg === 'qr'

    if (useQR) {
        await m.reply(
            `🤖 *ᴊᴀᴅɪʙᴏᴛ — Qʀ ᴍᴏᴅᴇ*\n\n` +
            `> Menyiapkan koneksi...\n` +
            `> Scan QR Code yang akan dikirim`
        )
    } else {
        await m.reply(
            `🤖 *ᴊᴀᴅɪʙᴏᴛ — ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ*\n\n` +
            `> Menyiapkan koneksi...`
        )
    }

    try {
        await startJadibot(conn, m, sender, !useQR)
    } catch (e) {
        await m.reply(
            `❌ *ᴊᴀᴅɪʙᴏᴛ ɢᴀɢᴀʟ*\n\n` +
            `> ${e.message || 'Terjadi kesalahan'}\n\n` +
            `Coba lagi dalam beberapa menit.`
        )
    }
}

handler.help = ['jadibot', 'jadibot qr']
handler.tags = ['main']
handler.command = /^(jadibot|jadibotqr|becomebot)$/i
handler.owner = false
handler.premium = false
handler.register = false
handler.limit = false

export default handler
