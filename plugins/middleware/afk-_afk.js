import { mentionText, toMentionJid, getPhoneDigits } from '../../lib/mention.js'

function durasi(ms) {
  const d = Math.floor(ms / 86400000)
  const h = Math.floor((ms % 86400000) / 3600000)
  const mi = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return [d && d + ' hari', h && h + ' jam', mi && mi + ' menit', s && s + ' detik'].filter(Boolean).join(' ') || 'baru saja'
}

function userKeys(jid) {
  const raw = String(jid || '')
  const digits = getPhoneDigits(raw)
  return [...new Set([
    raw,
    digits ? digits + '@s.whatsapp.net' : '',
    digits ? digits + '@lid' : ''
  ].filter(Boolean))]
}

function findUser(jid) {
  const db = global.db.data.users || {}
  for (const key of userKeys(jid)) {
    if (db[key]) return db[key]
  }
  return null
}

function mentionOpts(jid, extra = {}) {
  const name = extra.name || ''
  const mentionJid = toMentionJid(jid)
  const fake = (typeof fakeig !== 'undefined' && fakeig) ? fakeig : {}
  return {
    ...fake,
    mentions: [mentionJid],
    contextInfo: {
      ...(fake.contextInfo || {}),
      mentionedJid: [mentionJid]
    },
    tag: mentionText(jid, { name })
  }
}

export function before(m) {
  const me = global.db.data.users[m.sender]
  if (me && me.afk > -1) {
    const name = m.pushName || (typeof conn !== 'undefined' && conn.getName?.(m.sender)) || ''
    const opt = mentionOpts(m.sender, { name })
    conn.sendButtonDoc(m.chat, `
${opt.tag} berhenti AFK${me.afkReason ? ' setelah ' + me.afkReason : ''}
Selama ${durasi(new Date - me.afk)}
`.trim(), wm, 'Alooww senpai', 'Ya', m, opt)
    me.afk = -1
    me.afkReason = ''
  }

  const jids = [...new Set([
    ...(m.mentionedJid || []),
    ...(m.quoted?.sender ? [m.quoted.sender] : [])
  ])]

  for (const jid of jids) {
    const user = findUser(jid)
    if (!user) continue
    const afkTime = user.afk
    if (!afkTime || afkTime < 0) continue
    const reason = user.afkReason || ''
    const name = (typeof conn !== 'undefined' && conn.getName?.(jid)) || ''
    const opt = mentionOpts(jid, { name })

    conn.sendButtonDoc(m.chat, `
Jangan tag ${opt.tag}!
Dia lagi AFK${reason ? ' dengan alasan ' + reason : ' tanpa alasan'}
Selama ${durasi(new Date - afkTime)}
`.trim(), wm, 'Sabar senpai, nanti dia juga on lagi kok', 'Ya', m, opt)
  }
  return true
}
