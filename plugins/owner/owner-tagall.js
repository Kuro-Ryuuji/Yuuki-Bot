// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
let handler = async (m, { conn, text, participants, isAdmin, isOwner }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.id)
    m.reply(`${text ? `${text}\n` : ''}┌─「 Tag All 」\n` + users.map(v => '│◦❒ @' + v.replace(/@.+/, '')).join`\n` + '\n└────', null, {
        mentions: users
    })
}

handler.help = ['o-tagall']
handler.tags = ['owner']
handler.command = ['o-tagall']
handler.owner = true
handler.group = true

export default handler
