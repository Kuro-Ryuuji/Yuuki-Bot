// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!

let handler = async (m, { conn }) => {
    try {
        let users = global.db.data.users
        let top = Object.entries(users)
            .filter(([jid]) => jid.endsWith('@s.whatsapp.net'))
            .sort(([, a], [, b]) => (b.exp || 0) - (a.exp || 0))
            .slice(0, 10)

        if (!top.length) return m.reply('Belum ada data pengguna.')

        let text = `🏆 *TOP 10 CHATTER*\n\n`
        for (let i = 0; i < top.length; i++) {
            let [jid, data] = top[i]
            let name = data.name || jid.split('@')[0]
            let medal = ['🥇', '🥈', '🥉'][i] || `${i + 1}.`
            text += `${medal} *${name}*\n   ⭐ EXP: ${data.exp || 0}\n\n`
        }

        m.reply(text.trim())
    } catch (e) {
        throw `Error: ${e.message || e}`
    }
}

handler.help = ['topchat']
handler.tags = ['group']
handler.command = /^(topchat)$/i
handler.group = true

export default handler
