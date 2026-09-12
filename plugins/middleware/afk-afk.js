import { mentionText, toMentionJid } from '../../lib/mention.js'

let handler = async (m, { conn, text }) => {
  const user = global.db.data.users[m.sender]
  if (!user) return

  user.afk = +new Date
  user.afkReason = text || ''

  const name = m.pushName || conn.getName(m.sender) || ''
  const tag = mentionText(m.sender, { name })
  const mentionJid = toMentionJid(m.sender)
  const thumb = global.thumbBuffer

  await conn.sendButtonDoc(
    m.chat,
    `${tag} sekarang AFK${text ? ': ' + text : ''}`,
    wm,
    'ᴊᴀɴɢᴀɴ ᴅɪɢᴀɴɢɢᴜ ʏᴀ ᴋᴀᴋ',
    'Bilek',
    m,
    {
      mentions: [mentionJid],
      contextInfo: {
        mentionedJid: [mentionJid],
        externalAdReply: {
          showAdAttribution: true,
          mediaUrl: 'https://instagram.com/Xiao_yan_21',
          mediaType: 'VIDEO',
          description: 'https://instagram.com/Xiao_yan_21',
          title: 'Yuuki-MultiDevice',
          body: wm,
          thumbnail: thumb,
          sourceUrl: typeof sig !== 'undefined' ? sig : ''
        }
      }
    }
  )
}

handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk$/i

export default handler
