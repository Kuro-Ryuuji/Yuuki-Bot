// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
let handler = m => m

const linkRegex = /(a(su|nj(([ie])ng|([ie])r)?)|me?me?k|ko?nto?l|ba?bi|fu?ck|ta(e|i)k|bangsat|g([iueo])bl([iueo])(k|g)|g ([iueo]) b l ([iueo]) (k|g)|a (n j (i n g|i r)?)s u|col(i|ay)|an?jg|b([ia])ngs([...]/

handler.before = function (m, { user }) {
  if (m.isBaileys && m.fromMe) return false
  if (/masuk|lanjutkan|banjir|(per)?panjang/g.exec(m.text)) return false
  let chat = global.DATABASE.data.chats[m.chat]
  let isGroupToxic = linkRegex.exec(m.text)

  // Hanya check toxic jika fitur antiToxic sudah diaktifkan
  if (chat?.antiToxic === true && isGroupToxic) {
    m.reply('Jangan Toxic ya!!\n' + readMore + '\nMau Matikan? ketik */disable antitoxic*')
    return true
  }
  return false
}

// Handler untuk command .antitoxic on/off
handler.command = /^antitoxic$/i
handler.tags = ['group']
handler.group = true

handler.exec = async function (m, { conn, args, command }) {
  let chat = global.DATABASE.data.chats[m.chat]
  
  if (!args[0]) {
    return m.reply(`
Status antiToxic: ${chat?.antiToxic ? '✅ Aktif' : '❌ Nonaktif'}

Penggunaan:
• ${command} on - Mengaktifkan antiToxic
• ${command} off - Menonaktifkan antiToxic
    `.trim())
  }

  if (args[0].toLowerCase() === 'on') {
    chat.antiToxic = true
    m.reply('✅ AntiToxic telah diaktifkan!')
  } else if (args[0].toLowerCase() === 'off') {
    chat.antiToxic = false
    m.reply('❌ AntiToxic telah dinonaktifkan!')
  } else {
    m.reply('Argumen tidak valid. Gunakan: antitoxic on / antitoxic off')
  }
}

export const disable = true

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

export default handler
