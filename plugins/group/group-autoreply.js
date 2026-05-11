/**
 * Auto Reply Management — Elaina-MD
 * https://github.com/OmmniDevv/Elaina-MD
 */

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  const chat = global.db.data.chats[m.chat] || {}
  if (!chat.autoReplies) chat.autoReplies = {}
  const action = args[0]?.toLowerCase()

  if (!action || action === 'list') {
    const entries = Object.entries(chat.autoReplies)
    if (!entries.length) return m.reply(
      `╭──────────────────\n│ 💬 *AUTO REPLY*\n│ Belum ada trigger\n╰──────────────────\n\n` +
      `*Cara pakai:*\n` +
      `• *${usedPrefix}autoreply add <trigger>|<balasan>*\n` +
      `• *${usedPrefix}autoreply del <trigger>*\n` +
      `• *${usedPrefix}autoreply list*`
    )
    let txt = `╭──────────────────\n│ 💬 *AUTO REPLY LIST*\n│ ${entries.length} trigger aktif\n╰──────────────────\n\n`
    entries.forEach(([t, r], i) => { txt += `${i + 1}. *${t}*\n   └ ${r}\n\n` })
    return m.reply(txt.trim())
  }

  if (action === 'add') {
    const rest = args.slice(1).join(' ')
    const [trigger, ...resParts] = rest.split('|')
    const response = resParts.join('|').trim()
    if (!trigger?.trim() || !response) return m.reply(`❌ Format: *${usedPrefix}autoreply add <trigger>|<balasan>*`)
    chat.autoReplies[trigger.trim()] = response
    global.db.data.chats[m.chat] = chat
    return m.reply(`✅ Auto reply ditambahkan!\n\n*Trigger:* ${trigger.trim()}\n*Balasan:* ${response}`)
  }

  if (action === 'del' || action === 'delete') {
    const trigger = args.slice(1).join(' ').trim()
    if (!trigger) return m.reply(`❌ Masukkan trigger yang ingin dihapus`)
    if (!chat.autoReplies[trigger]) return m.reply(`❌ Trigger *${trigger}* tidak ditemukan`)
    delete chat.autoReplies[trigger]
    global.db.data.chats[m.chat] = chat
    return m.reply(`✅ Trigger *${trigger}* dihapus`)
  }

  m.reply(`❌ Perintah tidak dikenal. Gunakan: add, del, list`)
}

handler.help = ['autoreply add <trigger>|<balasan>', 'autoreply del <trigger>', 'autoreply list']
handler.tags = ['group']
handler.command = /^(autoreply|ar)$/i
handler.group = true
handler.admin = true
export default handler
