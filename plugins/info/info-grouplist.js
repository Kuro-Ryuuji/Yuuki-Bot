// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
let handler = async (m, { conn, isOwner }) => {
    if (!isOwner) return m.reply('❌ Hanya owner yang bisa melihat daftar grup!')

    const groups = Object.entries(conn.chats)
        .filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)

    if (!groups.length) return m.reply('Bot belum bergabung di grup manapun.')

    let txt = `📋 *Daftar Grup Bot* (${groups.length})\n\n`
    let i = 1
    for (const [jid, chat] of groups) {
        const name = chat.subject || chat.name || await conn.getName(jid).catch(() => jid)
        txt += `${i++}. *${name}*\n🪪 \`${jid}\`\n\n`
    }
    txt += `_© ${global.namebot} | ${global.wmcredit}_`

    await m.reply(txt.trim())
}

handler.help = ['groups', 'grouplist']
handler.tags = ['info']
handler.command = /^(groups|grouplist)$/i
handler.owner = true
export default handler
