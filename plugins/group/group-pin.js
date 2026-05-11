// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!

let handler = async (m, { conn }) => {
    try {
        if (!m.quoted) return m.reply('❌ Reply ke pesan yang ingin di-pin!')

        await conn.sendMessage(m.chat, {
            pin: m.quoted.key,
            type: 1,
            time: 86400
        })
        m.reply('📌 Pesan berhasil di-pin!')
    } catch (e) {
        throw `Error: ${e.message || e}`
    }
}

handler.help = ['pin']
handler.tags = ['group']
handler.command = /^(pinmsg|pinpesan)$/i
handler.group = true
handler.admin = true

export default handler
