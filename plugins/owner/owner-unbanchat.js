// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
let handler = async (m) => {
    global.db.data.chats[m.chat].isBanned = false
    m.reply('Done!')
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^(unbanchat|ubnc)$/i
handler.owner = true

export default handler