// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text || isNaN(text)) throw `Masukkan jumlah hari!\nContoh: *${usedPrefix}${command} 7*`

    const days = parseInt(text)
    const ms = 86400000 * days
    const now = Date.now()
    const users = global.db.data.users

    let count = 0
    for (let jid in users) {
        let user = users[jid]
        if (now < user.premiumTime) user.premiumTime += ms
        else user.premiumTime = now + ms
        user.premium = true
        count++
    }

    await global.db.write()
    m.reply(`✅ Berhasil set premium *${days} hari* ke *${count} user*!`)
}

handler.help = ['addpremall <days>']
handler.tags = ['owner']
handler.command = /^(addpremall|tambahpremall|\+premall)$/i
handler.rowner = true

export default handler
