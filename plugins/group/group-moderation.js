let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        let detik = parseInt(args[0])
        if (isNaN(detik) || detik < 0) return m.reply(`Format: ${usedPrefix + command} <detik>\nContoh: ${usedPrefix + command} 10`)

        await conn.groupSettingUpdate(m.chat, detik > 0 ? 'slow_mode' : 'not_announcement')
        m.reply(detik > 0
            ? `✅ Slowmode diaktifkan: ${detik} detik`
            : '✅ Slowmode dinonaktifkan')
    } catch (e) {
        throw `Error: ${e.message || e}`
    }
}

handler.help = ['slowmode <detik>']
handler.tags = ['group']
handler.command = /^(slowmode)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
