import { mentionText } from '../../lib/mention.js'

let handler = async (m, { conn, text, participants }) => {
    const members = (participants || []).filter(p => {
        const id = conn.decodeJid?.(p.id) || p.id
        const bot = conn.decodeJid?.(conn.user?.id) || conn.user?.id
        return id && id !== bot
    })

    if (!members.length) return m.reply('Tidak ada member yang bisa di-tag.')

    const lines = members.map(p => {
        const name = conn.getName?.(p.id) || p.notify || ''
        return '│◦❒ ' + mentionText(p, { name })
    })

    const body = `${text ? `${text}\n` : ''}┌─「 Tag All 」\n${lines.join('\n')}\n└────`

    await m.reply(body, null, {
        mentions: members.map(p => p.id)
    })
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['tagall']
handler.admin = true
handler.group = true

export default handler
