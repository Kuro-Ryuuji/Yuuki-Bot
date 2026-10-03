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

    const user = global.db.data.users[who] || global.db.data.users[m.sender] || {}
    const { premium, registered, age } = user
    const username = conn.getName(who)
    const name = registered && user.name ? user.name : username
    const tag = mentionText(participant || who, { name: username })
    const phone = formatDisplayNumber(participant || who)
    const waDigits = getPhoneDigits(participant || who)
    const waLink = waDigits ? `https://wa.me/${waDigits}` : '-'

    let bio = user.bio || user.about || user.status || ''
    try {
        const status = await conn.fetchStatus(who)
        if (status?.status) bio = status.status
    } catch {}
    if (!bio) bio = 'Tidak ada bio'

    let ppUrl = './src/avatar_contact.png'
    let ppBuffer = null
    try {
        ppUrl = await conn.profilePictureUrl(who, 'image')
        const res = await fetch(ppUrl)
        ppBuffer = Buffer.from(await res.arrayBuffer())
    } catch {
        ppBuffer = null
    }

    const str = `
]──────────❏ *PROFILE* ❏──────────[
💌 • *Name:* ${username}
🎐 • *Username:* ${registered ? name : '-'}
📧 • *Tag:* ${tag}
📞 • *Number:* ${phone || '-'}
🔗 • *Link:* ${waLink}
🎨 • *Age:* ${registered ? (age ?? '-') : '-'}
📝 • *Bio:* ${bio}
${readMore}
🌟 • *Premium:* ${premium ? '✅' : '❌'}
⏰ • *PremiumTime:*
${clockString(user.premiumTime)}
📑 • *Registered:* ${registered ? '✅' : '❌'}
`.trim()

    await conn.sendMessage(m.chat, {
        text: str,
        contextInfo: {
            mentionedJid: [who],
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
                title: name || username || 'Profile',
                body: bio,
                thumbnail: ppBuffer || undefined,
                thumbnailUrl: ppBuffer ? undefined : (typeof ppUrl === 'string' && ppUrl.startsWith('http') ? ppUrl : undefined),
                sourceUrl: waLink !== '-' ? waLink : undefined,
                mediaType: 1,
                renderLargerThumbnail: true,
                showAdAttribution: false
            }
        }
    }, { quoted: m })
}

handler.help = ['profil [@user]', 'profile [@user]']
handler.tags = ['xp']
handler.command = /^(profil|profile|pp)$/i
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
