import { mentionText, formatDisplayNumber, getPhoneDigits } from '../../lib/mention.js'

let handler = async (m, { conn }) => {
    const who = m.mentionedJid?.[0]
        ? m.mentionedJid[0]
        : m.fromMe
            ? conn.user.id
            : m.sender

    const participant = m.isGroup
        ? (m.participants || []).find(p => (conn.decodeJid?.(p.id) || p.id) === who)
        : null

    const user = global.db.data.users[m.sender] || {}
    const { premium, registered, age } = user
    const username = conn.getName(who)
    const name = conn.getName(who)
    const tag = mentionText(participant || who, { name: username })
    const phone = formatDisplayNumber(participant || who)
    const waDigits = getPhoneDigits(participant || who)
    const waLink = waDigits ? `https://wa.me/${waDigits}` : '-'

    const fkon = {
        key: {
            fromMe: false,
            participant: m.sender,
            ...(m.chat ? { remoteJid: m.chat } : {})
        },
        message: {
            contactMessage: {
                displayName: `${name}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${waDigits || ''}:${phone || ''}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        }
    }

    const str = `
]──────────❏ *PROFILE* ❏──────────[
💌 • *Name:* ${username}
🎐 • *Username:* ${registered ? name : ''}
📧 • *Tag:* ${tag}
📞 • *Number:* ${phone || '-'}
🔗 • *Link:* ${waLink}
🎨 • *Age:* ${registered ? age : ''}
${readMore}
🌟 • *Premium:* ${premium ? '✅' : '❌'}
⏰ • *PremiumTime:*
${clockString(user.premiumTime)}
📑 • *Registered:* ${registered ? '✅' : '❌'}
`.trim()

    const pp = await conn.profilePictureUrl(who, 'image').catch(() => './src/avatar_contact.png')

    conn.sendButton(
        m.chat,
        str,
        typeof botdate !== 'undefined' ? botdate : '',
        pp,
        [[`${registered ? 'Menu' : 'Verify'}`, `${user.registered ? '.menu' : '.verify'}`]],
        fkon,
        { contextInfo: { mentionedJid: [who], forwardingScore: 999, isForwarded: true } }
    )
}

handler.help = ['profile [@user]']
handler.tags = ['xp']
handler.command = /^profile|pp$/i
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
    const d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minute ⏰*\n ', s, ' *Second ⏱️* ']
        .map(v => v.toString().padStart(2, '0'))
        .join('')
}
