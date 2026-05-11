/**
 * List & Reset Warn — Elaina-MD
 * https://github.com/OmmniDevv/Elaina-MD
 */

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const chat = global.db.data.chats[m.chat] || {}
  const warnings = chat.warnings || {}
  const maxWarns = chat.maxWarnings || 3
  const isReset = /resetwarn/.test(command)

  if (isReset) {
    const target = m.mentionedJid?.[0] || m.quoted?.sender
    if (!target) return m.reply('❌ Tag atau reply user yang ingin direset')
    if (!warnings[target]?.length) return m.reply('ℹ️ User ini tidak punya warning')
    delete warnings[target]
    global.db.data.chats[m.chat] = { ...chat, warnings }
    return conn.sendMessage(m.chat, {
      text: `✅ Warning @${target.split('@')[0]} telah direset`,
      mentions: [target]
    }, { quoted: m })
  }

  // listwarn
  const entries = Object.entries(warnings).filter(([, w]) => w?.length)
  if (!entries.length) return m.reply('✅ Tidak ada member bermasalah di grup ini')

  let txt = `╭──────────────────\n│ ⚠️ *DAFTAR WARNING*\n│ Batas: ${maxWarns}x\n╰──────────────────\n\n`
  for (const [jid, warns] of entries) {
    txt += `👤 @${jid.split('@')[0]} — *${warns.length}/${maxWarns}*\n`
    warns.forEach((w, i) => { txt += `  ${i + 1}. ${w.reason}\n` })
    txt += '\n'
  }

  conn.sendMessage(m.chat, {
    text: txt.trim(),
    mentions: entries.map(([jid]) => jid)
  }, { quoted: m })
}

handler.help = ['listwarn', 'resetwarn @user']
handler.tags = ['group']
handler.command = /^(listwarn|resetwarn)$/i
handler.group = true
handler.admin = true
export default handler
