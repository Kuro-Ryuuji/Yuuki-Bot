// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
let handler = async (m, { conn }) => {
    const users = global.db.data.users

    let count = 0
    for (let jid in users) {
        let user = users[jid]
        if (user.premium) {
            user.premium = false
            user.premiumTime = 0
            count++
        }
    }

    await global.db.write()
    m.reply(`✅ Berhasil menghapus premium dari *${count} user*!`)
}

handler.help = ['delpremall']
handler.tags = ['owner']
handler.command = /^(delpremall|hapuspremall|-premall)$/i
handler.rowner = true

export default handler
