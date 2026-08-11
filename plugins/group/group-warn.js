let handler = async (m, { conn, args, usedPrefix, command }) => {
  const chat = global.db.data.chats[m.chat] || {}
  if (!chat.warnings) chat.warnings = {}
  const maxWarns = chat.maxWarnings || 3

  // .warn tanpa argumen = tampilkan info
  if (!args[0] && !m.quoted && !m.mentionedJid?.length) {
    return m.reply(
      `╭──────────────────\n` +
      `│ ⚠️ *SISTEM WARNING*\n` +
      `│ Batas: *${maxWarns}x* (auto kick)\n` +
      `╰──────────────────\n\n` +
      `*Perintah:*\n` +
      `• *${usedPrefix}warn @user <alasan>* — Beri warning\n` +
      `• *${usedPrefix}warn max <angka>* — Ubah batas\n` +
      `• *${usedPrefix}listwarn* — Lihat daftar\n` +
      `• *${usedPrefix}resetwarn @user* — Reset warning`
    )
  }

  // .warn max <n>
  if (args[0]?.toLowerCase() === 'max') {
    const n = parseInt(args[1])
    if (isNaN(n) || n < 1 || n > 20) return m.reply('❌ Angka harus 1-20')
    chat.maxWarnings = n
    global.db.data.chats[m.chat] = chat
    return m.reply(`✅ Batas warning diubah ke *${n}x*`)
  }

  const target = m.mentionedJid?.[0] || m.quoted?.sender
  if (!target) return m.reply(`❌ Tag atau reply user yang ingin diberi warning`)

  const reason = (m.quoted ? m.text : args.slice(1).join(' ')) || 'Tidak ada alasan'

  if (!chat.warnings[target]) chat.warnings[target] = []
  chat.warnings[target].push({ reason, by: m.sender, time: Date.now() })
  global.db.data.chats[m.chat] = chat

  const count = chat.warnings[target].length
  const name = target.split('@')[0]

  if (count >= maxWarns) {
    try {
      await conn.groupParticipantsUpdate(m.chat, [target], 'remove')
      delete chat.warnings[target]
      global.db.data.chats[m.chat] = chat
      return conn.sendMessage(m.chat, {
        text: `🚨 *MAX WARNING TERCAPAI*\n\n@${name} dikeluarkan dari grup!\n\n> Warning: *${count}/${maxWarns}*\n> Alasan: *${reason}*`,
        mentions: [target]
      }, { quoted: m })
    } catch {
      return m.reply('❌ Gagal kick, pastikan bot adalah admin')
    }
  }

  conn.sendMessage(m.chat, {
    text: `⚠️ *PERINGATAN SP${count}*\n\n@${name} mendapat peringatan!\n\n> Warning: *${count}/${maxWarns}*\n> Alasan: *${reason}*\n\n_${maxWarns - count} warning lagi = KICK_`,
    mentions: [target]
  }, { quoted: m })
}

handler.help = ['warn @user <alasan>']
handler.tags = ['group']
handler.command = /^warn$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
