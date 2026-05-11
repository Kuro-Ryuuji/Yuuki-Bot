// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!

let handler = async (m) => {
    m.reply('⚠️ Fitur ini belum tersedia di versi ini.')
}

handler.help = ['clearchat']
handler.tags = ['group']
handler.command = /^(clearchat)$/i
handler.group = true
handler.admin = true

export default handler
