// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Format: ${usedPrefix + command} pertanyaan | opsi1 | opsi2`)

    try {
        let parts = text.split('|').map(s => s.trim()).filter(Boolean)
        let question = parts[0]
        let options = parts.slice(1)

        if (options.length < 2) return m.reply(`❌ Minimal 2 opsi!\nFormat: ${usedPrefix + command} pertanyaan | opsi1 | opsi2`)
        if (options.length > 12) return m.reply('❌ Maksimal 12 opsi!')

        await conn.sendMessage(m.chat, {
            poll: {
                name: question,
                values: options,
                selectableCount: 1
            }
        }, { quoted: m })
    } catch (e) {
        throw `Error: ${e.message || e}`
    }
}

handler.help = ['poll <pertanyaan> | <opsi1> | <opsi2>']
handler.tags = ['group']
handler.command = /^(poll)$/i
handler.group = true

export default handler
