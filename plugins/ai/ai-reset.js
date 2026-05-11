// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!

const aiSessions = global.aiSessions || (global.aiSessions = new Map())

let handler = async (m, { conn, usedPrefix, command }) => {
    const key = m.sender
    if (aiSessions.has(key)) {
        aiSessions.delete(key)
        m.reply('🔄 *ᴀɪ ʀᴇsᴇᴛ*\n\nSesi AI kamu telah direset. Mulai percakapan baru!')
    } else {
        m.reply('ℹ️ Tidak ada sesi AI aktif untuk direset.')
    }
}

handler.help = ['aireset', 'resetai']
handler.tags = ['ai']
handler.command = /^(aireset|resetai|clearai)$/i
handler.owner = false
handler.premium = false

export default handler
